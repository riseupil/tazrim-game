function _createEatOutCard(desc, cost, fun, energy) {
  return {
    type: 'eatout',
    description: desc,
    cost,
    buy: {
      fun,
      energy,
    },
    expire: {
      fun: 0,
      energy: 0,
    },
    expiration: 5,
  };
}

function _createBillCard(desc, cost, fun, energy, offset, cycle) {
  return {
    type: 'bill',
    description: desc,
    cost,
    buy: {
      fun: 0,
      energy: 0,
    },
    expire: {
      fun,
      energy,
    },
    expiration: 5,
    offset,
    cycle,
  };
}

function _createUnexpectedCard(desc, cost, fun, energy) {
  return {
    type: 'unexpected',
    description: desc,
    cost,
    buy: {
      fun: 0,
      energy: 0,
    },
    expire: {
      fun,
      energy,
    },
    expiration: 5,
  };
}

function _createOpportunityCard(desc, cost, fun, energy) {
  return {
    type: 'opportunity',
    description: desc,
    cost,
    buy: {
      fun,
      energy,
    },
    expire: {
      fun: 0,
      energy: 0,
    },
    expiration: 5,
  };
}

function _createFoodCard(desc, cost, fun, energy) {
  return {
    type: 'food',
    description: desc,
    cost,
    buy: {
      fun,
      energy,
    },
    expire: {
      fun: 0,
      energy: 0,
    },
    expiration: 1,
  };
}

export default [
  _createEatOutCard('פיצה עם חברים', 30, 2, 1),
  _createEatOutCard('פיצה עם חברים2', 50, 2, 1),
  _createEatOutCard('פיצה עם חברים3', 80, 2, 1),
  _createBillCard('חשבון חשמל', 800, -5, -5, 3, 7),
  _createUnexpectedCard('חור בשן', 100, -5, 0),
  _createUnexpectedCard('חור בשן2', 50, -5, 0),
  _createOpportunityCard('סרט1', 50, 2, 0),
  _createOpportunityCard('סרט2', 100, 2, 0),
  _createOpportunityCard('סרט3', 150, 2, 0),
  _createFoodCard('סופר', 180, 0, 10),
];
