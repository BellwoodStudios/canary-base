/* tslint:disable */
export abstract class Author {
    id: number;
    firstName?: string;
    lastName?: string;
    posts?: Post[];
}

export abstract class Post {
    id: number;
    title?: string;
    votes?: number;
}

export abstract class IQuery {
    abstract author(id: number): Author | Promise<Author>;

    abstract temp__(): boolean | Promise<boolean>;
}
