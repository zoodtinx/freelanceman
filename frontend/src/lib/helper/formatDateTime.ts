import { format, toZonedTime } from 'date-fns-tz';

export function formatDate(
   isoString: string | undefined,
   type: 'SHORT' | 'LONG' | 'FULL' = 'SHORT'
) {
   if (!isoString) {
      return '';
   }

   switch (type) {
      case 'SHORT':
         return format(new Date(isoString), 'MM d')         ;
      case 'LONG':
         return format(new Date(isoString), 'MMMM d')
      case 'FULL':
         return format(new Date(isoString), 'EEEE, d MMMM, yyyy')
      default:
         return '';
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
