export interface registerUser {
  nickname: string;
  email: string;
  password: string;
  uuid: string;
  type_register: number;
  type_user: number;
}

export interface responseRegister {
  message: string;
  userId: number;
  token: string;
}

export interface verifyUser {
  uuid: string;
  userId: number;
}

export interface responseVerify {
  message: string;
  response: {
    token: string;
    status: string;
  };
  user: {
    id: number;
    nickname: string;
    type_register: number;
    email: string;
    password: string;
    type_user: number;
    avatar: string | null;
    uuid: string;
    lvl_user: string;
    status: string;
    created: string;
    updated: string;
  };
}

export interface loginUser {
  email?: string;
  password?: string;
  uuid?: string;
  type_register: number;
}

export interface responseLogin {
  message: string;
  userId: number;
  nickname: string;
  email: string;
  uuid: string;
  type_register: number;
  type_user: number;
  token: string;
}

export interface logoutUser {
  userId: number;
}

export interface responseLogout {
  message: string;
}
