import key from "../constants/breezometerKey";

class BreezometerService {
  async fetchConditionsForLocation({ latitude, longitude }) {
    const url = `https://api.breezometer.com/baqi/?lat=${latitude}&lon=${longitude}&key=${key}`;
    const response = await fetch(url);
    return response.json();
  }
}

export default BreezometerService;
