<template>
  <div>hello</div>
</template>

<script>
const cards = [
  {
    type: 'opportunity',
    description: 'פיצה עם חברים',
    cost: 30,
    fun: 2,
    energy: 1,
    expiration: 5,
  },
  {
    type: 'bill',
    description: 'תשלום חשמל',
    cost: 800,
    fun: -5,
    energy: -5,
    offset: 3,
    cycle: 7,
    expiration: 5,
  },
  {
    type: 'unexpected',
    description: 'חור בשן',
    cost: 100,
    fun: -5,
    energy: 0,
    expiration: 5,
  },
];

export default {
  name: 'HelloWorld',
  data() {
    return {
      balance: 0,
      fun: 0,
      energy: 10,
      day: 0,
    };
  },
  computed: {

  },
  method: {
    finishDay() {
      this.day += 1;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
