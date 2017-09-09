import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';
import {
  Linking,
} from 'react-native';

class CalendarEvents {

  static saveToCalendarEvents = async (eventTitle, eventConfig) => {
    // Gets calendar authorization status.
    const authorizeStatus = await CalendarEvents.fetchAuthorizationStatus();

    if (authorizeStatus === 'authorized') {
      return CalendarEvents._saveToCalendarEvents(eventTitle, eventConfig);
    }
    const request = await CalendarEvents.requestPermission();

    if (request === 'authorized') {
      return CalendarEvents._saveToCalendarEvents(eventTitle, eventConfig);
    }
  }

  /*
   * Asks the OS for calendar authorization.
   * Authorization must be granted before accessing calendar events.
   */
  static requestPermission = async () => RNCalendarEvents.authorizeEventStore()

  /*
   * Fetch calendar authorization status from the OS.
   */
  static fetchAuthorizationStatus = async () => RNCalendarEvents.authorizationStatus()

  static showSavedEventInCalendarApp = async (eventStartTimestamp) => {
    const referenceDate = moment.utc([2001]); // Default reference date for iOS calendar app.
    const secondsSinceRefDate = eventStartTimestamp ?
      (eventStartTimestamp / 1000) - referenceDate.unix() :
      moment().unix() - referenceDate.unix();
    const url = `calshow:${secondsSinceRefDate}`;

    try {
      const isSupported = await Linking.canOpenURL(url);

      if (isSupported) {
        await Linking.openURL(url);
      }
    } catch (err) {
      console.log(`Something went wrong when showing schedule for a specific date in calendar app - ${err}`);
    }
  }

  static _saveToCalendarEvents = async (eventTitle, eventConfig) => {
    const calendars = await RNCalendarEvents.findCalendars();
    const writableCalendar = calendars.find((cal) => cal.allowsModifications);
    const config = Object.assign({}, { calendarId: writableCalendar.id }, eventConfig);

    return RNCalendarEvents.saveEvent(eventTitle, config);
  }

}

export default CalendarEvents;
