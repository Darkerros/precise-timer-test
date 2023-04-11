const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const formateTimeCount = (time) => time >= 10 ? `${time}` : `0${time}`
const createTimerAnimator = () => {
  let endTimerDate;
  let timerIntervalLink;

  return (seconds) => {
    if (!seconds) return
    if (timerIntervalLink) clearInterval(timerIntervalLink)

    const startTimerDate = Date.now();
    endTimerDate = startTimerDate + seconds * 1000

    timerIntervalLink = setInterval(() => {
      let timeDiffSecc = (endTimerDate - Date.now()) / 1000
      if (timeDiffSecc <= 1) {
        timerEl.innerHTML = "00:00:00"
        clearInterval(timerIntervalLink)
      }

      const seconds = Math.floor(timeDiffSecc % 60)
      const minutes = Math.floor((timeDiffSecc / 60) % 60)
      const house = Math.floor((timeDiffSecc / 3600) % 24)

      timerEl.innerHTML = `${formateTimeCount(house)}:${formateTimeCount(minutes)}:${formateTimeCount(seconds)}`
    },100)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  const numberValue = parseInt(inputEl.value)
  if (numberValue) inputEl.value = numberValue.toString()
  else inputEl.value = ""
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
