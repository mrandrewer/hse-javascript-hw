class AlarmClock {

    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        if (!time || !callback) {
            throw new Error('Отсутствуют обязательные аргументы')
        }
        if (this.alarmCollection.find(a => a.time === time)) {
            console.warn('Уже присутствует звонок на это же время')
        }
        this.alarmCollection.push({
            time,
            callback,
            canCall: true
        });
    }

    removeClock(time) {
        if (!time) {
            throw new Error('Отсутствуют обязательные аргументы')
        }
        this.alarmCollection = this.alarmCollection.filter(a => a.time != time);
    }

    getCurrentFormattedTime() {
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    start() {
        if (this.intervalId) {
            return;
        }
        this.intervalId = setInterval(() => {
            const currentTime = this.getCurrentFormattedTime();
            this.alarmCollection
                .filter(a => a.time === currentTime && a.canCall)
                .forEach(a => {
                    a.canCall = false;
                    a.callback();
                });
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetAllCalls() {
        this.alarmCollection
            .filter(a => !a.canCall)
            .forEach(a => {
                a.canCall = true;
            });
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }

}