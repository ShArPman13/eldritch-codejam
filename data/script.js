import ancientsData from "../data/ancients.js"
// import difficulties from "./data/difficulties.js"
import blueCardsData from "../data/mythicCards/blue/index.js"
import brownCardsData from "../data/mythicCards/brown/index.js"
import greenCardsData from "../data/mythicCards/green/index.js"

const ancientCard = document.querySelectorAll('.ancient-card');
const difficultyContainer = document.querySelector('.difficulty-container');
const difficulty = document.querySelectorAll('.difficulty');
const shuffleBtn = document.querySelector('.shuffle-btn');
const containerForAncientCards = document.querySelector('.ancients-cards');
const containerForAncientCardsAndLabel = document.querySelector('.container-for-ancients-cards');
const backCard = document.querySelector('.back-card');
const lastCard = document.querySelector('.last-card');
const stageContainer = document.querySelector('.current-state')

const divGreenCircle = document.createElement('div');
const divBlueCircle = document.createElement('div');
const divBrownCircle = document.createElement('div');
const divGreenCircle2 = document.createElement('div');
const divBlueCircle2 = document.createElement('div');
const divBrownCircle2 = document.createElement('div');
const divGreenCircle3 = document.createElement('div');
const divBlueCircle3 = document.createElement('div');
const divBrownCircle3 = document.createElement('div');

let deckForGame = [];
let startArray = [];
let ancientNum;
let statusArrFirstStage = [];
let statusArrSecondStage = [];
let statusArrThirdStage = [];
let currentCard;

ancientCard.forEach((el, i) => el.addEventListener('click', () => {

  containerForAncientCards.innerHTML = '';
  containerForAncientCardsAndLabel.innerHTML = '';
  stageContainer.innerHTML = '';

  ancientCard.forEach((el) => {
    el.classList.remove('active');
  })
  difficulty.forEach(el => {
    el.classList.remove('active');
  })
  backCard.classList.remove('active');
  lastCard.classList.remove('active');

  el.classList.add('active')

  difficultyContainer.classList.add('active')
  shuffleBtn.classList.remove('active');

  showStartCardsForAncient(i);
  ancientNum = i;
}))

difficulty.forEach(el => el.addEventListener('click', (e) => {

  difficulty.forEach(el => {
    el.classList.remove('active');
  })
  backCard.classList.remove('active');
  lastCard.classList.remove('active');

  stageContainer.innerHTML = '';
  el.classList.add('active');

  if (e.target.classList.contains('medium')) {
    startArray = fillArrayForNormalDifficulty(ancientNum);
    deckForGame = getDeckForStartGameNormal(ancientNum, startArray);
    shuffleBtn.classList.add('active');
    el.classList.add('active');
  } else if (e.target.classList.contains('easy')) {
    startArray = fillArrayForEasyDifficulty(ancientNum);
    deckForGame = getDeckForStartGameNormal(ancientNum, startArray);
    shuffleBtn.classList.add('active');
    el.classList.add('active');
  } else if (e.target.classList.contains('hard')) {
    startArray = fillArrayForHardDifficulty(ancientNum);
    deckForGame = getDeckForStartGameNormal(ancientNum, startArray);
    shuffleBtn.classList.add('active');
    el.classList.add('active');
  } else if (e.target.classList.contains('very-hard')) {
    startArray = fillArrayForVeryHardDifficulty(ancientNum);
    deckForGame = getDeckForStartGameNormal(ancientNum, startArray);
    shuffleBtn.classList.add('active');
    el.classList.add('active');
  } else if (e.target.classList.contains('very-easy')) {
    startArray = fillArrayForVeryEasyDifficulty(ancientNum);
    deckForGame = getDeckForStartGameNormal(ancientNum, startArray);
    shuffleBtn.classList.add('active');
    el.classList.add('active');
  }
  else {
    shuffleBtn.classList.remove('active');
  }
}))

function countCardOfAncient(ancient) {//получаем объект с картами выбранного древнего
  let cardsForAncient = {};
  let greenCards = 0;
  let blueCards = 0;
  let brownCards = 0;
  for (let key in ancientsData[ancient]) {
    if (key.includes('Stage')) {
      greenCards = greenCards + ancientsData[ancient][key].greenCards;
      blueCards = blueCards + ancientsData[ancient][key].blueCards;
      brownCards = brownCards + ancientsData[ancient][key].brownCards;
    }
  }
  cardsForAncient.greenCards = greenCards;
  cardsForAncient.blueCards = blueCards;
  cardsForAncient.brownCards = brownCards;
  return cardsForAncient;
}

function fillArrayForNormalDifficulty(i) {//получаем три стартовые рандомные в одном массиве difficulty NORMAL
  let greenArray = [];
  let blueArray = [];
  let brownArray = [];

  while (greenArray.length < countCardOfAncient(i).greenCards) {
    greenArray.push(greenCardsData[Math.floor(Math.random() * 18)].cardFace);
    greenArray = [...new Set(greenArray)];
  }
  while (blueArray.length < countCardOfAncient(i).blueCards) {
    blueArray.push(blueCardsData[Math.floor(Math.random() * 12)].cardFace);
    blueArray = [...new Set(blueArray)];
  }
  while (brownArray.length < countCardOfAncient(i).brownCards) {
    brownArray.push(brownCardsData[Math.floor(Math.random() * 21)].cardFace);
    brownArray = [...new Set(brownArray)];
  }
  return [greenArray, blueArray, brownArray];
}
function fillArrayForEasyDifficulty(i) {//получаем три стартовые рандомные в одном массиве difficulty EASY
  let greenArray = [];
  let blueArray = [];
  let brownArray = [];
  let greenCardsDataWithoutHard = greenCardsData.filter(card => card.difficulty !== 'hard');
  let blueCardsDataWithoutHard = blueCardsData.filter(card => card.difficulty !== 'hard');
  let brownCardsDataWithoutHard = brownCardsData.filter(card => card.difficulty !== 'hard');

  while (greenArray.length < countCardOfAncient(i).greenCards) {
    greenArray.push(greenCardsDataWithoutHard[Math.floor(Math.random() * greenCardsDataWithoutHard.length)].cardFace);
    greenArray = [...new Set(greenArray)];
  }
  while (blueArray.length < countCardOfAncient(i).blueCards) {
    blueArray.push(blueCardsDataWithoutHard[Math.floor(Math.random() * blueCardsDataWithoutHard.length)].cardFace);
    blueArray = [...new Set(blueArray)];
  }
  while (brownArray.length < countCardOfAncient(i).brownCards) {
    brownArray.push(brownCardsDataWithoutHard[Math.floor(Math.random() * brownCardsDataWithoutHard.length)].cardFace);
    brownArray = [...new Set(brownArray)];
  }
  return [greenArray, blueArray, brownArray];
}
function fillArrayForHardDifficulty(i) {//получаем три стартовые рандомные в одном массиве difficulty HARD
  let greenArray = [];
  let blueArray = [];
  let brownArray = [];
  let greenCardsDataWithoutEasy = greenCardsData.filter(card => card.difficulty !== 'easy');
  let blueCardsDataWithoutEasy = blueCardsData.filter(card => card.difficulty !== 'easy');
  let brownCardsDataWithoutEasy = brownCardsData.filter(card => card.difficulty !== 'easy');

  while (greenArray.length < countCardOfAncient(i).greenCards) {
    greenArray.push(greenCardsDataWithoutEasy[Math.floor(Math.random() * greenCardsDataWithoutEasy.length)].cardFace);
    greenArray = [...new Set(greenArray)];
  }
  while (blueArray.length < countCardOfAncient(i).blueCards) {
    blueArray.push(blueCardsDataWithoutEasy[Math.floor(Math.random() * blueCardsDataWithoutEasy.length)].cardFace);
    blueArray = [...new Set(blueArray)];
  }
  while (brownArray.length < countCardOfAncient(i).brownCards) {
    brownArray.push(brownCardsDataWithoutEasy[Math.floor(Math.random() * brownCardsDataWithoutEasy.length)].cardFace);
    brownArray = [...new Set(brownArray)];
  }
  return [greenArray, blueArray, brownArray];
}
function fillArrayForVeryHardDifficulty(i) {//получаем три стартовые рандомные в одном массиве difficulty VERY-HARD
  let greenArray = greenCardsData.filter(card => card.difficulty === 'hard').map(card => card.cardFace);
  let blueArray = blueCardsData.filter(card => card.difficulty === 'hard').map(card => card.cardFace);
  let brownArray = brownCardsData.filter(card => card.difficulty === 'hard').map(card => card.cardFace);

  let greenCardsDataWithoutEasy = greenCardsData.filter(card => card.difficulty !== 'easy');
  let blueCardsDataWithoutEasy = blueCardsData.filter(card => card.difficulty !== 'easy');
  let brownCardsDataWithoutEasy = brownCardsData.filter(card => card.difficulty !== 'easy');

  while (greenArray.length < countCardOfAncient(i).greenCards) {
    greenArray.push(greenCardsDataWithoutEasy[Math.floor(Math.random() * greenCardsDataWithoutEasy.length)].cardFace);
    greenArray = [...new Set(greenArray)];
  }
  while (blueArray.length < countCardOfAncient(i).blueCards) {
    blueArray.push(blueCardsDataWithoutEasy[Math.floor(Math.random() * blueCardsDataWithoutEasy.length)].cardFace);
    blueArray = [...new Set(blueArray)];
  }
  while (brownArray.length < countCardOfAncient(i).brownCards) {
    brownArray.push(brownCardsDataWithoutEasy[Math.floor(Math.random() * brownCardsDataWithoutEasy.length)].cardFace);
    brownArray = [...new Set(brownArray)];
  }
  return [greenArray, blueArray, brownArray];
}
function fillArrayForVeryEasyDifficulty(i) {//получаем три стартовые рандомные в одном массиве difficulty VERY-HARD
  let greenArray = greenCardsData.filter(card => card.difficulty === 'easy').map(card => card.cardFace);
  let blueArray = blueCardsData.filter(card => card.difficulty === 'easy').map(card => card.cardFace);
  let brownArray = brownCardsData.filter(card => card.difficulty === 'easy').map(card => card.cardFace);

  let greenCardsDataWithoutHard = greenCardsData.filter(card => card.difficulty !== 'hard');
  let blueCardsDataWithoutHard = blueCardsData.filter(card => card.difficulty !== 'hard');
  let brownCardsDataWithoutHard = brownCardsData.filter(card => card.difficulty !== 'hard');

  while (greenArray.length < countCardOfAncient(i).greenCards) {
    greenArray.push(greenCardsDataWithoutHard[Math.floor(Math.random() * greenCardsDataWithoutHard.length)].cardFace);
    greenArray = [...new Set(greenArray)];
  }
  while (blueArray.length < countCardOfAncient(i).blueCards) {
    blueArray.push(blueCardsDataWithoutHard[Math.floor(Math.random() * blueCardsDataWithoutHard.length)].cardFace);
    blueArray = [...new Set(blueArray)];
  }
  while (brownArray.length < countCardOfAncient(i).brownCards) {
    brownArray.push(brownCardsDataWithoutHard[Math.floor(Math.random() * brownCardsDataWithoutHard.length)].cardFace);
    brownArray = [...new Set(brownArray)];
  }
  return [greenArray, blueArray, brownArray];
}

function showStartCardsForAncient(i) { // показываем стартовые карты при выборе древнего
  const divGreenCircle = document.createElement('div');
  const divBlueCircle = document.createElement('div');
  const divBrownCircle = document.createElement('div');
  const labelForCards = document.createElement('div')
  const secondLabelForCards = document.createElement('div')

  labelForCards.classList.add('label-for-cards');
  labelForCards.textContent = `Вы выбрали ${ancientsData[i].name}`
  labelForCards.style.fontSize = '20px';

  secondLabelForCards.classList.add('label-for-cards');
  secondLabelForCards.textContent = 'Вам потребуется следующий набор карт';

  containerForAncientCardsAndLabel.append(labelForCards);
  containerForAncientCardsAndLabel.append(secondLabelForCards);

  divGreenCircle.classList.add('green-circle', 'circle');
  divGreenCircle.textContent = countCardOfAncient(i).greenCards;
  containerForAncientCards.append(divGreenCircle);

  divBlueCircle.classList.add('blue-circle', 'circle');
  divBlueCircle.textContent = countCardOfAncient(i).blueCards;
  containerForAncientCards.append(divBlueCircle);

  divBrownCircle.classList.add('brown-circle', 'circle');
  divBrownCircle.textContent = countCardOfAncient(i).brownCards;
  containerForAncientCards.append(divBrownCircle);

  containerForAncientCardsAndLabel.append(containerForAncientCards)
}
function getDeckForStartGameNormal(i, startArray) {//получаем колоду для начала игры - difficulty NORMAL
  let firstStageArray = [];
  let secondStageArray = [];
  let thirdStageArray = [];
  let tempArrayGreen = [];
  let tempArrayBlue = [];
  let tempArrayBrown = [];
  let tempArray = [];
  // const startArray = fillArrayForNormalDifficulty(i);
  //------------------------------------заполняем firstStage
  while (firstStageArray.length < ancientsData[i].firstStage.greenCards) {
    firstStageArray.push(startArray[0][Math.floor(Math.random() * startArray[0].length)]);
    firstStageArray = [...new Set(firstStageArray)];
  }
  while (firstStageArray.length < ancientsData[i].firstStage.blueCards + ancientsData[i].firstStage.greenCards) {
    firstStageArray.push(startArray[1][Math.floor(Math.random() * startArray[1].length)]);
    firstStageArray = [...new Set(firstStageArray)];
  }
  while (firstStageArray.length < ancientsData[i].firstStage.blueCards + ancientsData[i].firstStage.greenCards + ancientsData[i].firstStage.brownCards) {
    firstStageArray.push(startArray[2][Math.floor(Math.random() * startArray[2].length)]);
    firstStageArray = [...new Set(firstStageArray)];
  }
  tempArrayGreen = startArray[0].filter(item => !firstStageArray.includes(item))
  tempArrayBlue = startArray[1].filter(item => !firstStageArray.includes(item))
  tempArrayBrown = startArray[2].filter(item => !firstStageArray.includes(item))
  tempArray = [tempArrayGreen, tempArrayBlue, tempArrayBrown]
  //------------------------------------заполняем secondStage
  while (secondStageArray.length < ancientsData[i].secondStage.greenCards) {
    secondStageArray.push(tempArray[0][Math.floor(Math.random() * tempArray[0].length)]);
    secondStageArray = [...new Set(secondStageArray)];
  }
  while (secondStageArray.length < ancientsData[i].secondStage.blueCards + ancientsData[i].secondStage.greenCards) {
    secondStageArray.push(tempArray[1][Math.floor(Math.random() * tempArray[1].length)]);
    secondStageArray = [...new Set(secondStageArray)];
  }
  while (secondStageArray.length < ancientsData[i].secondStage.blueCards + ancientsData[i].secondStage.greenCards + ancientsData[i].secondStage.brownCards) {
    secondStageArray.push(tempArray[2][Math.floor(Math.random() * tempArray[2].length)]);
    secondStageArray = [...new Set(secondStageArray)];
  }
  tempArrayGreen = tempArray[0].filter(item => !secondStageArray.includes(item))
  tempArrayBlue = tempArray[1].filter(item => !secondStageArray.includes(item))
  tempArrayBrown = tempArray[2].filter(item => !secondStageArray.includes(item))
  tempArray = [tempArrayGreen, tempArrayBlue, tempArrayBrown]
  //------------------------------------заполняем thirdStage
  while (thirdStageArray.length < ancientsData[i].thirdStage.greenCards) {
    thirdStageArray.push(tempArray[0][Math.floor(Math.random() * tempArray[0].length)]);
    thirdStageArray = [...new Set(thirdStageArray)];
  }
  while (thirdStageArray.length < ancientsData[i].thirdStage.blueCards + ancientsData[i].thirdStage.greenCards) {
    thirdStageArray.push(tempArray[1][Math.floor(Math.random() * tempArray[1].length)]);
    thirdStageArray = [...new Set(thirdStageArray)];
  }
  while (thirdStageArray.length < ancientsData[i].thirdStage.blueCards + ancientsData[i].thirdStage.greenCards + ancientsData[i].thirdStage.brownCards) {
    thirdStageArray.push(tempArray[2][Math.floor(Math.random() * tempArray[2].length)]);
    thirdStageArray = [...new Set(thirdStageArray)];
  }
  // tempArrayGreen = tempArray[0].filter(item => !thirdStageArray.includes(item))
  // tempArrayBlue = tempArray[1].filter(item => !thirdStageArray.includes(item))
  // tempArrayBrown = tempArray[2].filter(item => !thirdStageArray.includes(item))
  // tempArray = [tempArrayGreen, tempArrayBlue, tempArrayBrown]

  //------------------------------------concat to resultArray for game
  statusArrFirstStage = firstStageArray;
  statusArrSecondStage = secondStageArray;
  statusArrThirdStage = thirdStageArray;
  const resultArray = shuffle(firstStageArray).concat(shuffle(secondStageArray)).concat(shuffle(thirdStageArray));
  return resultArray;
}
function shuffle(arr) {//Shuffle array - Тасование Фишера — Йетса
  return [...arr].map((_, i, arrCopy) => {
    let rand = i + (Math.floor(Math.random() * (arrCopy.length - i)));
    [arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]]
    return arrCopy[i]
  })
}
function fillStatus() {//следим и обновляем статус
  divGreenCircle.textContent = countCardForStage(statusArrFirstStage)[0];
  divBlueCircle.textContent = countCardForStage(statusArrFirstStage)[1];
  divBrownCircle.textContent = countCardForStage(statusArrFirstStage)[2];

  divGreenCircle2.textContent = countCardForStage(statusArrSecondStage)[0];
  divBlueCircle2.textContent = countCardForStage(statusArrSecondStage)[1];
  divBrownCircle2.textContent = countCardForStage(statusArrSecondStage)[2];

  divGreenCircle3.textContent = countCardForStage(statusArrThirdStage)[0];
  divBlueCircle3.textContent = countCardForStage(statusArrThirdStage)[1];
  divBrownCircle3.textContent = countCardForStage(statusArrThirdStage)[2];
}
function countCardForStage(statusArray) {
  let green = 0;
  let blue = 0;
  let brown = 0;
  for (let card of statusArray) {
    if (card.includes('green')) {
      green++;
    } else if (card.includes('blue')) {
      blue++;
    } else if (card.includes('brown')) {
      brown++;
    }
  }
  return [green, blue, brown];
}
function showCurrentStage(i) {// генерируем верстку и состояние колоды на старте
  const currentStage = document.createElement('div');
  const currentStage2 = document.createElement('div');
  const currentStage3 = document.createElement('div');
  const dotsContainer = document.createElement('div');
  const dotsContainer2 = document.createElement('div');
  const dotsContainer3 = document.createElement('div');
  const textStage = document.createElement('span');
  const textStage2 = document.createElement('span');
  const textStage3 = document.createElement('span');

  textStage.classList.add('text-stage');
  textStage2.classList.add('text-stage');
  textStage3.classList.add('text-stage');
  textStage.textContent = 'First stage'
  textStage2.textContent = 'Second stage'
  textStage3.textContent = 'Third stage'

  currentStage.classList.add('first-stage')
  currentStage2.classList.add('first-stage')
  currentStage3.classList.add('first-stage')
  dotsContainer.classList.add('dots')
  dotsContainer2.classList.add('dots')
  dotsContainer3.classList.add('dots')

  divGreenCircle.classList.add('green-circle', 'circle');
  divBlueCircle.classList.add('blue-circle', 'circle');
  divBrownCircle.classList.add('brown-circle', 'circle');
  divGreenCircle2.classList.add('green-circle', 'circle');
  divBlueCircle2.classList.add('blue-circle', 'circle');
  divBrownCircle2.classList.add('brown-circle', 'circle');
  divGreenCircle3.classList.add('green-circle', 'circle');
  divBlueCircle3.classList.add('blue-circle', 'circle');
  divBrownCircle3.classList.add('brown-circle', 'circle');

  fillStatus();

  stageContainer.append(currentStage);
  currentStage.append(textStage)
  currentStage.append(dotsContainer)
  dotsContainer.append(divGreenCircle, divBlueCircle, divBrownCircle)
  stageContainer.append(currentStage2);
  currentStage2.append(textStage2)
  currentStage2.append(dotsContainer2)
  dotsContainer2.append(divGreenCircle2, divBlueCircle2, divBrownCircle2)
  stageContainer.append(currentStage3);
  currentStage3.append(textStage3)
  currentStage3.append(dotsContainer3)
  dotsContainer3.append(divGreenCircle3, divBlueCircle3, divBrownCircle3)
}


shuffleBtn.addEventListener('click', () => {
  shuffleBtn.classList.remove('active');
  backCard.classList.add('active');
  showCurrentStage(ancientNum);
});

backCard.addEventListener('click', (i) => {
  lastCard.classList.add('active');
  currentCard = deckForGame.shift()

  if (currentCard === undefined) {
    containerForAncientCardsAndLabel.innerHTML = '';
    // alert('Карты в колоде закончились');
    backCard.classList.remove('active');
  }

  if (statusArrFirstStage.length > 0) {
    statusArrFirstStage = statusArrFirstStage.filter(card => card !== currentCard)
    fillStatus();
  } else if (statusArrSecondStage.length > 0) {
    statusArrSecondStage = statusArrSecondStage.filter(card => card !== currentCard)
    fillStatus();
  } else if (statusArrThirdStage.length > 0) {
    statusArrThirdStage = statusArrThirdStage.filter(card => card !== currentCard)
    fillStatus();
  }

  lastCard.style.backgroundImage = `url(${currentCard})`;
})