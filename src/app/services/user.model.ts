export class User {
    username: string;
    foto: string;

    constructor(username: string, foto: string = '') {
        this.username = username;
        this.foto = foto;
    }
}