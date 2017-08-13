import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';
import {
  Linking,
} from 'react-native';

class CalendarEvents {

  static saveToCalendarEvents = async (event) => {
    // Gets calendar authorization status.
    const authorizeStatus = await CalendarEvents.fetchAuthorizationStatus();

    if (authorizeStatus === 'authorized') {
      return CalendarEvents._saveToCalendarEvents(event);
    }
    const request = await CalendarEvents.requestPermission();

    if (request === 'authorized') {
      return CalendarEvents._saveToCalendarEvents(event);
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

  static showSavedEventWithCalendarApp(eventStartTimestamp) {
    const referenceDate = moment.utc([2001]); // Default reference date for iOS calendar app.
    const secondsSinceRefDate = eventStartTimestamp ?
    (eventStartTimestamp / 1000) - referenceDate.unix() :
    (moment().unix() / 1000) - referenceDate.unix();

    Linking.openURL(`calshow:${secondsSinceRefDate}`);
  }

  static _saveToCalendarEvents = async (event) => {
    const calendars = await RNCalendarEvents.findCalendars();
    const writableCalendar = calendars.find((cal) => cal.allowsModifications);
    const config = {
      calendarId: writableCalendar.id,
      location: event.where && event.where.address,
      startDate: (event.when && event.when.startTimestamp) ? new Date(event.when.startTimestamp) : null,
      endDate: (event.when && event.when.endTimestamp) ? new Date(event.when.endTimestamp) : null,
      alarms: [{ date: -60 * 24 }], // 24 hours.
      description: event.description,
      notes: event.description,
    };

    try {
      const savedEvent = await RNCalendarEvents.saveEvent(event.name, config);

      if (savedEvent) {
        CalendarEvents.showSavedEventWithCalendarApp(event.when && event.when.startTimestamp);
      }
    } catch (err) {
      console.log(err);
    }
  }

}

export default CalendarEvents;
