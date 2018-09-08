const fs = require("fs");
const parser = require("csv-parser");

class FireManager {
  constructor() {
    this._govFires = undefined;
  }

  async initialize() {
    const govFires = [];

    await new Promise(resolve => {
      fs.createReadStream("./data/MODIS_C6_USA_contiguous_and_Hawaii_24h.csv")
        .pipe(parser())
        .on("data", row => {
          const { latitude, longitude, acq_date: updatedDate } = row;
          govFires.push({
            latitude,
            longitude,
            radius: 1000,
            updatedDate,
          });
        })
        .on("end", () => {
          resolve();
        });
    });

    await new Promise(resolve => {
      fs.createReadStream("./data/VNP14IMGTDL_NRT_USA_contiguous_and_Hawaii_24h.csv")
        .pipe(parser())
        .on("data", row => {
          const { latitude, longitude, acq_date: updatedDate } = row;
          govFires.push({
            latitude,
            longitude,
            radius: 375,
            updatedDate,
          });
        })
        .on("end", () => {
          resolve();
        });
    });

    this._govFires = govFires;
  }


  async getAllFires() {
    const fires = JSON.parse(JSON.stringify(this._govFires));
    return {
      status: 200,
      json: fires,
    };
  }
}

module.exports = FireManager;
