/**
 *
 *
 * @class Blockchain
 */
class Blockchain {
  /**
   * Creates an instance of Blockchain.
   * @param {String} name - Blockchain's name.
   * @param {String} netID - Network identifier.
   * @memberof Blockchain
   */
  constructor(name, netID) {
    this.name = name;
    this.netID = netID;
  }
  /**
   *
   * toJSON
   * @returns {JSON} - A JSON object.
   * @memberof Blockchain
   */
  toJSON() {
    return JSON.parse('{ "name":"' + 
    this.name + '", "netID":"' + 
    this.netID + '"}')
  }
}

module.exports = {
  Blockchain
}