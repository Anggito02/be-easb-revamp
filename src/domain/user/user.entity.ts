export class User {
    constructor(
        public id: number | null,
        public username: string,
        public passwordHash: string,
        public roles: string[],
    ) {}
}
