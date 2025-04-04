export interface FormValidation {
  nameRequired: string
  messageRequired: string
  emailInvalid: string
}

export interface ContactFormProps {
  title: string
  name: string
  email: string
  phone: string
  message: string
  submit: string
  phonePlaceholder: string
  phoneError: string
  success: string
  error: string
  sending: string
  securityCheck: string
  securityError: string
  validation: FormValidation
}
