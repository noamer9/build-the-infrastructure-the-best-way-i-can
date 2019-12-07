import { Comment } from './../../shared/model/comment';

export interface Event {

    id: number;
    title: string;
    description: string;
    location: string;
    lat: string;
    lng: string;
    image_path: string;
    price: number;
    url?: string;
    starts_at: Date;
    ends_at: Date;
    comments: Comment[];
    types: [];
}
