class AirManager {
  constructor(breezometerService) {
    this._breezometerService = breezometerService;
  }

  async fetchConditionsForLocation(location) {
    return await this._breezometerService.fetchConditionsForLocation(location);
  }
}

export default AirManager;
