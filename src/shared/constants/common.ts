export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';

export const FORWARDED_FOR_TOKEN_HEADER = 'x-forwarded-for';

export enum RESULT_STATUS {
  FAILED = 0,
  SUCCEED = 1,
}

export const MESSAGES = {
  OK: 'ok',

  LOGIN_INCORRECT: 'login incorrect',

  USERNAME_ALREADY_EXIST: 'username already exist',
  NOT_FOUND_USER: 'not found user',

  NOT_FOUND_EXPENSE: 'not found expense',
  NOT_NEW_REQUEST: 'not new request',
  NOT_YET_APPROVED_BY_MANAGER: 'not yet approved by manager',
  EXPENSE_ALREADY_APPROVED_BY_MANAGER: 'expense already approved by manager',
};
