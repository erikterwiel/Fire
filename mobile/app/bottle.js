import Bottle from "bottlejs";
import FireAPIService from "./services/FireAPI";
import FireManager from "./managers/Fire";

const bottle = new Bottle();

bottle.service("fireAPIService", FireAPIService);
bottle.service("fireManager", FireManager, "fireAPIService");

export default bottle.container;
