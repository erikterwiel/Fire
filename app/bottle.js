import Bottle from "bottlejs";
import FireAPIService from "./services/FireAPI";
import BreezometerService from "./services/Breezometer";
import FireManager from "./managers/Fire";
import AirManager from "./managers/Air";

const bottle = new Bottle();

bottle.service("fireAPIService", FireAPIService);
bottle.service("breezometerService", BreezometerService);
bottle.service("fireManager", FireManager, "fireAPIService");
bottle.service("airManager", AirManager, "breezometerService");

export default bottle.container;
