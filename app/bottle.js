import Bottle from "bottlejs";
import AuthService from "./services/Auth";
import FireAPIService from "./services/FireAPI";
import BreezometerService from "./services/Breezometer";
import AuthManager from "./managers/Auth";
import FireManager from "./managers/Fire";
import AirManager from "./managers/Air";

const bottle = new Bottle();

bottle.service("authService", AuthService);
bottle.service("fireAPIService", FireAPIService);
bottle.service("breezometerService", BreezometerService);
bottle.service("authManager", AuthManager, "authService");
bottle.service("fireManager", FireManager, "fireAPIService");
bottle.service("airManager", AirManager, "breezometerService");

export default bottle.container;
