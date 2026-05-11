export function getTimeOfDay(date: Date = new Date()): string {
    const hour = date.getHours();

    if (hour >= 5 && hour < 12) {
        return "Morning";
    } else if (hour >= 12 && hour < 17) {
        return "Afternoon";
    } else if (hour >= 17 && hour < 21) {
        return "Evening";
    } else {
        return "Night";
    }
}