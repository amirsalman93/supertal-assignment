export interface ICreateUser {
    name: string;
    username: string;
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    username: string;
    password: string;
}

export interface IUserCredentials {
    username: string;
    password: string;
}

export interface IAccessToken {
    access_token: string;
    user: IUser;
}