export interface IUser {
    id: number;
    username: string;
    fullname: string;
    email: string;
    password: string;
    role: string;
    avatar: string;
    age: number;
    is_verified: boolean;
    is_bhyt: boolean;
    is_gplx: boolean;
    accessToken: string;
}
