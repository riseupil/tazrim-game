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

export default {
  default: {
    cards: [
      _createFoodCard('קניות בסופר', 300, 0, 10,),
      _createBillCard('תשלום אינטרנט', 100, -1, -5, 6, 7,),
      _createUnexpectedCard('החלפת נורה שנשרפה', 15, -1, -5,),
      _createUnexpectedCard('סתימה בשן', 100, -5, -5,),
      _createUnexpectedCard('תיקון לאוטו', 700, -5, -5,),
      _createUnexpectedCard('דליפה בצנרת', 500, -5, -5,),
      _createUnexpectedCard('תיקון מזגן', 300, -5, -5,),
      _createUnexpectedCard('תיקון חלון שנשבר ממשחק ילדים', 100, -5, -5,),
      _createEatOutCard('ארוחת ערב עם ההורים במסעדה', 100, 3, 1,),
      _createEatOutCard('פיצה עם חבר', 30, 5, 1,),
      _createEatOutCard('מקדונלדס לבד', 40, 1, 1,),
      _createEatOutCard('פלאפל עם חבר מהעבודה', 20, 2, 1,),
      _createEatOutCard('דייט במסעדה', 50, 5, 1,),
      _createOpportunityCard('חדר בריחה עם חברים', 70, 6, -3,),
      _createOpportunityCard('ללכת לסרט בבית קולנוע', 40, 3, -1,),
      _createOpportunityCard('ללכת להופעת מוזיקה', 120, 5, -3,),
      _createOpportunityCard('בית קפה', 40, 2, -1,),
      _createOpportunityCard('לקנות ספר', 100, 3, -1,),
      _createOpportunityCard('לקנות בגדים בזארה', 200, 2, -2,),
      _createOpportunityCard('לקנות מנורת לבה', 100, 7, -1,),
      _createOpportunityCard('לבלות זמן עם חברים', 0, 4, -2,),
      _createOpportunityCard('לצאת לריצה', 0, 3, -4,),
      _createOpportunityCard('שיעור ביקראם יוגה', 60, 8, -8,),
      _createOpportunityCard('שיעור סלסה', 40, 2, -5,),
      _createOpportunityCard('הצגת תיאטרון', 90, 3, -1,),
      _createOpportunityCard('סיור גרפיטי', 80, 2, -3,)
    ],
    dayLength: 10,
  },
  a: {
    cards: [
      _createFoodCard('קניות בסופר', 300, 0, 10,),
      // _createBillCard('תשלום אינטרנט', 100, -1, -5, 6, 7,),
      // _createUnexpectedCard('החלפת נורה שנשרפה', 15, -1, -5,),
      // _createUnexpectedCard('סתימה בשן', 100, -5, -5,),
      // _createUnexpectedCard('תיקון לאוטו', 700, -5, -5,),
      // _createUnexpectedCard('דליפה בצנרת', 500, -5, -5,),
      // _createUnexpectedCard('תיקון מזגן', 300, -5, -5,),
      // _createUnexpectedCard('תיקון חלון שנשבר ממשחק ילדים', 100, -5, -5,),
      _createEatOutCard('ארוחת ערב עם ההורים במסעדה', 100, 3, 1,),
      _createEatOutCard('פיצה עם חבר', 30, 5, 1,),
      _createEatOutCard('מקדונלדס לבד', 40, 1, 1,),
      _createEatOutCard('פלאפל עם חבר מהעבודה', 20, 2, 1,),
      _createEatOutCard('דייט במסעדה', 50, 5, 1,),
      _createOpportunityCard('חדר בריחה עם חברים', 70, 6, -3,),
      _createOpportunityCard('ללכת לסרט בבית קולנוע', 40, 3, -1,),
      _createOpportunityCard('ללכת להופעת מוזיקה', 120, 5, -3,),
      _createOpportunityCard('בית קפה', 40, 2, -1,),
      _createOpportunityCard('לקנות ספר', 100, 3, -1,),
      _createOpportunityCard('לקנות בגדים בזארה', 200, 2, -2,),
      _createOpportunityCard('לקנות מנורת לבה', 100, 7, -1,),
      _createOpportunityCard('לבלות זמן עם חברים', 0, 4, -2,),
      _createOpportunityCard('לצאת לריצה', 0, 3, -4,),
      _createOpportunityCard('שיעור ביקראם יוגה', 60, 8, -8,),
      _createOpportunityCard('שיעור סלסה', 40, 2, -5,),
      _createOpportunityCard('הצגת תיאטרון', 90, 3, -1,),
      _createOpportunityCard('סיור גרפיטי', 80, 2, -3,)
    ],
    dayLength: 20,
  },
  b: {
    cards: [
      _createFoodCard('קניות בסופר', 300, 0, 10,),
      // _createBillCard('תשלום אינטרנט', 100, -1, -5, 6, 7,),
      // _createUnexpectedCard('החלפת נורה שנשרפה', 15, -1, -5,),
      // _createUnexpectedCard('סתימה בשן', 100, -5, -5,),
      // _createUnexpectedCard('תיקון לאוטו', 700, -5, -5,),
      // _createUnexpectedCard('דליפה בצנרת', 500, -5, -5,),
      // _createUnexpectedCard('תיקון מזגן', 300, -5, -5,),
      // _createUnexpectedCard('תיקון חלון שנשבר ממשחק ילדים', 100, -5, -5,),
      _createEatOutCard('ארוחת ערב עם ההורים במסעדה', 100, 3, 1,),
      _createEatOutCard('פיצה עם חבר', 30, 5, 1,),
      _createEatOutCard('מקדונלדס לבד', 40, 1, 1,),
      _createEatOutCard('פלאפל עם חבר מהעבודה', 20, 2, 1,),
      _createEatOutCard('דייט במסעדה', 50, 5, 1,),
      _createOpportunityCard('חדר בריחה עם חברים', 70, 6, -3,),
      _createOpportunityCard('ללכת לסרט בבית קולנוע', 40, 3, -1,),
      _createOpportunityCard('ללכת להופעת מוזיקה', 120, 5, -3,),
      _createOpportunityCard('בית קפה', 40, 2, -1,),
      _createOpportunityCard('לקנות ספר', 100, 3, -1,),
      _createOpportunityCard('לקנות בגדים בזארה', 200, 2, -2,),
      _createOpportunityCard('לקנות מנורת לבה', 100, 7, -1,),
      _createOpportunityCard('לבלות זמן עם חברים', 0, 4, -2,),
      _createOpportunityCard('לצאת לריצה', 0, 3, -4,),
      _createOpportunityCard('שיעור ביקראם יוגה', 60, 8, -8,),
      _createOpportunityCard('שיעור סלסה', 40, 2, -5,),
      _createOpportunityCard('הצגת תיאטרון', 90, 3, -1,),
      _createOpportunityCard('סיור גרפיטי', 80, 2, -3,)
    ],
    dayLength: 10,
  },

};
