const ancientCard = document.querySelectorAll('.ancient-card');
const difficultyContainer = document.querySelector('.difficulty-container');
const difficulty = document.querySelectorAll('.difficulty');
const shuffleBtn = document.querySelector('.shuffle-btn');

ancientCard.forEach(el => el.addEventListener('click', () => {
  ancientCard.forEach(el => {
    el.classList.remove('active');
  })
  el.classList.add('active')

  difficultyContainer.classList.add('active')
}))

difficulty.forEach(el => el.addEventListener('click', () => {
  difficulty.forEach(el => {
    el.classList.remove('active');
  })
  el.classList.add('active');
  shuffleBtn.classList.add('active');
}))