import * as v from "valibot"

import { VALIDATION_MESSAGES } from "./messages"

type TextOptions = {
  label: string
  min?: number
  max?: number
}

export function requiredText({ label, min = 1, max = 255 }: TextOptions) {
  return v.pipe(
    v.string(VALIDATION_MESSAGES.required(label)),
    v.trim(),
    v.minLength(
      min,
      min === 1 ? VALIDATION_MESSAGES.required(label) : VALIDATION_MESSAGES.minLength(label, min),
    ),
    v.maxLength(max, VALIDATION_MESSAGES.maxLength(label, max)),
  )
}

export function optionalText({ label, max = 1000 }: Omit<TextOptions, "min">) {
  return v.optional(
    v.pipe(v.string(), v.trim(), v.maxLength(max, VALIDATION_MESSAGES.maxLength(label, max))),
    "",
  )
}

export function requiredEmail(label = "Email") {
  return v.pipe(requiredText({ label, max: 254 }), v.email(VALIDATION_MESSAGES.invalidEmail()))
}

export function requiredNumber(label: string, options: { min?: number; max?: number } = {}) {
  const { min, max } = options
  const schema = v.number(VALIDATION_MESSAGES.invalidNumber(label))

  if (min !== undefined && max !== undefined) {
    return v.pipe(
      schema,
      v.minValue(min, VALIDATION_MESSAGES.minNumber(label, min)),
      v.maxValue(max, VALIDATION_MESSAGES.maxNumber(label, max)),
    )
  }

  if (min !== undefined) {
    return v.pipe(schema, v.minValue(min, VALIDATION_MESSAGES.minNumber(label, min)))
  }

  if (max !== undefined) {
    return v.pipe(schema, v.maxValue(max, VALIDATION_MESSAGES.maxNumber(label, max)))
  }

  return schema
}

export function requiredMoney(label: string) {
  return requiredNumber(label, { min: 0 })
}

export function requiredDateString(label: string) {
  return v.pipe(
    v.string(VALIDATION_MESSAGES.required(label)),
    v.minLength(1, VALIDATION_MESSAGES.required(label)),
    v.isoDate(VALIDATION_MESSAGES.invalidDate(label)),
  )
}

export function requiredSelection(label: string) {
  return requiredText({ label, max: 100 })
}
