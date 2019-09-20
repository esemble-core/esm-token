/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('truffle-hdwallet-provider');


//const infuraKey = "rinkeby.infura.io/v3/393be4249e1c41239b63a60c555f7bea";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

const mnemonic = "alcohol task often middle mobile security grape control acquire autumn tag another"

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },

     rinkeby: {
       provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/393be4249e1c41239b63a60c555f7bea`),
       network_id: 4,       // rinkeby's id
       gas: 5500000,        // used a little more gas (like robsten)
       confirmations: 2,    // # of confs to wait between deployments. (default: 0)
       timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
       skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     },

    // Another network with more advanced options...
    // advanced: {
      // port: 8777,             // Custom port
      // network_id: 1342,       // Custom network
      // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      // from: <address>,        // Account to send txs from (default: accounts[0])
      // websockets: true        // Enable EventEmitter interface for web3 (default: false)
    // },

    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
      // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
      // network_id: 3,       // Ropsten's id
      // gas: 5500000,        // Ropsten has a lower block limit than mainnet
      // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },

    // Useful for private networks
    // private: {
      // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
      // network_id: 2111,   // This network is yours, in the cloud.
      // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.5.5",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
      //  evmVersion: "byzantium"
      // }
    }
  }
}


/*
  Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x789146a092d6c2e1f041335583556c270872d4536b6f97db290cf42d42f641d0
   > Blocks: 0            Seconds: 8
   > contract address:    0x659DF6C546636C8A31c27a2f6A13845c36a10D9c
   > account:             0xf7d1314C521E022a3992F63233C45A1B4c84e9fd
   > balance:             0.18430184
   > gas used:            284908
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00569816 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 5125025)
   > confirmation number: 2 (block: 5125026)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00569816 ETH


1561064430_esm_token.js
=======================

   Deploying 'EsmToken'
   --------------------
   > transaction hash:    0x068b20bd84b92e2c05e9bdc7a533cb442df8abdb2315760805d37543d995c54d
   > Blocks: 1            Seconds: 12
   > contract address:    0x022D05679421e9bbAC4df003594aD9bBba9F6c07
   > account:             0xf7d1314C521E022a3992F63233C45A1B4c84e9fd
   > balance:             0.15640764
   > gas used:            1352676
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.02705352 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 5125028)
   > confirmation number: 2 (block: 5125029)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.02705352 ETH


1561064435_esm_relay_recipient.js
=================================

   Deploying 'EsmRelayRecipient'
   -----------------------------
   > transaction hash:    0x4b53bb5fbc9aacbdf1bf98df5e62cfc063705eb4a7dc484fc0a12d0b58f31ed3
   > Blocks: 1            Seconds: 12
   > contract address:    0xdaCD55CD2C51Ea6a8a0831857b988eC4067E8373
   > account:             0xf7d1314C521E022a3992F63233C45A1B4c84e9fd
   > balance:             0.13977856
   > gas used:            804228
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01608456 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 5125031)
   > confirmation number: 2 (block: 5125032)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.01608456 ETH


*/