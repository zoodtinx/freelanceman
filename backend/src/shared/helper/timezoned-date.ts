import { DateTime } from 'luxon';

export function getTimezonedDate() {
    return DateTime.now()
        .setZone('Asia/Bangkok')
        .startOf('day')
        .toUTC()
        .toJSDate();
}

export function getTimezonedDateFromISOString(isoString: string) {
    return DateTime.fromISO(isoString, { zone: 'Asia/Bangkok' })
        .startOf('day')
        .toFormat('MMMM dd, yyyy');
}
