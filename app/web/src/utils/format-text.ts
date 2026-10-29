export function textLength(text: string, maxLength?: number) {
  length = maxLength || 15

  if (!text) {
    return ''
  }

  if (text.length > length) {
    return `${text.substring(0, length - 3)}...`
  }

  return text
}

export function hideUserName(userName: string) {
  return userName.substring(0, 3) + '***' + userName.substring(userName.length - 3);
}