import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '../primitives/input'
import { Checkbox } from '../primitives/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../primitives/select'
import { Button } from '../primitives/button'
import { DatePicker } from './date-picker'
import { Field } from './field'

export interface AutoFormProps {
  schema: z.ZodObject<z.ZodRawShape>
  onSubmit: (data: Record<string, unknown>) => void
  defaultValues?: Record<string, unknown>
  submitLabel?: string
}

function toLabel(key: string) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
}

function getInputType(field: z.ZodTypeAny): string {
  if (field instanceof z.ZodEmail) return 'email'
  if (field instanceof z.ZodURL) return 'url'
  return 'text'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function unwrapOptional(field: z.ZodTypeAny): any {
  if (field instanceof z.ZodOptional || field instanceof z.ZodNullable) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return unwrapOptional((field as any).unwrap())
  }
  return field
}

interface FieldRendererProps {
  name: string
  field: z.ZodTypeAny
  register: ReturnType<typeof useForm>['register']
  setValue: ReturnType<typeof useForm>['setValue']
  watch: ReturnType<typeof useForm>['watch']
  error?: string
}

function FieldRenderer({ name, field, register, setValue, watch, error }: FieldRendererProps) {
  const inner = unwrapOptional(field)
  const label = toLabel(name)
  const isOptional = field instanceof z.ZodOptional

  if (inner instanceof z.ZodBoolean) {
    const checked = Boolean(watch(name))
    return (
      <Field label={label} error={error}>
        <div className="flex items-center gap-2">
          <Checkbox
            id={name}
            checked={checked}
            onCheckedChange={v => setValue(name, v)}
          />
          <label htmlFor={name} className="text-sm text-[hsl(var(--foreground))]">{label}</label>
        </div>
      </Field>
    )
  }

  if (inner instanceof z.ZodEnum) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options = ((inner as any).options ?? []) as string[]
    const value = watch(name) as string | undefined
    return (
      <Field label={label} required={!isOptional} error={error}>
        <Select value={value} onValueChange={v => setValue(name, v)}>
          <SelectTrigger><SelectValue placeholder={`Select ${label.toLowerCase()}`} /></SelectTrigger>
          <SelectContent>
            {options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
    )
  }

  if (inner instanceof z.ZodDate) {
    const value = watch(name) as Date | undefined
    return (
      <Field label={label} required={!isOptional} error={error}>
        <DatePicker value={value} onChange={d => setValue(name, d)} placeholder={`Select ${label.toLowerCase()}`} />
      </Field>
    )
  }

  if (inner instanceof z.ZodNumber) {
    return (
      <Field label={label} required={!isOptional} error={error}>
        <Input type="number" {...register(name, { valueAsNumber: true })} />
      </Field>
    )
  }

  const inputType = getInputType(inner)
  return (
    <Field label={label} required={!isOptional} error={error}>
      <Input type={inputType} {...register(name)} />
    </Field>
  )
}

export function AutoForm({ schema, onSubmit, defaultValues, submitLabel = 'Submit' }: AutoFormProps) {
  const { register, handleSubmit, setValue, watch, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as Record<string, unknown>,
  })

  const shape = schema.shape

  return (
    <form onSubmit={handleSubmit(d => onSubmit(d as Record<string, unknown>))} className="flex flex-col gap-4">
      {Object.entries(shape).map(([name, field]) => (
        <FieldRenderer
          key={name}
          name={name}
          field={field as z.ZodTypeAny}
          register={register}
          setValue={setValue}
          watch={watch}
          error={formState.errors[name]?.message as string | undefined}
        />
      ))}
      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}
