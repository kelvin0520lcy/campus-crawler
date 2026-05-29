const getTodayName = () => {
    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ]

    return days[new Date().getDay()];
}

const timeToMinutes = (time => {
    const [hour, minutes] = time.split(':').map(Number);
    return hour * 60 + minutes;
})

export const isOpenNow = (location) => {
    const today = getTodayName();

    const todayHours = location.openingHours?.[today][0];

    if (!todayHours || todayHours.length === 0) {
        return false;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return currentMinutes >= timeToMinutes(todayHours.open) &&
        currentMinutes <= timeToMinutes(todayHours.close)

}