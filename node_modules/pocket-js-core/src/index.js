const Models = require("./models/index");
const Wallet = Models.Wallet;
const Relay = Models.Relay;
const Pocket = require("./pocket");

module.exports = {
  Pocket,
  Wallet,
  Relay
}