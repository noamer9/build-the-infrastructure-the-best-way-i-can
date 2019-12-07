import { Comment } from './../../shared/model/comment';

export interface Article {

    id: number;
    title: string;
    description: string;
    // location: string;
    // lat: string;
    // lng: string;
    image_path: string;
    // price: number;
    url?: string;
    starts_at: Date;
    ends_at: Date;
    articleComments: Comment[];
    // types: [];
}
