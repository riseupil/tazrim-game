<template>
  <div class="card" v-bind:class="card.card.type">
    <div class="top-line spaced">
      <div class="cost">{{ card.card.cost }}</div>
      <div class="title">{{ card.card.description }}</div>
    </div>
    <div class="fun spaced">
      <span>Fun:</span>
      <strong>{{ card.card.buy.fun || card.card.expire.fun }}</strong>
    </div>
    <div class="energy spaced">
      <span>Energy:</span>
      <strong>{{ card.card.buy.energy || card.card.expire.energy }}</strong>
    </div>
    <button class="button" v-on:click="clickcb(card)" :disabled="card.used || card.card.cost > balance">Buy</button>
    <div class="turns-left">
      <div>Expires in:</div>
      <div>{{ card.turnsLeft }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: [
      'balance',
      'card',
      'clickcb'
    ],
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../riseup-colors.scss';
  .card {
    margin: 10px 20px;
    border-radius: 3px;
    box-shadow: 2px 2px 8px 0 $riseup_shadow_gray;
    padding: 10px 30px 30px 30px;
    width: 200px;
    border-style: solid;
    border-width: 8px;
    font-size: 20px;
    &.opportunity {
      border-color: $riseup_light_blue;
    }
    &.bill {
      border-color: $riseup_shadow_gray;
    }
    &.unexpected {
      border-color: $riseup_light_red;
    }
    &.food {
      border-color: $riseup_mustard;
    }
    &.eatout {
      border-color: $riseup_light_green;
    }
    .top-line {
      .title {
        font-size: 24px;
        color: black;
        text-align: right;
      }
      .cost {
        font-weight: bold;
        text-decoration: underline;
        font-size: 30px;
      }
      margin-bottom: 30px;
    }
    .button {
      width: 100%;
      border-radius: 3px;
      border: none;
      background-color: $riseup_light_blue;
      color: $riseup_white;
      font-size: 20px;
      line-height: 60px;
      font-weight: bold;
      transition: opacity 1s;
      &:disabled {
        opacity: 0.5;
      }
    }
    .turns-left {
      display: flex;
      justify-content: space-between;
    }
  }
  .spaced {
    display: flex;
    justify-content: space-between;
  }
</style>
