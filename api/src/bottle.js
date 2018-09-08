const Bottle = require("bottlejs");
const FireManager = require("./managers/fire");

const bottle = new Bottle();

bottle.service("fireManager", FireManager);

module.exports = bottle.container;

