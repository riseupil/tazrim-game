<template>
  <div>
    <div class="score-board">
      <div class="balance">Balance: {{ balance }}</div>
      <div class="fun">Fun: {{ fun }}</div>
      <div class="energy">Energy: {{ energy }}</div>
      <div class="day">Day: {{ day }}</div>
    </div>
    <div class="open-cards">
      <div class="card" v-for="(card, index) in openCards" v-bind:key="index">
        <div class="title">Desc: {{ card.card.description }}</div>
        <div class="fun">Fun: {{ card.card.fun }}</div>
        <div class="energy">Energy: {{ card.card.energy }}</div>
        <div class="cost">Cost: {{ card.card.cost }}</div>
        <div class="turns-left">Expires in: {{ card.turnsLeft }}</div>
        <button v-on:click="useCard(card)" :disabled="card.used">Buy</button>
      </div>
    </div>
    <button v-on:click="finishDay">Finish Day</button>
  </div>
</template>

<script>

import _ from 'lodash';

const cards = [
  {
    type: 'eatout',
    description: 'פיצה עם חברים',
    cost: 30,
    fun: 2,
    energy: 1,
    expiration: 5,
  }, {
    type: 'eatout',
    description: 'פיצה2',
    cost: 50,
    fun: 2,
    energy: 1,
    expiration: 5,
  }, {
    type: 'eatout',
    description: 'פיצה3',
    cost: 80,
    fun: 2,
    energy: 1,
    expiration: 5,
  }, {
    type: 'bill',
    description: 'תשלום חשמל',
    cost: 800,
    fun: -5,
    energy: -5,
    offset: 3,
    cycle: 7,
    expiration: 5,
  }, {
    type: 'unexpected',
    description: 'חור בשן',
    cost: 100,
    fun: -5,
    energy: 0,
    expiration: 5,
  }, {
    type: 'unexpected',
    description: 'חור בשן2',
    cost: 50,
    fun: -5,
    energy: 0,
    expiration: 5,
  }, {
    type: 'food',
    description: 'סופר',
    cost: 180,
    fun: 0,
    energy: 10,
    expiration: 1,
  }, {
    type: 'opportunity',
    description: 'לראות סרט',
    cost: 50,
    fun: 2,
    energy: 0,
    expiration: 5,
  }, {
    type: 'opportunity',
    description: 'סרט2',
    cost: 100,
    fun: 2,
    energy: 0,
    expiration: 5,
  }, {
    type: 'opportunity',
    description: 'סרט3',
    cost: 150,
    fun: 2,
    energy: 0,
    expiration: 5,
  },
];

export default {
  name: 'HelloWorld',
  data() {
    return {
      balance: 1000,
      fun: 0,
      energy: 10,
      day: 0,
      deck: cards,
      openCards: [],
    };
  },
  computed: {

  },
  methods: {
    useCard(openCard) {
      openCard.used = true;
      this.balance -= openCard.card.cost;
      if (openCard.card.type !== 'bill' && openCard.card.type !== 'unexpected') {
        this.fun += openCard.card.fun;
        this.energy += openCard.card.energy;
      }
    },
    finishDay() {
      // this.deck = _.shuffle(this.deck);
      _.forEach(this.openCards, c => {
        c.turnsLeft -= 1;
      });

      this._punishForExpiredBadCards();

      _.remove(this.openCards, c => c.turnsLeft === 0 || c.used);

      this._refreshFood();
      this._refreshEatOut();
      this._refreshOpportunity();
      this._refreshBills();
      this._refreshUnexpected();

      this.fun -= 1;
      this.energy -= 1;
      this.day += 1;
    },
    _punishForExpiredBadCards() {
      _.chain(this.openCards)
        .filter(c => c.card.type === 'bill' || c.card.type === 'unexpected')
        .filter(c => c.turnsLeft === 0)
        .reject(c => c.used)
        .map(c => c.card)
        .forEach(c => {
          this.fun += c.fun;
          this.energy += c.energy;
        })
        .value();
    },
    _refreshFood() {
      const card = _.find(this.deck, c => c.type === 'food');
      this._createOpenCard(card);
    },
    _refreshEatOut() {
      if (!_.find(this.openCards, c => c.card.type === 'eatout')) {
        const card = this._drawCardByType('eatout');
        this._createOpenCard(card);
      }
    },
    _refreshOpportunity() {
      // TODO by some value function (maybe no more than 3 cards, not zero, with some random) we wiil
      // TODO pull another card
      const opportunityOpenCards = _.filter(this.openCards, c => c.card.type === 'opportunity');
      if (opportunityOpenCards.length < 3) {
        const card = this._drawCardByType('opportunity');
        this._createOpenCard(card);
      }
    },
    _refreshBills() {
      const billsToOpen = _.filter(this.deck, c => c.type === 'bill' && (c.offset === this.day % c.cycle));
      _.forEach(billsToOpen, c => this._createOpenCard(c));
    },
    _refreshUnexpected() {
      // TODO dont always open an unexpcted card, maybe by some randon number to give grace
      const unexpctedOpenCard = _.find(this.openCards, c => c.card.type === 'unexpected');
      if (!unexpctedOpenCard) {
        const card = this._drawCardByType('unexpected');
        this._createOpenCard(card);
      }
    },
    _drawCardByType(type) {
      const card = _.shuffle(_.filter(this.deck, c => c.type === type))[0];
      return card;
    },
    _createOpenCard(card) {
      this.openCards.push({
        used: false,
        turnsLeft: card.expiration,
        card,
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
