class FireAPIService {
  async fetchAllFires() {
    const response = await fetch("http://10.0.2.2:5000/fire");
    return response.json();
  }
}

export default FireAPIService;
