export class SystemRoles {
  public static get ADMIN () { return 'ADMIN' }
  public static get USER () { return 'USER' }

  public static get MANAGER () { return 'MANAGER' }

  public static allRoles (): string[] {
    return [
      this.ADMIN,
      this.USER
    ];
  }

  public static SERVER_AUTH = true;
}
