//
let shuffledCardDeck = [];
let startingHand = [];
let playerScore = 0;
let cardNameTally = {};
let betAmount = 0;
let dealerButtonCounter = 0;
let betSize = 0;
let holdCard = [];
let finalHand = [];

/*this function will create a deck of 1-13rank and a joker as the 14rank
the object includes, name, rank, color, symbol and suitname*/
const makeDeck = () => {
  let cardDeck = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 14; j++) {
      let card = { name: `${j}`, rank: j, symbol: i };
      switch (i) {
        case 0:
          card.symbol = "♠";
          card.suitName = `spades`;
          card.color = `BLACK`;
          break;

        case 1:
          card.symbol = "♣";
          card.suitName = `clubs`;
          card.color = `BLACK`;
          break;

        case 2:
          card.symbol = "♥";
          card.suitName = `hearts`;
          card.color = `RED`;
          break;

        case 3:
          card.symbol = "♦";
          card.suitName = `diamonds`;
          card.color = `RED`;
      }

      switch (j) {
        case 1:
          card.name = "ace";
          break;

        case 11:
          card.name = "jack";
          break;

        case 12:
          card.name = "queen";
          break;
        case 13:
          card.name = "king";
          break;

        case 14:
          card.name = "joker";
      }

      cardDeck.push(card);
    }
  }
  for (let i = 0; i < cardDeck.length; i++) {
    let randomIndex = getRandomIndex(cardDeck.length);
    let randomCard = cardDeck[randomIndex];
    let currentCard = cardDeck[i];

    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  shuffledCardDeck.push(cardDeck);
};

const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

const drawCard = () => {
  startingHand.push(shuffledCardDeck[0].pop());
  startingHand.push(shuffledCardDeck[0].pop());
  startingHand.push(shuffledCardDeck[0].pop());
  startingHand.push(shuffledCardDeck[0].pop());
  startingHand.push(shuffledCardDeck[0].pop());
};

const keepCard = (cardSelected, cardPosition) => {
  let counter = 0;
  cardHoldDisplay[cardPosition].classList.add(`add-hold-card`);
  cardHoldDisplay[cardPosition].innerHTML = `HOLD`;
  holdCard.push(cardPosition);
  for (let i = 0; i < holdCard.length; i++) {
    if (holdCard[i] === cardPosition && counter === 0) {
      counter += 1;
    } else if (holdCard[i] === cardPosition && counter === 1) {
      holdCard.splice(i, 1);
      console.log(`within splice`);
      for (let j = 0; j < holdCard.length; j++) {
        if (holdCard[j] === cardPosition) {
          cardHoldDisplay[cardPosition].classList.remove(`add-hold-card`);
          cardHoldDisplay[cardPosition].innerHTML = ``;
          holdCard.splice(j, 1);
        }
      }
    }
  }
  console.log(counter);
  console.log(`card remaining in cardhold: ${holdCard}`);
};

const changeCard = () => {
  for (let i = 0; i < holdCard.length; i++) {
    let cloneStartingHand = startingHand.slice();
    console.log(cloneStartingHand[holdCard[i]]);
    console.log(`this is the cloneStartingHand: ${cloneStartingHand}`);
    finalHand.push(cloneStartingHand[holdCard[i]]);
  }
  let drawAmountOfCards = 5 - holdCard.length;
  for (let i = 0; i < drawAmountOfCards; i++) {
    finalHand.push(shuffledCardDeck[0].pop());
  }

  finalHand.sort(function (a, b) {
    return a.rank - b.rank;
  });

  for (let i = 0; i < finalHand.length; i++) {
    let cardName = finalHand[i].name;
    let cardsuit = finalHand[i].suitName;

    cardDisplay[
      i
    ].style.background = `url(./images/${cardsuit}_${cardName}.png)`;
    console.log(i);
    cardDisplay[i].style.backgroundSize = `cover`;
    console.log(`test within changeCard function`);
  }
};

const checkScore = () => {
  calcHandScore(finalHand);
  console.log(`last stage`);
  console.log(cardNameTally);
  checkJackPairBetter(finalHand);
  console.log(`no pair`);
};

const calcHandScore = (playerHand) => {
  for (let i = 0; i < playerHand.length; i++) {
    let currentCardRank = playerHand[i].rank;
    if (currentCardRank in cardNameTally) {
      cardNameTally[currentCardRank] += 1;
    } else {
      cardNameTally[currentCardRank] = 1;
    }
  }
};
const checkFiveOfAKind = (hand) => {
  let counter = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].rank === 14) {
      counter += 1;
    }

    {
    }
  }
};

const checkRoyalFlush = () => {};

const checkFourOfAKind = () => {};

const checkFullHouse = () => {};

const checkFlush = () => {};

/*
winning straight conditions
check up playerhand for JOKER
check for rank diff of less than or equals to 4
if playerarray have a rank diff of 4 and no repeated rank = true
if playerarray have a rank diff of 4 with repeat rank, but have 1 JOKER = true
if playerarray have a rank diff of 3 and have 2 JOKER = true
*/
const checkStraight = () => {
  let jokerCounter = 0;
  let array = [];
  for (let i = 0; i < playerHand.length; i++) {
    if (playerHand[i].rank === 14) {
      jokerCounter += 1;
    } else {
      array.push(playerHand[i].rank);
    }
  }
  if (array.math()) {
  }
};

const checkThreeOfAKind = () => {};

const checkTwoPair = () => {};

/**
 * checking for a jack pair or better
 * loop through the playerhand and find for jacks or queen
 * plys each counter with one
 * joker will plus counter of all by 1
 * if any of the counter ===2, then =true
 * @returns
 */
const checkJackPairBetter = (hand) => {
  console.log(`within J pair checker: ${hand.length}`);
  let jackCounter = 0;
  let queenCounter = 0;
  let kingCounter = 0;
  let aceCounter = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].rank === 11) {
      jackCounter += 1;
      console.log(`jackCounter: ${jackCounter}`);
    } else if (hand[i].rank === 12) {
      queenCounter += 1;
      console.log(`queenCounter: ${queenCounter}`);
    } else if (hand[i].rank === 13) {
      kingCounter += 1;
      console.log(`kingCounter: ${kingCounter}`);
    } else if (hand[i].rank === 1) {
      aceCounter += 1;
      console.log(`aceCounter: ${aceCounter}`);
    } else if (hand[i].rank === 14) {
      jackCounter += 1;
      queenCounter += 1;
      kingCounter += 1;
      aceCounter += 1;
      console.log(`jokerCounter:`);
    }
  }
  if (
    jackCounter > 1 ||
    queenCounter > 1 ||
    kingCounter > 1 ||
    aceCounter > 1
  ) {
    for (let i = 0; i < 6; i++) {
      tierTen[i].classList.add(`selectedPayout`);
    }
    allBetPayout[betAmount - 1].classList.add(`selectedPayout`);
    console.log(`jacks pair or better`);

    return true;
  }
};

const dealerButton = () => {
  if (betAmount === 0 && dealerButtonCounter === 0) {
    console.log(`please choose a bet amount`);
  } else if (betAmount != 0 && dealerButtonCounter === 0) {
    dealerButtonCounter += 1;
    makeDeck();
    drawCard();
    console.log(`your bet size is ${betAmount}`);
    betOne.disabled = true;
    betTwo.disabled = true;
    betThree.disabled = true;
    betFour.disabled = true;
    betFive.disabled = true;

    for (let i = 0; i < startingHand.length; i++) {
      let cardName = startingHand[i].name;
      let cardsuit = startingHand[i].suitName;

      cardDisplay[
        i
      ].style.background = `url(./images/${cardsuit}_${cardName}.png)`;
      console.log(i);
      cardDisplay[i].addEventListener("click", (event) => {
        console.log(event.currentTarget);
        keepCard(event.currentTarget, i);
      });

      cardDisplay[i].style.backgroundSize = `cover`;
      cardDisplay[i].style.transform = `none`;
    }
  } else if (dealerButtonCounter === 1) {
    for (let i = 0; i < holdCard.length; i++) {
      cardHoldDisplay[holdCard[i]].classList.remove(`add-hold-card`);
      cardHoldDisplay[holdCard[i]].innerHTML = ``;
    }
    dealerButtonCounter += 1;
    changeCard();
    checkScore();
  }
};

/**
 * need to append all the buttons and add listener
 * append startinghand to the 5cards
 * remove class of backcard and display the number card
 *
 */

//adding all the click functions on to my js code
const buttonStart = document.getElementById(`dealButton`);
const betOne = document.getElementById(`betButton1`);
const betTwo = document.getElementById(`betButton2`);
const betThree = document.getElementById(`betButton3`);
const betFour = document.getElementById(`betButton4`);
const betFive = document.getElementById(`betButton5`);

const betOnePayout = document.getElementById(`prizeList1`);
const betTwoPayout = document.getElementById(`prizeList2`);
const betThreePayout = document.getElementById(`prizeList3`);
const betFourPayout = document.getElementById(`prizeList4`);
const betFivePayout = document.getElementById(`prizeList5`);
const allBetPayout = [
  betOnePayout,
  betTwoPayout,
  betThreePayout,
  betFourPayout,
  betFivePayout,
];
const startingHandOne = document.getElementById(`card-front-0`);
const cardDisplay = document.getElementsByClassName(`card-front`);
const cardHoldDisplay = document.getElementsByClassName(`hold-card`);
const removeAllHold = document.getElementsByClassName(`add-hold-card`);

const tierTen = document.getElementsByClassName(`tier-ten`);

betOne.addEventListener(`click`, () => {
  betAmount = 1;

  console.log(`the bet amount is ${betAmount}`);
  betOnePayout.classList.add(`chosen-payout`);
  betTwoPayout.classList.remove(`chosen-payout`);
  betThreePayout.classList.remove(`chosen-payout`);
  betFourPayout.classList.remove(`chosen-payout`);
  betFivePayout.classList.remove(`chosen-payout`);
});

betTwo.addEventListener(`click`, () => {
  betAmount = 2;
  console.log(`the bet amount is ${betAmount}`);
  betTwoPayout.classList.add(`chosen-payout`);
  betOnePayout.classList.remove(`chosen-payout`);
  betThreePayout.classList.remove(`chosen-payout`);
  betFivePayout.classList.remove(`chosen-payout`);
  betFourPayout.classList.remove(`chosen-payout`);
});

betThree.addEventListener(`click`, () => {
  betAmount = 3;
  console.log(`the bet amount is ${betAmount}`);
  betThreePayout.classList.add(`chosen-payout`);
  betOnePayout.classList.remove(`chosen-payout`);
  betTwoPayout.classList.remove(`chosen-payout`);
  betFourPayout.classList.remove(`chosen-payout`);
  betFivePayout.classList.remove(`chosen-payout`);
});

betFour.addEventListener(`click`, () => {
  betAmount = 4;
  console.log(`the bet amount is ${betAmount}`);
  betFourPayout.classList.add(`chosen-payout`);
  betOnePayout.classList.remove(`chosen-payout`);
  betTwoPayout.classList.remove(`chosen-payout`);
  betThreePayout.classList.remove(`chosen-payout`);
  betFivePayout.classList.remove(`chosen-payout`);
});

betFive.addEventListener(`click`, () => {
  betAmount = 5;
  console.log(`the bet amount is ${betAmount}`);
  betFivePayout.classList.add(`selectedPayout`);
  betOnePayout.classList.remove(`selectedPayout`);
  betTwoPayout.classList.remove(`selectedPayout`);
  betThreePayout.classList.remove(`selectedPayout`);
  betFourPayout.classList.remove(`selectedPayout`);
});

buttonStart.addEventListener(`click`, () => {
  dealerButton();
});
