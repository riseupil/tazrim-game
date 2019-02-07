<template>
  <div>
    <timer :callback="finishDay"></timer>
    <div class="container">
      <div class="score-board">
        <div class="day">Day: {{ day }}</div>
        <div class="balance">{{ balance }}</div>
        <div class="fun spaced">
          <span>Fun:</span>
          <span>{{ fun }}</span>
        </div>
        <div class="energy spaced" :class="{low: lowOnEnergy}">
          <span>Energy:</span>
          <span>{{ energy }}</span>
        </div>
      </div>
      <div class="open-cards">
        <card v-for="card in sortedCards" v-bind:key="card.id" :card="card" :balance="balance" :clickcb="useCard"></card>
      </div>
    </div>
    <button v-on:click="finishDay">Finish Day</button>
    <div class="score-history">
      <table>
        <tr>
          <th>day</th>
          <th v-for="(record, index) in scoreHistory" :key="index">{{ index }}</th>
        </tr>
        <tr>
          <td>energy</td>
          <td v-for="(record, index) in scoreHistory" :key="index">{{ record.energy }}</td>
        </tr>
        <tr>
          <td>fun</td>
          <td v-for="(record, index) in scoreHistory" :key="index">{{ record.fun }}</td>
        </tr>
        <tr>
          <td>rolling fun</td>
          <td v-for="(rolling, index) in rollingFun" :key="index">{{ rolling }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import _ from 'lodash';

import Card from './Card.vue';
import cards from '../cards';
import Timer from './Timer.vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
      balance: 0,
      fun: 1,
      energy: 11,
      day: 0,
      deck: cards,
      openCards: [],
      openCardCounter: 0,
      scoreHistory: [],
    };
  },
  components: {
    Card,
    Timer,
  },
  computed: {
    sortedCards() {
      const sortedCards = _.sortBy(this.openCards, openCard => openCard.id);
      const supermarket = _.remove(sortedCards, openCard => openCard.card.type === 'food');
      return [...supermarket, ...sortedCards];
    },
    lowOnEnergy() {
      return this.energy <= 3;
    },
    rollingFun() {
      return _.reduce(this.scoreHistory, (accumulator, value) => {
        const previousValue = accumulator[accumulator.length - 1] || 0;
        accumulator.push(previousValue + value.fun);
        return accumulator;
      }, [])
    }
  },
  methods: {
    useCard(openCard) {
      openCard.used = true;
      this.balance -= openCard.card.cost;

      // If low on energy, then you don't get to enjoy the card
      this._addToEnergy(openCard.card.buy.energy);
      if (!this.lowOnEnergy) {
        this._addToFun(openCard.card.buy.fun);
      }
    },
    finishDay() {
      // this.deck = _.shuffle(this.deck);
      _.forEach(this.openCards, c => {
        c.turnsLeft -= 1;
      });

      this._punishForExpiredBadCards();
      this.scoreHistory.push({ fun: this.fun, energy: this.energy });

      _.remove(this.openCards, c => c.turnsLeft === 0 || c.used);

      this._refreshFood();
      this._refreshEatOut();
      this._refreshOpportunity();
      this._refreshBills();
      this._refreshUnexpected();

      this._addToFun(-1);
      this._addToEnergy(-1);
      this.day += 1;

      if (this.day % 7 === 1) {
        this.balance += 600;
      }
      if (this.energy === 0) {
        this.fun = 0;
      }
    },
    _punishForExpiredBadCards() {
      _.chain(this.openCards)
        .filter(c => c.turnsLeft === 0)
        .reject(c => c.used)
        .map(c => c.card)
        .forEach(c => {
          this._addToFun(c.expire.fun)
          this._addToEnergy(c.expire.energy);
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
    _addToEnergy(value) {
      this.energy += value;
      this.energy = Math.max(0, Math.min(10, this.energy));
    },
    _addToFun(value) {
      this.fun += value;
      this.fun = Math.max(0, this.fun);
    }
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
      flex: 1 15%;
      margin: 10px 20px;
      border-radius: 3px;
      box-shadow: 2px 2px 8px 0 $riseup_shadow_gray;
      padding: 10px 10px 30px;
      width: 320px;
      font-size: 30px;
      font-weight: bold;
      .balance {
        font-size: 42px;
        text-decoration: underline;
      }
      .energy {
        &.low {
          color: red;
        }
      }
    }
    .open-cards {
      flex: 1 75%;
      display: flex;
      flex-wrap: wrap;
    }
    button {
      flex: 1 100%;
    }
    .spaced {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
