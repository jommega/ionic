import { BehaviorSubject, Observable } from 'rxjs';
export class UserService {

    user: User;
    private userSubject = new BehaviorSubject(this.user);

    // Lo demas componentes se ponen a la esucha de cambio
    // a través de esté método
    getUserObservable(): Observable<User> {
        return this.userSubject.asObservable();
    }

  // Este método se usa para enviar los cambios a todos los componentes a la escucha
  private setUser(user: User) {
      this.user = user;
      // Refrescar user en los observables
      this.userSubject.next(this.user);
   }
}

export class User {
    username: string;
    foto: string;

    constructor(username: string, foto: string = '') {
        this.username = username;
        this.foto = foto;
    }
}