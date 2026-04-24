import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Field, FieldLabel, FieldDescription, FieldError,
  PasswordInput,
  SearchInput,
  FileUpload, FileUploadPreview,
  DatePicker,
  StepForm, StepFormStep,
  ArrayField,
  ObjectField,
  AutoForm,
  Input,
} from '@otf/ui'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@otf/ui/forms-form'

const meta: Meta = { title: 'Forms', tags: ['autodocs'] }
export default meta

export const FieldBasic: StoryObj = {
  name: 'Field / Basic',
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Field label="Email" description="We'll never share your email." required>
        <Input type="email" placeholder="you@example.com" />
      </Field>
      <Field label="Username" error="Username is already taken.">
        <Input placeholder="johndoe" />
      </Field>
      <div className="flex flex-col gap-1.5">
        <FieldLabel required>Custom label</FieldLabel>
        <Input placeholder="value" />
        <FieldDescription>Some helper text</FieldDescription>
        <FieldError>Validation error message</FieldError>
      </div>
    </div>
  ),
}

function PasswordDemo() {
  const [val, setVal] = useState('')
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Field label="Password">
        <PasswordInput placeholder="Enter password" value={val} onChange={e => setVal(e.target.value)} />
      </Field>
      <Field label="Password with strength">
        <PasswordInput placeholder="Enter password" strength value={val} onChange={e => setVal(e.target.value)} />
      </Field>
    </div>
  )
}
export const PasswordInputStory: StoryObj = { name: 'PasswordInput', render: () => <PasswordDemo /> }

function SearchDemo() {
  const [val, setVal] = useState('')
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <SearchInput placeholder="Search…" shortcut="⌘K" value={val} onChange={setVal} onClear={() => setVal('')} />
      <SearchInput placeholder="Filter results" value={val} onChange={setVal} />
    </div>
  )
}
export const SearchInputStory: StoryObj = { name: 'SearchInput', render: () => <SearchDemo /> }

function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([])
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <FileUpload accept="image/*" multiple maxSize={5 * 1024 * 1024} onFiles={(f) => setFiles(p => [...p, ...f])} />
      <FileUploadPreview files={files} onRemove={i => setFiles(f => f.filter((_, idx) => idx !== i))} />
    </div>
  )
}
export const FileUploadStory: StoryObj = { name: 'FileUpload', render: () => <FileUploadDemo /> }

function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <div className="max-w-xs">
      <Field label="Appointment date">
        <DatePicker value={date} onChange={setDate} placeholder="Select a date" />
      </Field>
    </div>
  )
}
export const DatePickerStory: StoryObj = { name: 'DatePicker', render: () => <DatePickerDemo /> }

function RHFDemo() {
  const methods = useForm({ defaultValues: { email: '', message: '' } })
  const { handleSubmit } = methods
  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(console.log)} className="flex flex-col gap-4 max-w-sm">
        <FormField
          name="email"
          control={methods.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel error={!!fieldState.error}>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>We'll send a confirmation.</FormDescription>
              <FormMessage name="email" />
            </FormItem>
          )}
        />
        <FormField
          name="message"
          control={methods.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel error={!!fieldState.error}>Message</FormLabel>
              <FormControl>
                <Input placeholder="Your message" {...field} />
              </FormControl>
              <FormMessage name="message" />
            </FormItem>
          )}
        />
        <button type="submit" className="rounded-[var(--radius)] bg-[hsl(var(--primary))] px-4 py-2 text-sm text-[hsl(var(--primary-foreground))]">
          Submit
        </button>
      </form>
    </Form>
  )
}
export const FormStory: StoryObj = { name: 'Form (react-hook-form)', render: () => <RHFDemo /> }

export const StepFormStory: StoryObj = {
  name: 'StepForm',
  render: () => (
    <div className="max-w-md">
      <StepForm steps={['Account', 'Profile', 'Review']} onSubmit={() => alert('Submitted!')}>
        <StepFormStep title="Create your account" description="Enter your login credentials.">
          <Field label="Email" required><Input type="email" placeholder="you@example.com" /></Field>
          <Field label="Password" required><PasswordInput placeholder="••••••••" /></Field>
        </StepFormStep>
        <StepFormStep title="Set up your profile" description="Tell us about yourself.">
          <Field label="Display name" required><Input placeholder="Jane Doe" /></Field>
          <Field label="Bio"><Input placeholder="Short bio…" /></Field>
        </StepFormStep>
        <StepFormStep title="Review & submit" description="Check your details before submitting.">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">Please confirm everything looks correct.</p>
        </StepFormStep>
      </StepForm>
    </div>
  ),
}

function ArrayFieldDemo() {
  const [items, setItems] = useState([''])
  return (
    <div className="max-w-sm">
      <Field label="Email addresses">
        <ArrayField
          value={items}
          onChange={setItems}
          defaultItem=""
          addLabel="Add email"
          maxItems={5}
          renderItem={(item, index, remove) => (
            <Input
              value={item}
              placeholder={`Email ${index + 1}`}
              onChange={e => {
                const next = [...items]
                next[index] = e.target.value
                setItems(next)
              }}
              onKeyDown={e => e.key === 'Backspace' && item === '' && remove()}
            />
          )}
        />
      </Field>
    </div>
  )
}
export const ArrayFieldStory: StoryObj = { name: 'ArrayField', render: () => <ArrayFieldDemo /> }

export const ObjectFieldStory: StoryObj = {
  name: 'ObjectField',
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <ObjectField title="Billing Address" description="Your invoice will be sent here." collapsible>
        <Field label="Street" required><Input placeholder="123 Main St" /></Field>
        <Field label="City" required><Input placeholder="San Francisco" /></Field>
      </ObjectField>
      <ObjectField title="Shipping Address" collapsible defaultOpen={false}>
        <Field label="Street"><Input placeholder="123 Main St" /></Field>
      </ObjectField>
    </div>
  ),
}

const registrationSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  age: z.number().min(18).max(120),
  role: z.enum(['admin', 'editor', 'viewer']),
  newsletter: z.boolean().optional(),
  startDate: z.date().optional(),
})

export const AutoFormStory: StoryObj = {
  name: 'AutoForm',
  render: () => (
    <div className="max-w-sm">
      <AutoForm
        schema={registrationSchema}
        onSubmit={(data: unknown) => alert(JSON.stringify(data, null, 2))}
        defaultValues={{ role: 'viewer', newsletter: false }}
        submitLabel="Register"
      />
    </div>
  ),
}
