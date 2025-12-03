export interface ProfileUser{
    userId: number;
}

export interface FollowerUser {
    followed_id : number;
}


export interface ProfileUserResponse {
    message: string;
    user: {
        id: number;
        nickname: string;
        email: string;
        avatar: string | null;
        type_user: number;
        created: string;
        updated: string;
    };
}