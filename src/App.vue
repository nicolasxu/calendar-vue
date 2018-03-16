<template>
  <div id="app">
    
    <calendar-day></calendar-day>

  </div>
</template>

<script>
import CalendarDay from './components/CalendarDay'

export default {
  name: 'app',
  created () {

  },
  components: {
    CalendarDay
  }
}
</script>

<style lang="sass" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;  
}
</style>
