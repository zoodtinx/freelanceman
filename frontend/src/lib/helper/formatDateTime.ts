import { format, toZonedTime } from 'date-fns-tz';

export function formatDate(
   isoString: string | undefined,
   format: 'SHORT' | 'LONG' = 'SHORT'
) {
   if (!isoString) {
      return '';
   }
   
   const date = new Date(isoString);
   
   const monthAbbreviations = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
   ];
   const fullMonthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ];

   const day = date.getDate();
   const year = date.getFullYear();
   const monthShort = monthAbbreviations[date.getMonth()];
   const monthLong = fullMonthNames[date.getMonth()];

   if (format === 'SHORT') {
      return `${monthShort} ${day}`;
   } else {
      return `${monthLong} ${day}, ${year}`;
   }
}

export function formatTime(isoString: string): string | null {
   if (!isoString) {
      return null;
   }

   const hasTime = isoString.includes('T');

   if (!hasTime) {
      return '';
   }

   const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const zonedDate = toZonedTime(isoString, systemTimeZone);
   return format(zonedDate, 'h:mm a', { timeZone: systemTimeZone });
}
