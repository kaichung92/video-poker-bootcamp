let shuffledCardDeck = [];
let startingHand = [];
let playerScore = 0;
let cardNameTally = {};
let betAmount = 0;
let playerCreditLeft = 100;
let dealerButtonCounter = 0;
let betSize = 0;
let holdCard = [];
let finalHand = [];
let testHand = [
  {
    name: "ace",
    suitName: "diamonds",
    rank: 1,
  },
  {
    name: "ace",
    suitName: "diamonds",
    rank: 10,
  },
  {
    name: "2",
    suitName: "diamonds",
    rank: 11,
  },
  {
    name: "ace",
    suitName: "clubs",
    rank: 11,
  },
  {
    name: "ace",
    suitName: "diamonds",
    rank: 13,
  },
];

/*this function will create a deck of 1-13rank and a joker as the 14rank
the object includes, name, rank, color, symbol and suitname*/
const makeDeck = () => {
  let cardDeck = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
      let card = { name: `${j}`, rank: j, symbol: i };
      switch (i) {
        case 0:
          card.symbol = "♠";
          card.suitName = `spades`;
          card.color = `black`;
          break;

        case 1:
          card.symbol = "♣";
          card.suitName = `clubs`;
          card.color = `black`;
          break;

        case 2:
          card.symbol = "♥";
          card.suitName = `hearts`;
          card.color = `red`;
          break;

        case 3:
          card.symbol = "♦";
          card.suitName = `diamonds`;
          card.color = `red`;
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

//function to get a random whole number
const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

//function to draw starting cards
//loop 5 times with settimeout to display drawn cards one at a time
//within the loop
//push one card from shuffled card to starting hand
//get the pushed card to display out
//settimeout of 150ms for each card
const drawCard = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(`within loop of cards`);
      startingHand.push(shuffledCardDeck[0].pop());
      let cardName = startingHand[i].name;
      let cardsuit = startingHand[i].suitName;

      cardDisplay[
        i
      ].style.background = `url(./images/${cardsuit}_${cardName}.png)`;
      console.log(i);
      cardDisplay[i].style.backgroundSize = `cover`;
      cardDisplay[i].style.transform = `none`;
    }, 150 * (i + 1));
  }
};

//function to display HOLD and splices number if appears more than once
//card position will be push to holdCard, adding the class
//if holdcard does not have the pushed card number it will remain
//if theres a repeat number than will splice the last card add and the first time it appeared and removing the class along
const keepCard = (cardPosition) => {
  cardHoldDisplay[cardPosition].classList.add(`add-hold-card`);
  cardHoldDisplay[cardPosition].innerHTML = `HOLD`;
  holdCard.push(cardPosition);

  for (let i = 0; i < holdCard.length; i++) {
    for (let j = i + 1; j < holdCard.length; j++)
      if (holdCard[i] === cardPosition) {
        if (holdCard[j] === cardPosition) {
          cardHoldDisplay[cardPosition].classList.remove(`add-hold-card`);
          cardHoldDisplay[cardPosition].innerHTML = ``;
          holdCard.splice(j, 1);
          holdCard.splice(i, 1);
        }
      }
  }

  console.log(`card remaining in cardhold: ${holdCard}`);
};

//once player have decided, which cards to hold
//clone a new startinghand and slice the cards(position), to the finalhand
//after that draw additional cards to finalhand to make it 5
//sorting finalhand by rank 1 - 13
//then displaying them out with settimeout
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

  for (let i = 0; i < 5; i++) {
    cardDisplay[i].style.background = `url(./images/backcard.png)`;
  }

  finalHand.sort(function (a, b) {
    return a.rank - b.rank;
  });
  for (let i = 0; i < finalHand.length; i++) {
    setTimeout(() => {
      let cardName = finalHand[i].name;
      let cardsuit = finalHand[i].suitName;

      cardDisplay[
        i
      ].style.background = `url(./images/${cardsuit}_${cardName}.png)`;
      console.log(i);
      cardDisplay[i].style.backgroundSize = `cover`;
      console.log(`test within changeCard function`);
    }, 150 * (i + 1));
  }
};

//function to check the combo for finalhand
//starting from the tier 1 to the last
//updating TOKEN, game message and adding class for wins
const checkScore = (hand) => {
  console.log(hand);
  if (checkRoyalStriaght(hand) && checkFlush(hand)) {
    for (let i = 0; i < 6; i++) {
      tierTwo[i].classList.add(`selectedPayout`);
    }
    playerCreditLeft = playerCreditLeft + betAmount * 100;
    playerCredit.innerHTML = `TOKEN : ${playerCreditLeft}`;
    allBetPayout[betAmount - 1].classList.add(`selectedPayout`);
    gameMessage.classList.add(`payout-message`);
    gameMessage.innerHTML = `you got a royal flush!`;
  } else if (checkFlush(hand) && checkStriaght(hand)) {
    for (let i = 0; i < 6; i++) {
      tierThree[i].classList.add(`selectedPayout`);
    }
    playerCreditLeft = playerCreditLeft + betAmount * 50;
    playerCredit.innerHTML = `TOKEN : ${playerCreditLeft}`;
    allBetPayout[betAmount - 1].classList.add(`selectedPayout`);
    gameMessage.classList.add(`payout-message`);
    gameMessage.innerHTML = `you got a straight flush!`;
  } else if (checkFourKind(hand)) {
    for (let i = 0; i < 6; i++) {
      tierFour[i].classList.add(`selectedPayout`);
    }
    playerCreditLeft = playerCreditLeft + betAmount * 20;
    playerCredit.innerHTML = `TOKEN : ${playerCreditLeft}`;
    allBetPayout[betAmount - 1].classList.add(`selectedPayout`);
    gameMessage.classList.add(`payout-message`);
    gameMessage.innerHTML = `You got a four of a kind!`;
  } else if (checkTriple(hand) && checkPair(hand)) {
    for (let i = 0; i < 6; i++) {
      tierFive[i].classList.add(`selectedPayout`);
    }
    playerCreditLeft = playerCreditLeft + betAmount * 9;
    playerCredit.innerHTML = `TOKEN : ${playerCreditLeft}`;
    allBetPayout[betAmount - 1].classList.add(`selectedPayout`);
    gameMessage.classList.add(`payout-message`);
    gameMessage.innerHTML = `You got a full house!`;
  } else if (checkFlush(hand)) {
    for (let i = 0; i < 6; i++) {
      tierSix[i].classList.add(`selectedPayout`);
    }
    playerCreditLeft = playerCreditLeft + betAmount * 7;
    playerCredit.innerHTML = `TOKEN : ${playerCreditLeft}`;
    allBetPayout[betAmount - 1].classList.add(`selectedPayout`);
    gameMessage.classList.add(`payout-message`);
    gameMessage.innerHTML = `You got a flush!`;
  } else if (checkStriaght(hand) || checkRoyalStriaght(hand)) {
    for (let i = 0; i < 6; i++) {
      tierSeven[i].classList.add(`selectedPayout`);
    }
    playerCreditLeft = playerCreditLeft + betAmount * 5;
    playerCredit.innerHTML = `TOKEN : ${playerCreditLeft}`;
    allBetPayout[betAmount - 1].classList.add(`selectedPayout`);
    gameMessage.classList.add(`payout-message`);
    gameMessage.innerHTML = `You got a straight!`;
  } else if (checkTriple(hand)) {
    for (let i = 0; i < 6; i++) {
      tierEight[i].classList.add(`selectedPayout`);
    }
    playerCreditLeft = playerCreditLeft + betAmount * 3;
    playerCredit.innerHTML = `TOKEN : ${playerCreditLeft}`;
    allBetPayout[betAmount - 1].classList.add(`selectedPayout`);
    gameMessage.classList.add(`payout-message`);
    gameMessage.innerHTML = `You got a three of a kind!`;
  } else if (checkTwoPair(hand)) {
    for (let i = 0; i < 6; i++) {
      tierNine[i].classList.add(`selectedPayout`);
    }
    playerCreditLeft = playerCreditLeft + betAmount * 2;
    playerCredit.innerHTML = `TOKEN : ${playerCreditLeft}`;
    allBetPayout[betAmount - 1].classList.add(`selectedPayout`);
    gameMessage.classList.add(`payout-message`);
    gameMessage.innerHTML = `You got a two pair!`;
  } else if (checkJackPairBetter(hand)) {
    for (let i = 0; i < 6; i++) {
      tierTen[i].classList.add(`selectedPayout`);
    }
    playerCreditLeft = playerCreditLeft + betAmount * 1;
    playerCredit.innerHTML = `TOKEN : ${playerCreditLeft}`;
    allBetPayout[betAmount - 1].classList.add(`selectedPayout`);
    console.log(`jacks pair or better`);
    gameMessage.classList.add(`payout-message`);
    gameMessage.innerHTML = `You got a jacks or better pair!`;
  } else {
    console.log(`no combo`);
    console.log(`bet amount ${betAmount}`);
    console.log(`player credit left ${playerCreditLeft}`);
    playerCreditLeft = playerCreditLeft - betAmount;
    playerCredit.innerHTML = `TOKEN : ${playerCreditLeft}`;

    gameMessage.innerHTML = `No combo, better luck next time`;
  }
  //restartGame();
  console.log(`end of game`);
};

//function to reset the game, emptying decks counter, and message
const restartGame = () => {
  shuffledCardDeck = [];
  startingHand = [];
  playerScore = 0;
  cardNameTally = {};
  dealerButtonCounter = 0;

  holdCard = [];
  finalHand = [];
  betOne.disabled = false;
  betTwo.disabled = false;
  betThree.disabled = false;
  betFour.disabled = false;
  betFive.disabled = false;
  gameMessage.innerHTML = `Please select your bet`;
  gameMessage.classList.remove(`payout-message`);
  buttonStart.innerHTML = `DEAL`;
  for (let i = 0; i < 5; i++) {
    cardDisplay[i].style.background = ``;

    cardDisplay[i].style.transform = `rotateX(180deg)`;
  }

  for (let i = 0; i < 6; i++) {
    tierTen[i].classList.remove(`selectedPayout`);
  }
  allBetPayout[betAmount - 1].classList.remove(`selectedPayout`);

  betFivePayout.classList.remove(`chosen-payout`);
  betOnePayout.classList.remove(`chosen-payout`);
  betTwoPayout.classList.remove(`chosen-payout`);
  betThreePayout.classList.remove(`chosen-payout`);
  betFourPayout.classList.remove(`chosen-payout`);
};

//function to see if theres any repeated cards
//run hand through a loop
//let currentCardRank = playerhand.rank
//if currentCardRank is in rankTally than itll plus 1
//if not in, ===1
const calcHandScore = (playerHand) => {
  let rankTally = {};

  for (let i = 0; i < playerHand.length; i++) {
    let currentCardRank = playerHand[i].rank;
    if (currentCardRank in rankTally) {
      rankTally[currentCardRank] += 1;
    } else {
      rankTally[currentCardRank] = 1;
    }
  }
  return rankTally;
};

//function to check for straights
//since hand is another rank from 1-13, card[0] must be the lowest
//second card must be plus 1 and so on
//everytime it meets the requirements, counter will plus 1
//in order to hit a straight, counter must be ===4
const checkStriaght = (hand) => {
  let counter = 0;
  let currentCard = hand[0].rank;
  for (let i = 1; i < hand.length; i++) {
    if (currentCard + 1 === hand[i].rank) {
      counter++;
      currentCard = hand[i].rank;
    }
  }
  if (counter === 4) {
    return true;
  }
};

//function to check for royal straights
//condition for royal straights [1, 10, 11, 12, 13]
//first card have to be rank 1
//second card have to be 10, set hand[1] = currentcard
//currentcard+1 needs to equal to hand[2] and so on
//counter ===4 for a royal straight
const checkRoyalStriaght = (hand) => {
  let counter = 0;
  let currentCard = hand[0].rank;
  if (currentCard === 1) {
    counter++;
    currentCard = hand[1].rank;
  }
  for (let i = 2; i < hand.length; i++) {
    if (currentCard + 1 === hand[i].rank) {
      counter++;
      currentCard = hand[i].rank;
    }
  }
  if (counter === 4) {
    return true;
  }
};

//function to check for flush
//comparing all cards suit to the first cards suit
//counter reaches 4, true
const checkFlush = (hand) => {
  let counter = 0;
  let currentCard = hand[0].suitName;
  for (let i = 1; i < hand.length; i++) {
    if (currentCard === hand[i].suitName) {
      counter++;
    }
  }
  if (counter === 4) {
    return true;
  }
};

//function to check for four of a kind
//run hand through calchandscore
//if theres a card that appeared 4 times, than true
const checkFourKind = (hand) => {
  if (Object.values(calcHandScore(hand)).includes(4)) {
    return true;
  }
};

//function to check for three of a kind
//run hand through calchandscore
//if theres a card that appeared 3 times, than true
const checkTriple = (hand) => {
  if (Object.values(calcHandScore(hand)).includes(3)) {
    return true;
  }
};

//function to check for pair
//run hand through calchandscore
//if theres a card that appeared 2 times, than true
const checkPair = (hand) => {
  if (Object.values(calcHandScore(hand)).includes(2)) {
    return true;
  }
};

//function to check for two pair
//created another tally but this time with a counter
//instead of adding additonal 1 for repeated card
//add counter++ instead
//if counter ===2, then we have two pairs
const checkTwoPair = (hand) => {
  let rankTally = {};
  let counter = 0;
  for (let i = 0; i < hand.length; i++) {
    let currentCardRank = hand[i].rank;
    if (currentCardRank in rankTally) {
      counter++;
      console.log(counter);
    } else {
      rankTally[currentCardRank] = 1;
    }
  }
  console.log(rankTally);
  if (counter === 2) {
    return true;
  }
};

//function for one jacks or better
//since its limited to only rank 1, 11,12,13
//created a counter for those ranks
//any counter ===2, true
const checkJackPairBetter = (hand) => {
  console.log(`within J pair checker: ${hand.length}`);
  let jackCounter = 0;
  let queenCounter = 0;
  let kingCounter = 0;
  let aceCounter = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].rank === 11) {
      jackCounter += 1;
    } else if (hand[i].rank === 12) {
      queenCounter += 1;
    } else if (hand[i].rank === 13) {
      kingCounter += 1;
    } else if (hand[i].rank === 1) {
      aceCounter += 1;
    }
  }
  if (
    jackCounter > 1 ||
    queenCounter > 1 ||
    kingCounter > 1 ||
    aceCounter > 1
  ) {
    return true;
  }
};

//function for dealerbutton
//player have to select amount to start
//when betamount !=0, deck will be made and player will draw 5 starting cards
//change message and disable betting buttons
//second press will remove any classlist for HOLD
//change away unwanted cards and run finalhand through checkscore
//last press will reset the game
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
    gameMessage.innerHTML = `Select the cards you want to hold`;
  } else if (dealerButtonCounter === 1) {
    for (let i = 0; i < holdCard.length; i++) {
      cardHoldDisplay[holdCard[i]].classList.remove(`add-hold-card`);
      cardHoldDisplay[holdCard[i]].innerHTML = ``;
    }
    dealerButtonCounter += 1;
    changeCard();
    checkScore(finalHand);
    buttonStart.innerHTML = `PLAY AGAIN`;
  } else if (dealerButtonCounter === 2) {
    console.log(`hello`);
    restartGame();
  }
};

//adding buttons from html to js
const gameMessage = document.getElementById(`end-game-message`);
const buttonStart = document.getElementById(`dealButton`);
const betOne = document.getElementById(`betButton1`);
const betTwo = document.getElementById(`betButton2`);
const betThree = document.getElementById(`betButton3`);
const betFour = document.getElementById(`betButton4`);
const betFive = document.getElementById(`betButton5`);

//adding payout to manipulate in js
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
const betSizeDisplay = document.getElementById(`player-bet`);
const playerCredit = document.getElementById(`player-credit`);

const tierTwo = document.getElementsByClassName(`tier-two`);
const tierThree = document.getElementsByClassName(`tier-three`);
const tierFour = document.getElementsByClassName(`tier-four`);
const tierFive = document.getElementsByClassName(`tier-five`);
const tierSix = document.getElementsByClassName(`tier-six`);
const tierSeven = document.getElementsByClassName(`tier-seven`);
const tierEight = document.getElementsByClassName(`tier-eight`);
const tierNine = document.getElementsByClassName(`tier-nine`);
const tierTen = document.getElementsByClassName(`tier-ten`);

//adding eventlistener
betOne.addEventListener(`click`, () => {
  betAmount = 1;
  betSizeDisplay.innerHTML = `BET : ${betAmount}`;
  console.log(`the bet amount is ${betAmount}`);
  betOnePayout.classList.add(`chosen-payout`);
  betTwoPayout.classList.remove(`chosen-payout`);
  betThreePayout.classList.remove(`chosen-payout`);
  betFourPayout.classList.remove(`chosen-payout`);
  betFivePayout.classList.remove(`chosen-payout`);
});

betTwo.addEventListener(`click`, () => {
  betAmount = 2;
  betSizeDisplay.innerHTML = `BET : ${betAmount}`;
  console.log(`the bet amount is ${betAmount}`);
  betTwoPayout.classList.add(`chosen-payout`);
  betOnePayout.classList.remove(`chosen-payout`);
  betThreePayout.classList.remove(`chosen-payout`);
  betFivePayout.classList.remove(`chosen-payout`);
  betFourPayout.classList.remove(`chosen-payout`);
});

betThree.addEventListener(`click`, () => {
  betAmount = 3;
  betSizeDisplay.innerHTML = `BET : ${betAmount}`;
  console.log(`the bet amount is ${betAmount}`);
  betThreePayout.classList.add(`chosen-payout`);
  betOnePayout.classList.remove(`chosen-payout`);
  betTwoPayout.classList.remove(`chosen-payout`);
  betFourPayout.classList.remove(`chosen-payout`);
  betFivePayout.classList.remove(`chosen-payout`);
});

betFour.addEventListener(`click`, () => {
  betAmount = 4;
  betSizeDisplay.innerHTML = `BET : ${betAmount}`;
  console.log(`the bet amount is ${betAmount}`);
  betFourPayout.classList.add(`chosen-payout`);
  betOnePayout.classList.remove(`chosen-payout`);
  betTwoPayout.classList.remove(`chosen-payout`);
  betThreePayout.classList.remove(`chosen-payout`);
  betFivePayout.classList.remove(`chosen-payout`);
});

betFive.addEventListener(`click`, () => {
  betAmount = 5;
  betSizeDisplay.innerHTML = `BET : ${betAmount}`;
  console.log(`the bet amount is ${betAmount}`);
  betFivePayout.classList.add(`chosen-payout`);
  betOnePayout.classList.remove(`chosen-payout`);
  betTwoPayout.classList.remove(`chosen-payout`);
  betThreePayout.classList.remove(`chosen-payout`);
  betFourPayout.classList.remove(`chosen-payout`);
});

buttonStart.addEventListener(`click`, () => {
  dealerButton();
});

for (let i = 0; i < 5; i++) {
  cardDisplay[i].addEventListener("click", () => {
    keepCard(i);
  });
}
