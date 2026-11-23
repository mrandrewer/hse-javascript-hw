const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

const getHole = index => document.getElementById(`hole${index}`);

const resetCounters = () => {
  deadCounter.textContent = '0';
  lostCounter.textContent = '0';
};

for (let index = 1; index <= 9; index += 1) {
  const hole = getHole(index);

  hole.onclick = () => {
    if (hole.classList.contains('hole_has-mole')) {
      deadCounter.textContent = String(Number(deadCounter.textContent) + 1);

      if (Number(deadCounter.textContent) === 10) {
        alert('Вы победили!');
        resetCounters();
      }
    } else {
      lostCounter.textContent = String(Number(lostCounter.textContent) + 1);

      if (Number(lostCounter.textContent) === 5) {
        alert('Вы проиграли!');
        resetCounters();
      }
    }
  };
}
