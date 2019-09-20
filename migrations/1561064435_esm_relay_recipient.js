var EsmRelayRecipient = artifacts.require("./EsmRelayRecipient.sol");

//Rinkeby Relay
//0xD216153c06E857cD7f72665E0aF1d7D82172F494


//module.exports = function(deployer) {
//  deployer.deploy(Adoption, '0x537f27a04470242ff6b2c3ad247a05248d0d27ce'); // rinkeby gas relay hub
//};



module.exports = function(deployer) {
  deployer.deploy(EsmRelayRecipient, '0xD216153c06E857cD7f72665E0aF1d7D82172F494');
  //deployer.deploy(EsmRelayRecipientToken);
};
