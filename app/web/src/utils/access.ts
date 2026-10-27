import { RolesEnum } from "@src/models/enums";

export const hasAccess = (userRoles: RolesEnum | RolesEnum[], roles: RolesEnum | RolesEnum[]) => {

  if (typeof userRoles === 'object') {
    for (const userRole of userRoles) {
      if (typeof roles === 'object') {
        return roles.find(role => role === userRole)
      }

      return roles === userRole;
    }
  }

  if (typeof roles === 'object') {
    return roles.find(role => role === userRoles)
  }

  return roles === userRoles;
}