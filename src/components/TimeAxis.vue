<template>
  <div class="time-axis">
    <tick v-for="(tick, index) in ticks" :time="tick" :key="index"></tick>
  </div>
</template>

<script>
  import Tick from './Tick'
  export default {
    name: 'timeAxis', 
    data () {
      return {
        ticks: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
      }
    },
    computed: {
  
    },
    components: {Tick}
  }
</script>

<style lang="sass" scoped>
  .time-axis {
    height: 720px; 
    position: absolute;
    overflow: hidden;
    
    transform: translate(-160%, -4px);

  }
</style>