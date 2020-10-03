// Relay
/**
 *
 *
 * @class Relay
 */
class Relay {
	/**
	 * Creates an instance of Relay.
	 * @param {Blockchain} blockchain - A blockchain object.
	 * @param {String} netID - Network identifier.
	 * @param {String} data - Data string.
	 * @param {Configuration} configuration - Configuration object.
	 * @memberof Relay
	 */
	constructor(blockchain, netID, data, configuration) {
		this.blockchain = blockchain;
		this.netID = netID;
		this.data = data;
		this.configuration = configuration;
	}

	/**
	 *
	 * Parse properties to a JSON Object.
	 * @returns {JSON} - A JSON Object.
	 * @memberof Relay
	 */
	toJSON(){
		return {
			"Blockchain": this.blockchain,
			"NetID": this.netID,
			"Data": this.data,
			"DevID": this.configuration.devID
		}
	}

	/**
	 *
	 * Verifies if the Relay is valid
	 * @returns {boolean} - True or false
	 * @memberof Relay
	 */
	isValid(){
		for (var property in this) {
			if (!this.hasOwnProperty(property) || this[property] == "") {
				return false;
			}
		}
		return true;
	}
}

module.exports = {
	Relay
}