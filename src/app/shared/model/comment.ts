import { User } from './../../auth-section/model/user';
export interface Comment {
    id?: number;
    event_id: number;
    article_id: number;
    title: string;
    body: string;
    likes: number;
    relate_to?: number;
    created_at: Date;
    updated_at: Date;
    subComments?: Comment[];
    user?: User;
    user_id?: number;
}

export interface PostComment {
    event_id: number;
    user_id: number;
    title: string;
    body: string;
    relate_to?: number;

}

export interface PostCommentArticle {
    article_id: number;
    user_id: number;
    title: string;
    body: string;
    relate_to?: number;

}
