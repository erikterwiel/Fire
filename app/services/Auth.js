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

  async updateUser(user) {
    const response = await fetch("https://protected-chamber-85126.herokuapp.com/user/", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  }
}

export default AuthService;
