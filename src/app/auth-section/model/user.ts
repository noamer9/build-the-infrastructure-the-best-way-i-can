export interface User {
    id?: number;
    email: string;
    password?: string;
    phone?: string;
    facebook_id?: string;
    google_id?: string;
    info?: UserInfo;
}

export interface UserInfo {
    id?: number;
    user_id: number;
    first_name: string;
    last_name: string;
    city: string;
    relationship_status: string;
    avatar?: string;

}
