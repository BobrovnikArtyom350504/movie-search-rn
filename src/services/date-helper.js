export default class DateHelper {
  static formatDate(date, format) {
    switch(format) {
      case 'yyyymmdd':
        return date.toISOString().slice(0,10);
      default:
        return date;
    }
  }

  static getFirstDayOfTheYear(year) {
    return new Date(year, 0, 1);
  }
}