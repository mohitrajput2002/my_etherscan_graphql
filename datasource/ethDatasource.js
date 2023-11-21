const { RESTDataSource } = require("apollo-datasource-rest"); // Import RESTDataSource from apollo-datasource-rest

//Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // Define constant eth_address

//Etherscan Data Source Class
class EtherDataSource extends RESTDataSource {
  // Extend RESTDataSource
  constructor() {
    super(); // Call super constructor
    this.baseURL = "https://api.etherscan.io/api"; // Set baseURL property
  }

  async etherBalanceByAddress() {
    // Method to get ether balance for an address
    return this.get(
      // Make GET request to etherscan API
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async totalSupplyOfEther() {
    // Method to get total ether supply
    return this.get(
      // Make GET request to etherscan API
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async getLatestEthereumPrice() {
    // Method to get latest ether price
    return this.get(
      // Make GET request to etherscan API
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async getBlockConfirmationTime() {
    // Method to get block confirmation time
    return this.get(
      // Make GET request to etherscan API
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

module.exports = EtherDataSource; // Export EtherDataSource class
