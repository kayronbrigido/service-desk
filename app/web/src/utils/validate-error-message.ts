export const validateErrorMessage = (error: unknown) => {

  let message = ''
  if (error instanceof Error) {
    message = error.message
  } else {
    message = 'generic_error'
  }

  return `errors.${message}`
}