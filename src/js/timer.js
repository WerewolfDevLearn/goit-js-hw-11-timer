import timerMarkupTemplate from '../templates/timer-tamplet.hbs';
const timerMarkup = timerMarkupTemplate();

class CountdownTimer {
  constructor(obj) {
    this._selector = obj.selector;
    this._targetDate = obj.targetDate;
    this.markup = timerMarkup;
  }
  set selector(selector) {
    this._selector = selector;
  }
  set targetDate(futureDate) {
    this._targetDate = futureDate;
  }

  getTimeNow() {
    const timeNowMs = Date.now();
    return timeNowMs;
  }
  getFutureDateMs() {
    const futureDateMs = this._targetDate.getTime();
    return futureDateMs;
  }

  getTimeInteval() {
    const timeInterval = this.getFutureDateMs() - this.getTimeNow();
    return timeInterval;
  }

  getDayNumber(timeMs) {
    const days = Math.floor(timeMs / (1000 * 60 * 60 * 24));
    return days;
  }

  getHoursNumber(timeMs) {
    const hours = Math.floor((timeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return hours;
  }

  getMinsNumber(timeMs) {
    const mins = Math.floor((timeMs % (1000 * 60 * 60)) / (1000 * 60));
    return mins;
  }

  getSecsNumber(timeMs) {
    const secs = Math.floor((timeMs % (1000 * 60)) / 1000);
    return secs;
  }

  getTagRef() {
    const container = document.querySelector(`${this._selector}`);
    return container;
  }

  insertTimerMarkup(element) {
    element.insertAdjacentHTML('afterbegin', this.markup);
  }

  getDaysPositionRef() {
    const daysPositionRef = document.querySelector('span[data-value="days"]');
    return daysPositionRef;
  }

  getHoursPositionRef() {
    const hoursPositionRef = document.querySelector('span[data-value="hours"]');
    return hoursPositionRef;
  }

  getMinsPositionRef() {
    const minsPositionRef = document.querySelector('span[data-value="mins"]');
    return minsPositionRef;
  }

  getSecsPositionRef() {
    const secsPositionRef = document.querySelector('span[data-value="secs"]');
    return secsPositionRef;
  }
}

const countDown = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 17, 2020'),
});

const timerContainer = countDown.getTagRef();

countDown.insertTimerMarkup(timerContainer);

function timerInplement() {
  const interval = countDown.getTimeInteval();
  const days = countDown.getDayNumber(interval);
  const hours = countDown.getHoursNumber(interval);
  const mins = countDown.getMinsNumber(interval);
  const secs = countDown.getSecsNumber(interval);
  const dayRef = countDown.getDaysPositionRef();
  const hoursRef = countDown.getHoursPositionRef();
  const minsRef = countDown.getMinsPositionRef();
  const secsRef = countDown.getSecsPositionRef();
  dayRef.textContent = String(days).padStart(3, '0');
  hoursRef.textContent = String(hours).padStart(2, '0');
  minsRef.textContent = String(mins).padStart(2, '0');
  secsRef.textContent = String(secs).padStart(2, '0');
}
timerInplement();
const runTimer = setInterval(timerInplement, 1000);
