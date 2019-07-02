var EsmToken = artifacts.require("./EsmToken.sol");
const FIVE_BILLION = 5000000000;
const TWENTY_FIVE_K = 25000;
const ONE_HUNDRED = 100;
const TOKEN_NAME = "Esemble Token";
const TOKEN_SYM = "Esm";

contract("EsmToken", async accounts => {
  const FROM_ACCT = accounts[0];
  const TO_ACCT = accounts[1];

  it("allocates the total supply", async () => {
    const token = await EsmToken.deployed();
    const totalSupply = await token.totalSupply();

    assert.equal(
      totalSupply.toNumber(),
      FIVE_BILLION,
      "sets total supply to 5B"
    );
    //console.log("account[0]", accounts[0]);
    const adminAccountBalance = await token.balanceOf(accounts[0]);
    assert.equal(
      adminAccountBalance,
      FIVE_BILLION,
      "initial supply is sent to admin account"
    );
  });

  it("initialize contract with correct info values", async () => {
    const token = await EsmToken.deployed();
    const name = await token.name();
    const symbol = await token.symbol();
    assert.equal(name, TOKEN_NAME);
    assert.equal(symbol, TOKEN_SYM);
  });

  it("transfers tokens", async () => {
    const token = await EsmToken.deployed();
    try {
      await token.transfer.call(accounts[1], 999999999);
    } catch (error) {
      assertError(error, "Value is higher than amount in balance");
    }
    const tx = await token.transfer(accounts[1], TWENTY_FIVE_K, {
      from: accounts[0]
    });
    assertEvent(
      tx.receipt,
      "Transfer",
      1,
      accounts[0],
      accounts[1],
      TWENTY_FIVE_K
    );

    const newBalance = await token.balanceOf(accounts[1]);
    assert.equal(newBalance, TWENTY_FIVE_K, "expected new balance");
    const oldAdjustedBalance = await token.balanceOf(accounts[0]);
    assert.equal(
      oldAdjustedBalance,
      FIVE_BILLION - TWENTY_FIVE_K,
      "sender balance expected to be adjusted"
    );
    const retVal = await token.transfer.call(accounts[0], 10);
    assert.equal(
      retVal,
      true,
      "expect transfer to return true on a successful transfer"
    );
  });

  it("approve function", async () => {
    const token = await EsmToken.deployed();
    const retVal = await token.approve.call(accounts[1], ONE_HUNDRED);
    assert.equal(true, retVal, "expecting this approval to return true");
    const tx = await token.approve(accounts[1], ONE_HUNDRED, {
      from: accounts[0]
    });
    assertEvent(
      tx.receipt,
      "Approval",
      1,
      accounts[0],
      accounts[1],
      ONE_HUNDRED
    );
    const allowance = await token.allowance(accounts[0], accounts[1]);
    //console.log("allowance:", allowance.toNumber());
    assert.equal(
      allowance.toNumber(),
      ONE_HUNDRED,
      "stored allowance for delegated transfer"
    );
  });

  it("delegated token transfers", async () => {
    const token = await PikoToken.deployed();
    const ADMIN = accounts[0];
    const FROM = accounts[2];
    const TO = accounts[3];
    const SPENDING = accounts[4];

    await token.transfer(FROM, 100, { from: ADMIN }); //give some tokens for test
    await token.approve(SPENDING, 10, { from: FROM });

    try {
      await token.transferFrom(FROM, TO, 101, { from: SPENDING });
    } catch (error) {
      assertError(
        error,
        "Expecting this to throw an error because balance is not high enough"
      );
    }

    try {
      await token.transferFrom(FROM, TO, 20, { from: SPENDING }); //larger than approved
    } catch (error) {
      assertError(
        error,
        "Expecting this to throw an error because this value is higher than the approved amount"
      );
    }

    const retVal = await token.transferFrom.call(FROM, TO, 10, { from: SPENDING });
    assert.equal(true, retVal, "expecting return value with valid params to return true");
  
    const tx = await token.transferFrom(FROM, TO, 10, {from: SPENDING});
    assertEvent(tx.receipt, 'Transfer', 2, FROM, TO, 10);

    const balance = await token.balanceOf(FROM);
    assert.equal(balance.toNumber(), 90, "Expecting the from address to now be 90 (after transfer)");
    const balanceTo = await token.balanceOf(TO);
    assert.equal(balanceTo.toNumber(), 10, "Expecting this account to now have 10 (after transfer)");
  
    const currentAllowance = await token.allowance(FROM, SPENDING);
    assert.equal(currentAllowance.toNumber(), 0, "Expecting allowing after transfer to be 0");
  });
});

function assertError(error, msg) {
  assert(error.toString().indexOf("revert") > 0, msg);
}

function assertEvent(receipt, eventName, numberOfEvents, from, to, value) {
  //console.log("receipt val", receipt.logs[0].args);
  assert.equal(receipt.logs[0].event, eventName, "Expecting transfer event");
  assert.equal(receipt.logs.length, numberOfEvents, "Expecting one event");

  if (receipt.logs[0].args.from === undefined) {
    assert.equal(
      receipt.logs[0].args.owner,
      from,
      "expecting a different owner account"
    );
  } else {
    assert.equal(
      receipt.logs[0].args.from,
      from,
      "expecting a different 'from' account"
    );
  }

  if (receipt.logs[0].args.to === undefined) {
    assert.equal(
      receipt.logs[0].args.spender,
      to,
      "expecting a different spender account"
    );
  } else {
    assert.equal(
      receipt.logs[0].args.to,
      to,
      "expecting a different 'to' account"
    );
  }

  assert.equal(
    receipt.logs[0].args.value,
    value,
    "expecting a different transfer amount"
  );
}
