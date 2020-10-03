const axios = require('axios');
const constants = require("../utils/constants.js");
const httpsRequestProtocol = "https://";
const httpRequestProtocol = "http://";
// Dispatch
/**
 *
 *
 * @class Node
 */
class Node {
    /**
     * Creates an instance of Node.
     * @param {String} network - Network name.
     * @param {String} netID - Network Identifier.
     * @param {String} ipPort - Ip and port string ("10.0.0.1:80")
     * @memberof Node
     */
    constructor(network, netID, ipPort) {
        this.network = network;
        this.netID = netID;
        var ipPortArr = ipPort.split(":");
        this.ip = ipPortArr[0];
        this.port = ipPortArr[1];
        if (ipPort.includes(httpsRequestProtocol) || ipPort.includes(httpRequestProtocol)) {
            this.ipPort = ipPort;
        } else {
            if (this.port === "443" || this.port === 443) {
                this.ipPort = httpsRequestProtocol + ipPort;
            } else {
                this.ipPort = httpRequestProtocol + ipPort;
            }
        }
    }

    /**
     *
     * Verify if all properties are valid
     * @returns {boolean} - True or false.
     * @memberof Node
     */
    isValid() {
        for (var property in this) {
            if (!this.hasOwnProperty(property) || this[property] == "") {
                return false;
            }
        }
        return true;
    }

    /**
     *
     * Checks if params are equal to stored properties
     * @param {String} netID - Network Identifier.
     * @param {String} network - Network name.
     * @returns {boolean} - True or false.
     * @memberof Node
     */
    isEqual(netID, network) {
        if (this.netID == netID.toString() && this.network == network.toString()) {
            return true;
        }
        return false;
    }

    /**
     *
     * Sends a relay to a service node
     * @param {Relay} relay - Relay object with the information.
     * @param {callback} callback - callback handler.
     * @returns {Object} - Object with the response.
     * @memberof Node
     */
    async sendRelay(relay, callback) {
        try {
            const axiosInstance = axios.create({
                baseURL: this.ipPort,
                timeout: relay.configuration.requestTimeOut,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            var response = await axiosInstance.post(constants.relayPath,
                relay.toJSON()
            );

            if (response.status == 200 && response.data != null) {
                var result = response.data;

                if (callback) {
                    callback(result, null);
                    return;
                } else {
                    return result;
                }
            } else {
                if (callback) {
                    callback(null, new Error("Failed to send relay with error: " + response.data));
                    return;
                } else {
                    return new Error("Failed to send relay with error: " + response.data);
                }
            }
        } catch (error) {
            if (callback) {
                callback(null, new Error("Failed to send relay with error: " + error));
                return;
            } else {
                return new Error("Failed to send relay with error: " + error);
            }
        }
    }
}

module.exports = {
    Node
}