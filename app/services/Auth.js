class AuthService {
  async login(credentials) {
    const response = await fetch("https://protected-chamber-85126.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }
}

export default AuthService;
