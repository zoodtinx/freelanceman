export const getRelativeDate = (daysToAdd: number, includeTime: boolean = false): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);

    if (includeTime) {
        const randomHour = Math.floor(Math.random() * (17 - 9 + 1)) + 9; // Random hour between 9 AM and 5 PM
        const randomMinute = Math.floor(Math.random() * 60); // Random minute
        const randomSecond = Math.floor(Math.random() * 60); // Random second for more variation
        date.setHours(randomHour, randomMinute, randomSecond, 0);
    } else {
        date.setHours(0, 0, 0, 0); // Set to start of day for non-time specific tasks
    }
    return date.toISOString();
};
