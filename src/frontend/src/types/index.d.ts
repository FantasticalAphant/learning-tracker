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
    accessed: Date;
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

// export interface BookResponse {
// }

export interface Video {
    videoId: string;
    videoTitle: string;
    videoDescription: string;
    channelId: string;
    channelTitle: string;
    publishedAt: Date;
    topics: number[];
}

// export interface VideoResponse {
// }

export interface Task {
    id: number;
    content: string;
    completed: boolean;
}

export interface Note {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface S3File {
    filename: string;
    lastModified: Date;
    size: number;
    url: string;
}