class FireManager {
  constructor(fireAPIService) {
    this._fireAPISerivce = fireAPIService;
  }

  async fetchFireData() {
    return await this._fireAPISerivce.fetchFireData();
  }

  async reportFire({ latitude, longitude, user }) {
    const { email } = user || {};
    return await this._fireAPISerivce.reportFire(latitude, longitude, email);
  }
}

export default FireManager
