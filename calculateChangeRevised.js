const eqArrays = function(array1, array2) {
  if (array1.length !== array2.length) return false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
};

const eqObjects = function(object1, object2) {
  if (Object.keys(object1).length !== Object.keys(object2).length) {
    return false;
  }
  for (const key in object1) {
    if (Array.isArray(object1[key])) {
      if (eqArrays(object1[key], object2[key]) === false) {
        return false;
      }
    } else {
      if (object2[key] !== object1[key]) {
        return false;
      }
    }
  }
  return true;
};

const assertObjectsEqual = function(object1, object2) {
  const inspect = require('util').inspect;
  if (eqObjects(object1, object2) === true) {
    console.log(`✅ Assertion Passed: [${inspect(object1)}] === [${inspect(object2)}]`);
  } else {
    console.log(`🛑 Assertion Failed: [${inspect(object1)}] !== [${inspect(object2)}]`);
  }
};

let calculateChange = function(total, cash) {
  let change = cash - total;
  let whichCoins = {
    twentyDollar : 0,
    tenDollar : 0,
    fiveDollar : 0,
    twoDollar : 0,
    oneDollar : 0,
    quarter : 0,
    dime : 0,
    nickel : 0,
    penny : 0
  };

  let denominations = {
    twentyDollar : 2000,
    tenDollar : 1000,
    fiveDollar : 500,
    twoDollar : 200,
    oneDollar : 100,
    quarter : 25,
    dime : 10,
    nickel : 5,
    penny : 1
  };

  while (change > 0) {
    for (const key in denominations) {
      if (change >= denominations[key]) {
        whichCoins[key] += 1;
        change -= denominations[key];
        break;
      }
    }
  }

  for (const key in whichCoins) {
    if (whichCoins[key] === 0) {
      delete whichCoins[key];
    }
  }
  return whichCoins;
};

assertObjectsEqual(calculateChange(1787, 2000), { twoDollar: 1, dime: 1, penny: 3 });
assertObjectsEqual(calculateChange(2623, 4000), { tenDollar: 1, twoDollar: 1, oneDollar: 1, quarter: 3, penny: 2 });
assertObjectsEqual(calculateChange(501, 1000), { twoDollar: 2, quarter: 3, dime: 2, penny: 4 });