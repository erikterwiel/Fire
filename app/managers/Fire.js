class FireManager {
  constructor(fireAPIService) {
    this._fireAPISerivce = fireAPIService;
  }

  async fetchAllFires() {
    return await this._fireAPISerivce.fetchAllFires();
  }
}

export default FireManager
