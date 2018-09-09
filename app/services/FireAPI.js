class FireAPIService {
  async fetchFireData() {
    const response = await fetch("https://protected-chamber-85126.herokuapp.com/fire");
    return response.json();
  }

  async reportFire(latitude, longitude, email) {
    const fire = {
      latitude,
      longitude,
      email,
    };
    const response = await fetch("https://protected-chamber-85126.herokuapp.com/fire", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fire),
    });
    return response.json();
  }
}

export default FireAPIService;
