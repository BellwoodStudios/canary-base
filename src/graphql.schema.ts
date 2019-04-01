
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Photo {
    id: number;
    name?: string;
    description?: string;
    owner?: User;
}

export abstract class IQuery {
    abstract photo(id: number): Photo | Promise<Photo>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id: number;
    email?: string;
}
