const newYear = '1 Jan 2022';

const daysEle = document.getElementById('days');
const hoursEle = document.getElementById('hours');
const minutesEle = document.getElementById('minutes');
const secondsEle = document.getElementById('seconds');

var countdown = () => {
    const newYearDate = new Date(newYear);
    const currentDate = new Date();

    const totalSeconds = (newYearDate - currentDate) / 1000;
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEle.innerHTML = days;
    hoursEle.innerHTML = formatTime(hours);
    minutesEle.innerHTML = formatTime(minutes);
    secondsEle.innerHTML = formatTime(seconds);
};

var formatTime = (time) => {
    return time < 10 ? (`0${time}`) : time;
};

countdown();
setInterval(countdown, 1000);