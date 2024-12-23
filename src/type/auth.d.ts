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

export interface INotification {
    uuid: string;
    title: string;
    description: string;
    created_at: string;
    user_id: number;
    is_new: boolean;
    is_expired: boolean;
    type: string;
}

