var EsmToken = artifacts.require("./EsmToken.sol");
const SUPPLY = 5000000000;

module.exports = function(deployer) {
  const name = "Esemble Token";
  const symbol = "ESM";
  const decimals = "1";
  deployer.deploy(EsmToken, name, symbol, decimals, SUPPLY);
};
