const emojis =  [ 
    '🐵', '🐶', '🦊', '🐱', '🦁', '🐯', '🐴', '🦄', '🦓', '🦌', 
    '🐮', '🐷', '🐭','🐹', '🐻', '🐨', '🐼', '🐽', '🐸', '🐰', '🐙' 
    ];
  
  const board = document.getElementById('game-board');
  const playAgainBtn = document.getElementById('play-again');
  
  let cardValues = [];
  let flippedCards = [];
  let matchedCount = 0;
  const pairCount = 8;
  

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function initGame() {
    board.innerHTML = '';
    matchedCount = 0;
    flippedCards = [];
    cardValues = [];
  
    const selectedEmojis = emojis.slice(0, pairCount);
    const pairs = [...selectedEmojis, ...selectedEmojis]; 
    shuffle(pairs);
  
    pairs.forEach((emoji, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.index = index;
      card.dataset.emoji = emoji;
      card.textContent = '';
      card.addEventListener('click', () => flipCard(card));
      board.appendChild(card);
      cardValues.push(emoji);
    });

  }
  
  function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
      return;
    }
  
    card.textContent = card.dataset.emoji;
    card.classList.add('flipped');
    flippedCards.push(card);
  
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        matchedCount++;
        if (matchedCount === pairCount) {
          setTimeout(() => {
            playAgainBtn.style.display = 'block';
          }, 500);
        }
      } else {
        setTimeout(() => {
          card1.textContent = '';
          card2.textContent = '';
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  }
  
  playAgainBtn.addEventListener('click', initGame);
  
  initGame();
  