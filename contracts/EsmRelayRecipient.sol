pragma solidity ^0.5.0;

import "tabookey-gasless/contracts/GsnUtils.sol";
import "tabookey-gasless/contracts/IRelayHub.sol";
import "tabookey-gasless/contracts/RelayRecipient.sol";

contract EsmRelayRecipient is RelayRecipient {
  constructor(IRelayHub _rhub) public {
      setRelayHub(_rhub);
  }
 
  function acceptRelayedCall
    (address relay, address from, bytes calldata encodedFunction, uint256 transactionFee, uint256 gasPrice, uint256 gasLimit, uint256 nonce, bytes calldata approvalData, uint256 maxPossibleCharge) external view returns (uint256, bytes memory) {
        return (0, "");
  }

  function preRelayedCall(bytes calldata context) /*relayHubOnly*/ external returns (bytes32) {
    return bytes32(uint(123456));
  }

  function postRelayedCall(bytes calldata context, bool success, uint actualCharge, bytes32 preRetVal) /*relayHubOnly*/ external {
  }
}