const Models = require("./models/index");
const Blockchain = Models.Blockchain;
const Dispatch = Models.Dispatch;
const Relay = Models.Relay;
const Report = Models.Report;

/**
 *
 *
 * @class Configuration
 */
class Configuration {
  /**
   * Configuration stores settings.
   * @constructor
   * @param {string} devID - Unique developer ID.
   * @param {string} blockchains - Blockchain class type list.
   * @param {string} maxNodes - (optional) Maximun amount of nodes to store in instance, default 5.
   * @param {string} requestTimeOut - (optional) Maximun timeout for every request in miliseconds, default 10000.
   */
  constructor(devID, blockchains, maxNodes, requestTimeOut) {
    this.devID = devID;
    this.blockchains = blockchains;
    this.maxNodes = maxNodes || 5;
    this.nodes = [];
    this.requestTimeOut = requestTimeOut || 10000;
    this.dispatch = null;
  }
  /**
   * Verify if the nodes list is empty
   *
   * @returns {Boolean}
   * @memberof Configuration
   */
  nodesIsEmpty() {
    if (this.nodes == null || this.nodes.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}
/**
 *
 *
 * @class Pocket
 */
class Pocket {
  /**
   * Creates an instance of Pocket.
   * @param {Object} opts - Options for the initializer, devID, networkName, netIDs, maxNodes, requestTimeOut.
   * @memberof Pocket
   */
  constructor(opts) {
    var blockchains = [];

    if (opts.devID == null || opts.networkName == null || opts.netIDs == null) {
      return new Error("Invalid number of arguments");
    }

    if (Array.isArray(opts.netIDs)) {
      opts.netIDs.forEach(element => {
        var blockchain = new Blockchain(opts.networkName, element);
        blockchains.push(blockchain.toJSON());
      });
    } else {
      var blockchain = new Blockchain(opts.networkName, opts.netIDs);
      blockchains.push(blockchain.toJSON());
    }

    this.configuration = new Configuration(opts.devID, blockchains, opts.maxNodes || 5, opts.requestTimeOut || 10000);

  }
  /**
   *
   * Create a Relay instance
   * @param {Blockchain} blockchain - Blockchain object.
   * @param {String} netID - Network Idenfifier.
   * @param {String} data - String holding the json rpc call.
   * @returns {Relay} - New Relay instance.
   * @memberof Pocket
   */
  createRelay(blockchain, netID, data) {
    // Check if data is a json tring
    if (typeof data == 'string') {
      return new Relay(blockchain, netID, data, this.configuration); 
    }
    return new Relay(blockchain, netID, JSON.stringify(data), this.configuration);
  }
  /**
   *
   * Create a Report instance
   * @param {String} ip - Internet protocol address.
   * @param {String} message - Brief description for the report.
   * @returns {Report} - New Report instance.
   * @memberof Pocket
   */
  createReport(ip, message) {
    return new Report(ip, message, this.configuration);
  }
  /**
   *
   * Get a Dispatch instance or creates one
   * @returns {Dispatch} - New or existing Dispatch instance.
   * @memberof Pocket
   */
  getDispatch() {
    if (this.dispatch == null) {
      this.dispatch = new Dispatch(this.configuration);
    }
    return this.dispatch;
  }
  /**
   *
   * Filter nodes by netID and blockchain name
   * @param {String} netID - Network Idenfifier.
   * @param {String} network - Network Name.
   * @returns {Node} - New Node instance.
   * @memberof Pocket
   */
  async getNode(netID, network) {
    try {
      var nodes = [];

      if (this.configuration.nodesIsEmpty()) {
        var response = await this.retrieveNodes();

        if (response instanceof Error == true) {
          throw response;
        }else {
          // Save the nodes to the configuration.
          this.configuration.nodes = response;
        }
      }
      
      this.configuration.nodes.forEach(node => {
        if (node.isEqual(netID, network)) {
          nodes.push(node);
        }
      });

      if (nodes.length <= 0) {
        return null
      }

      return nodes[Math.floor(Math.random() * nodes.length)];
    } catch (error) {
      return null;
    }
  }
  /**
   *
   * Send a report
   * @param {Report} report - Report instance with the information.
   * @param {callback} callback - callback handler.
   * @returns {String} - A String with the response.
   * @memberof Pocket
   */
  async sendReport(report, callback) {
    try {
      // Check for report
      if (report == null) {
        throw new Error("Report is null");
      }
      // Verify all report properties are set
      if (!report.isValid()) {
        throw new Error("One or more Report properties are empty.");
      }
      // Send Report
      var response = await report.send();
      // Response
      if (response instanceof Error == false) {
        if (callback) {
          callback(null, response);
          return;
        } else {
          return response;
        }
      } else {
        if (callback) {
          callback(response);
          return;
        } else {
          return response;
        }
      }
    } catch (error) {
      if (callback) {
        callback(error);
        return;
      } else {
        return error;
      }
    }
  }
  /**
   *
   * Send an already created Relay
   * @param {Relay} relay - Relay instance with the information.
   * @param {callback} callback - callback handler.
   * @returns {String} - A String with the response.
   * @memberof Pocket
   */
  async sendRelay(relay, callback) {
    try {
      // Check for relay
      if (relay == null || relay.data == null) {
        if (callback) {
          callback(new Error("Relay is null or data field is missing"));
          return;
        } else {
          return new Error("Relay is null or data field is missing");
        }
      }
      // Verify all relay properties are set
      if (!relay.isValid()) {
        if (callback) {
          callback(new Error("Relay is missing a property, please verify all properties."));
          return;
        } else {
          return new Error("Relay is missing a property, please verify all properties.");
        }
      }

      // Filter nodes for specified blockchain
      var node = await this.getNode(relay.netID,
        relay.blockchain);

      if (node == null) {
        if (callback) {
          callback(new Error("Node is empty."));
          return;
        } else {
          return new Error("Node is empty.");
        }
      }

      // Send relay
      var response = await node.sendRelay(relay);
      // Response
      if (response instanceof Error == false) {
        if (callback) {
          callback(null, response);
          return;
        } else {
          return response;
        }
      } else {
        if (callback) {
          callback(response);
          return;
        } else {
          return response;
        }
      }

    } catch (error) {
      if (callback) {
        callback(new Error("Failed to send relay with error: " + error));
        return;
      } else {
        return new Error("Failed to send relay with error: " + error);
      }
    }

  }
  /**
   *
   * Retrieve a list of service nodes from the Node Dispatcher
   * @param {callback} callback
   * @returns {Node} - A list of Nodes.
   * @memberof Pocket
   */
  async retrieveNodes(callback) {
    try {
      var dispatch = this.getDispatch();
      var nodes = await dispatch.retrieveServiceNodes();
      
      if (nodes instanceof Error == false && nodes.length != 0) {
        // Save the nodes to the configuration.
        this.configuration.nodes = nodes;
        // Return a list of nodes
        if (callback) {
          callback(null, nodes);
          return;
        } else {
          return nodes;
        }
      } else {
        // Returns an Error;
        if (callback) {
          callback(new Error("Failed to retrieve a list of nodes."), null);
          return;
        } else {
          return new Error("Failed to retrieve a list of nodes.");
        }
      }

    } catch (error) {
      if (callback) {
        callback(new Error("Failed to retrieve a list of nodes with error: "+error), null);
        return;
      } else {
        return new Error("Failed to retrieve a list of nodes with error: "+error);
      }
    }
  }

}

module.exports = Pocket;