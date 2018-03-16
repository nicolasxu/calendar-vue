<template>
  <div class="calendar-day">
    <time-axis></time-axis>
    <div class="events-container">
      <event v-for="(event, index) in events" :event="event" :key="index" ></event>      
    </div>
    
  </div>
</template>

<script>
  import Event from './Event'
  import TimeAxis from './TimeAxis'
  import {layOutDay, getEvents} from '../util/service.js'
  export default {
    name: 'calendarDay',
    created () {
      // this.events = [
      //   {start: 60, end: 120},  // an event from 10am to 11am 
      //   {start: 100, end: 240}, // an event from 10:40am to 1pm 
      //   {start: 700, end: 720}  // an event from 8:40pm to 9pm 
      // ]
      // this.events = layOutDay(this.events)
      let thisComponent = this
      getEvents()
        .then((events) => {
          thisComponent.events = layOutDay(events)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    data() {
      return {
        events: []
      }
    },
    components: {Event, TimeAxis}
  }
</script>


<style lang="sass" scoped>
  .calendar-day {
    // position: relative; 
    background-color: #ECECEC;
    width: 600px;
    margin-left: 100px;
    border-left: 1px solid #D7D7D7;
    
    box-sizing: content-box;
    padding-left: 10px;
    padding-right: 10px;
    .events-container {
      width: 100%;
      position:relative;
      height: 720px;
    }

  }
</style>