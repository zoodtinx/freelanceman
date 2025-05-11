import { DateTime } from 'luxon';

export function getTimezonedDate() {
    return DateTime.now()
        .setZone('Asia/Bangkok')
        .startOf('day')
        .toUTC()
        .toJSDate();
}