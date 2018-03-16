import API from './api.js'

export const layOutDay = layOutDayFunc
export {getEvents}

/**
* Lays out events for a single day
*
* @param array  events   An array of event objects. Each event object consists of a start and end
*                        time  (measured in minutes) from 9am, as well as a unique id. The
*                        start and end time of each event will be [0, 720]. The start time will 
*                        be less than the end time.
*
* @return array  An array of event objects that has the width, the left and top positions set, in addition to the id,
*                start and end time. The object should be laid out so that there are no overlapping
*                events.
*
* function layOutDay(events) {...}
*/ 

function layOutDayFunc(events = []) {

  events = sortEvent(events)
  let columns = []
  events.forEach(function(event, index) {
    
    let eventInserted = false
    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
  
      let length = columns[columnIndex].length
      let lastEvent = columns[columnIndex][length -1]
     
      if(!isEventColide(lastEvent, event)) {
      
        columns[columnIndex].push(event)
        eventInserted = true
        break;
      } else {
      }
    }
    if(!eventInserted) {
      // 1. create new column with this event
      columns.push([event])
    }
  })
  // console.log(columns)
  setLeft(columns)
  setTop(events)
  setWidthAndLeft(columns)
  return events
}

function sortEvent(events = []) {
  events.sort(function(eventA, eventB) {
    // sort by start time, and then by end time
    eventA.start = parseInt(eventA.start)
    eventA.end = parseInt(eventA.end)
    eventB.start = parseInt(eventB.start)
    eventB.end = parseInt(eventB.end)

    if(eventA.start < eventB.start) {
      return -1
    }
    if(eventA.start > eventB.start) {
      return 1
    }

    if(eventA.end < eventB.end) {
      return -1
    }
    if(eventA.end > eventB.end) {
      return 1
    }

    return 0
  })
  return events
}

function isEventColide(a, b) {
  if(b.start>=a.start && b.start <a.end) {
    return true
  }
  if(b.end > a.start && b.end<=a.end) {
    return true
  }
  return false
}

function setLeft(columns = []) {
  if (columns.length === 0) {
    return
  }
  let totalColumnCount = columns.length

  // 1. 1st column event will alway have left = 0
  for (let i = 0; i < columns.length; i++) {
    columns[i].forEach((event)=> {
      event.left = ((100 / totalColumnCount) * i)
    })
  }
}

function setTop(events = []) {
  if(events.length === 0) {
    return events
  }
  
  events.forEach((event) => {
    event.top = event.start
    event.height = event.end - event.top 

  } )

  return events
}

function setWidthAndLeft(columns = []) {
  let totalWidth = 600
  let totalColumnCount = columns.length
  for(let columnIndex = columns.length -1; columnIndex>=0; columnIndex--) {

    columns[columnIndex].forEach((event)=> {
      // event in current column, 
      // collision test with all events on next column
      let clidingEvent = getClidingEventOnNextColumn(event, (columnIndex + 1 === totalColumnCount)? []: columns[columnIndex + 1] )
      if(clidingEvent) {
        // use left and width of the event that this event cliding with
        event.width = clidingEvent.width
        event.left = clidingEvent.left - event.width
      } else {
        // not clide
        // No. of column for this event row should be current index + 1
        // then you can calculate left and width
        event.width = totalWidth / (columnIndex + 1)
        event.left = totalWidth - event.width
      }     
      
    })

    // if not cliding with event on the right (previous index)
    //   then the width would be thisIndex + 1
  }
}

function getClidingEventOnNextColumn(event, column = []) {

  for(let i = 0; i < column.length; i++) {
    if (isEventColide(event, column[i])) {
      return column[i]
    }
  }

  return false
}

function getEvents () {
  return API.getEvents()
    .then(function(data){
      let events = []
      for (let key in data) {
        events.push({hash: key, start: data[key].start, end: data[key].end})
      }
      return events
    }, function (err) {

      throw new Error('API request error')
    })
}