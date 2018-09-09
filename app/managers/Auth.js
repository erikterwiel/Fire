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
}

export default AuthManager;
