<template>
  <div class="timer">
    {{ current }}
  </div>
</template>

<script>

export default {
  name: 'Timer',
  props: [
    'callback',
    'cycle',
  ],
  data() {
    return {
      current: 0,
    };
  },
  async created() {
    this.current = this.cycle;
    setInterval(() => {
      if (this.current === 0) {
        this.current = this.cycle;
        this.callback();
      } else {
        this.current -= 1;
      }
    }, 1000);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
