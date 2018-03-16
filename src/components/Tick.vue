<template>
  <div class="tick">
    
    <div class="primary">{{ primaryTime }} <span class="note">{{ampm}}</span></div>
    <div class="secondary note">{{secondaryTime}}</div>
  </div>
</template>

<script>
  export default {
    name: 'tick',
    props: ['time'],
    computed: {
      primaryTime() {
        return this.time / 12 > 1? ( this.time % 12) + ":00" : this.time + ":00"
      },
      secondaryTime() {
        return this.time / 12 > 1? ( this.time % 12) + ":30" : this.time + ":30"
      },
      ampm() {
        return this.time / 12 > 1? "PM": "AM"
      }
    }
  }
</script>

<style lang="sass" scoped>
  $primary-color: #686868;
  $secondary-color: #A7A7A7;
  .tick {
    height: 59px;
    box-sizing: border-box;
    text-align: right;
    .primary, .secondary {
      height: 30px;
    }
    .primary {
      color: $primary-color;
      font-size: 13px;
      font-weight: bold;
    }

    .secondary {
      color: $secondary-color;
    }

  
    .note {
      font-size: 10px;
      color: $secondary-color;
    }
  }
</style>