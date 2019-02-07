<template>
  <div class="container">
    <div class="score-board">
      <div class="day">Day: {{ day }}</div>
      <div class="balance">{{ balance }}</div>
      <div class="energy">Energy: {{ energy }}</div>
      <div class="fun">Fun: {{ fun }}</div>
    </div>
    <div class="open-cards">
      <card v-for="card in sortedCards" v-bind:key="card.id" :card="card" :clickcb="useCard"></card>
    </div>
    <button v-on:click="finishDay">Finish Day</button>
  </div>
</template>

<script>

import _ from 'lodash';

import Card from './Card.vue';
import cards from '../cards';

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
      openCardCounter: 0,
    };
  },
  components: {
    Card,
  },
  computed: {
    sortedCards() {
      const sortedCards = _.sortBy(this.openCards, openCard => openCard.id);
      const supermarket = _.remove(sortedCards, openCard => openCard.card.type === 'food');
      return [...supermarket, ...sortedCards];
    },
  },
  methods: {
    useCard(openCard) {
      openCard.used = true;
      this.balance -= openCard.card.cost;
      this.fun += openCard.card.buy.fun;
      this.energy += openCard.card.buy.energy;
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
        .filter(c => c.turnsLeft === 0)
        .reject(c => c.used)
        .map(c => c.card)
        .forEach(c => {
          this.fun += c.expire.fun;
          this.energy += c.expire.energy;
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
      this.openCardCounter += 1;
      this.openCards.push({
        used: false,
        id: this.openCardCounter,
        turnsLeft: card.expiration,
        card,
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../riseup-colors.scss';
  .container {
    display: flex;
    flex-wrap: wrap;
    .score-board {
      flex: 1 25%;
      margin: 10px 20px;
      border-radius: 3px;
      box-shadow: 2px 2px 8px 0 $riseup_shadow_gray;
      padding: 10px 0 30px;
      width: 320px;
      .balance {
        color: $riseup_mustard;
        font-size: 30px;
      }
    }
    .open-cards {
      flex: 1 70%;
      display: flex;
      flex-wrap: wrap;
    }
    button {
      flex: 1 100%;
    }
  }
</style>
