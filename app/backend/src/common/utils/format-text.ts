export function hideUserName(userName: string) {
    return userName.substring(0, 3) + '***' + userName.substring(userName.length - 3);
  }