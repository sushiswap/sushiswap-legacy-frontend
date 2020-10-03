const axios = require('axios');
const Node = require("./node.js").Node;
const constants = require("../utils/constants.js");

// Dispatch
/**
 *
 *
 * @class Dispatch
 */
class Dispatch {
  /**
   *Creates an instance of Dispatch.
   * @param {Configuration} configuration - Configuration object.
   * @memberof Dispatch
   */
  constructor(configuration) {
    this.configuration = configuration;
    this.axiosInstance = axios.create({
      baseURL: constants.dispatchNodeURL,
      path: constants.dispatchPath,
      timeout: this.configuration.requestTimeOut,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  /**
   *
   * blockchain object to JSON
   * @returns {JSON} - JSON Array with the blockchain list.
   * @memberof Dispatch
   */
  blockchainsJSON() {
    var blockchainArray = []
    this.configuration.blockchains.forEach(element => {
      blockchainArray.push(element);
    });
    return blockchainArray
  }
  /**
   *
   * Retrieves a list of service nodes
   * @param {callback} callback
   * @returns {Node} - A Node object list.
   * @memberof Dispatch
   */
  async retrieveServiceNodes(callback) {
    try {
      var dispatch = this;
      var response = null;

      response = await this.axiosInstance.post(constants.dispatchPath, {
        "DevID": dispatch.configuration.devID,
        "Blockchains": dispatch.blockchainsJSON()
      });

      if (response != null && response.status == 200 && response.data != null) {
        var nodes = this.parseDispatchResponse(response.data);

        if (callback) {
          callback(nodes, null);
          return;
        } else {
          return nodes;
        }
      } else {
        if (callback) {
          callback(null, new Error("Failed to retrieve service nodes with error: " + response.data));
          return;
        } else {
          return new Error("Failed to retrieve service nodes with error: " + response.data);
        }
      }
    } catch (err) {
      if (callback) {
        callback(null, new Error("Failed to retrieve service nodes with error: " + err));
        return;
      } else {
        return new Error("Failed to retrieve service nodes with error: " + err);
      }
    }
  }

  /**
   *
   * Parse the response from the dispatcher
   * @param {Object} response
   * @returns {Node} - A Node object list.
   * @memberof Dispatch
   */
  parseDispatchResponse(response) {
    try {
      // Variables
      var nodes = [];

      if (Array.isArray(response)) {
        // Iterate through the array for different networks results
        response.forEach(element => {
          
          var network = element.name;
          var netID = element.netid;

          if (element.ips) {
            // Create a Node object for each item inside the dataKey object, IP:PORT
            element.ips.forEach(ipPort => {
              var node = new Node(network, netID, ipPort);
              nodes.push(node);
            });
          }
        });
      } else {

        var network = response.name;
        var netID = response.netid;

        if (response.ips) {
          // Create a Node object for each item inside the dataKey object, IP:PORT
          response.ips.forEach(ipPort => {
            var node = new Node(network, netID, ipPort);
            nodes.push(node);
          });
        }

      }
      return nodes;

    } catch (error) {
      return new Error("Failed to parsed service nodes with error: " + error);
    }

  }

}

module.exports = {
  Dispatch
}