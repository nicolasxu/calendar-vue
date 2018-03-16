
import {getFn} from './request.js'

export default {getEvents}

function getEvents() {
  let url = "https://appcues-interviews.firebaseio.com/calendar/events.json"
  return getFn(url)
}