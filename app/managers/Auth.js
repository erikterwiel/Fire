import { BehaviorSubject } from "rxjs";

class AuthManager {
  constructor(authService) {
    this._authService = authService;
    this._user$ = new BehaviorSubject(undefined);
  }

  get user$() {
    return this._user$;
  }

  async login(credentials) {
    const response = await this._authService.login(credentials);
    if (response.error) {
      return false;
    }
    console.log(response);
    this.user$.next(response);
    return true;
  }

  async addProperty({ latitude, longitude, newText }) {
    const user = JSON.parse(JSON.stringify(this.user$.getValue()));
    user.properties.push({ latitude, longitude, title: newText });
    await this._authService.updateUser(user);
    this.user$.next(user);
  }
}

export default AuthManager;
