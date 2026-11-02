# Switch Prompts

## Add a settings toggle
"Add a Switch for [setting] to the settings list in [file], using @otfdashkit/ui. Put the label on the left, the Switch on the right, give it an aria-label, and wire checked and onCheckedChange to existing state."

## Brand the on colour
"In [file], make the Switch use my brand colour when on. Override both data-[state=checked]:bg-[colour] and data-[state=checked]:border-[colour] through className so the ring matches the fill. Don't change the size or the knob."

## Match the native size
"Use <Switch size=\"md\" /> for the dark-mode switch in [file] so it matches the 51x31 OtfSwitch in the mobile app. Keep size sm for dense rows."

## Disabled and loading states
"Disable the Switch in [file] while the save request is in flight, show it at 40% opacity (the default disabled style), and roll back checked if the request fails."
