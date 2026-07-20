export const VALIDATION_MESSAGES = {
  required: (label: string) => `${label} là bắt buộc.`,
  minLength: (label: string, min: number) => `${label} phải có ít nhất ${min} ký tự.`,
  maxLength: (label: string, max: number) => `${label} không được vượt quá ${max} ký tự.`,
  invalidNumber: (label: string) => `${label} phải là một số hợp lệ.`,
  minNumber: (label: string, min: number) => `${label} phải lớn hơn hoặc bằng ${min}.`,
  maxNumber: (label: string, max: number) => `${label} phải nhỏ hơn hoặc bằng ${max}.`,
  invalidDate: (label: string) => `${label} không hợp lệ.`,
  invalidEmail: () => "Email không hợp lệ.",
} as const
