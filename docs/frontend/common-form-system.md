# Reusable form system

## Goal

Feature code should describe business fields and validation, while common components own labels, accessibility, errors, loading states, and Shadcn styling.

## Layers

1. `components/ui`: Shadcn-compatible visual primitives. They do not know React Hook Form or business rules.
2. `components/form`: reusable React Hook Form adapters and the configuration-driven `AutoForm`.
3. `lib/validation`: shared Valibot schema builders and message conventions.
4. `lib/forms`: backend validation-error mapping.
5. `features/*`: feature schemas, field configuration, API calls, and feature-specific layout only.

## Standard CRUD form

```tsx
const schema = v.object({
  code: requiredText({ label: "Mã phòng", max: 30 }),
  monthlyRent: requiredMoney("Giá thuê"),
  isActive: v.boolean(),
})

type Values = v.InferInput<typeof schema>

const fields = [
  { type: "text", name: "code", label: "Mã phòng", required: true },
  { type: "number", name: "monthlyRent", label: "Giá thuê", required: true },
  { type: "switch", name: "isActive", label: "Đang hoạt động" },
] satisfies AutoFormField<Values>[]

<AutoForm
  schema={schema}
  defaultValues={{ code: "", monthlyRent: 0, isActive: true }}
  fields={fields}
  onSubmit={saveRoom}
/>
```

## Custom form layout

Use `SchemaForm` with `TextFormField`, `SelectFormField`, and the other field adapters when a screen needs a custom layout. Do not use `Controller` directly in features unless a field has truly unique behavior.

## Backend errors

Convert the API response to `ApiError` and call `applyApiErrors(error, form.setError)`. Field errors appear under the correct input; non-field errors are returned so the page can show a toast or alert.

## Rules

- Validation messages live in `lib/validation`, not inside pages.
- Feature code imports from `@/components/form`, never deep-imports individual implementation files.
- Keep `components/ui` business-agnostic.
- Prefer field components first; use `AutoForm` for ordinary create/edit CRUD screens.
- Do not create one component per business entity when field behavior is identical.
