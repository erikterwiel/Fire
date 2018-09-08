class FireAPIService {
  async fetchFireData() {
    const response = await fetch("https://protected-chamber-85126.herokuapp.com/fire");
    return response.json();
  }
}

export default FireAPIService;
