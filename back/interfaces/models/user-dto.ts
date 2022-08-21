/** Роли пользователя. */
export enum USER_ROLES {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

/** Пользователь. */
export interface UserDto {
  /** Идентификатор. */
  id: number;
  /** Имя. */
  name: string;
  /** Логин. */
  login: string;
  /** Пароль в неявном виде. */
  hashedPassword: string;
  /** Токен для продления авторизации. */
  refreshToken: string;
  /** Роли. */
  roles: USER_ROLES[];
}
