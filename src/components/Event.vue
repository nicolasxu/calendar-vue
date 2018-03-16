<template>
  <div class="event" :style="inlineStyle">
    <div class="title">Sample Item</div>
    <div class="location">Sample location</div>
  </div>
</template>

<script>
  export default {
    name: 'event',
    props: ['event'],
    data () {
      return {}
    },
    computed: {
      inlineStyle() {
        return ` top: ${this.event.top}px; height: ${this.event.height}px; left: ${this.event.left}px; width: ${this.event.width}px `
      }
    }
  }
</script>

<style lang="sass" scoped>
  $border-blue: #486CA7;
  $border-gray:  #D7D7D7;
  $location-text-color: #797979;
  .event {

    position: absolute;
    overflow: hidden;
    box-sizing: border-box;
    background-color: white;
    width: 20px;
    border: 1px solid $border-gray;
    border-left: 4px solid $border-blue;
    padding: 7px;

    .title {
      color: $border-blue;
      text-align: left;
      font-size: 13px;
      font-weight: bold;
    }
    .location {
      text-align: left;
      font-size: 10px;
      font-weight: bold;
      color: $location-text-color;
    }


  }
</style>