import { SystemRoles } from '@/api/authorization/systemRoles';

const isValidAuthorization = (role: string | undefined, allowedRoles: string[]) => {
  if(!SystemRoles.SERVER_AUTH) {
    return true;
  }

  if(allowedRoles.includes(role)) {
    return true;
  }

  return false;
}

export default isValidAuthorization;
