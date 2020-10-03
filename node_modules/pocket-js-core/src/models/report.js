const axios = require('axios');
const constants = require("../utils/constants.js");

// Report
/**
 *
 *
 * @class Report
 */
class Report {
	/**
   * Creates an instance of Report.
   * @param {String} ip - Internet protocol address of the node.
   * @param {String} message - Message describing the report.
   * @param {Configuration} configuration - Configuration object.
   * @memberof Report
   */
  constructor(ip, message, configuration) {
		this.ip = ip;
        this.message = message;
        this.configuration = configuration;
    }
    /**
     *
	   * Parse properties to a JSON Object.
	   * @returns {JSON} - A JSON Object.
     * @memberof Report
     */
    toJSON(){
      return {
        "IP": this.ip,
        "Message": this.message
      }
    }
    /**
     *
	   * Verifies if the Report is valid
	   * @returns {boolean} - True or false
     * @memberof Report
     */
    isValid(){
      for (var property in this) {
        if (!this.hasOwnProperty(property) || this[property] == "") {
          return false;
        }
      }
      return true;
    }
    /**
     *
     * Sends a report to the dispatcher.
     * @param {callback} callback
     * @returns {String} - An string with the result.
     * @memberof Report
     */
    async send(callback){
        const axiosInstance = axios.create({
            baseURL: constants.dispatchNodeURL,
            timeout: this.configuration.requestTimeOut,
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          var response = await axiosInstance.post(constants.reportPath,
            this.toJSON()
          );
    
          if (response.status == 200 && response.data != null) {
            if (callback) {
              callback(null, response.data);
              return;
            }
            return response.data;
          } else {
            if (callback) {
              callback(new Error("Failed to send report with error: " + response.data));
              return;
            }
            return new Error("Failed to send report with error: " + response.data);
          }
    }
}

module.exports = {
	Report
}