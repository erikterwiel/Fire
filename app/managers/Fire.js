class FireManager {
  constructor(fireAPIService) {
    this._fireAPISerivce = fireAPIService;
  }

  async fetchFireData() {
    return await this._fireAPISerivce.fetchFireData();
  }
}

export default FireManager
