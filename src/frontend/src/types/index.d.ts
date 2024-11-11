export interface Topic {
    id: number;
    name: string;
    description: string;
}

export interface Article {
    url: string;
    title: string;
    site: string;
    created: Date;
    topics: number[];
}

export interface Book {
    isbn: string;
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    thumbnail: string;
    topics: string[];
}

export interface BookResponse {
}

export interface Video {
    videoId: string;
    videoTitle: string;
    videoDescription: string;
    channelId: string;
    channelTitle: string;
    publishedAt: Date;
    topics: number[];
}

export interface VideoResponse {
}

export interface Task {
    id: number;
    content: string;
    completed: boolean;
}
