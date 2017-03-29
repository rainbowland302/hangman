const gameUrl = 'http://localhost:3000/api/game';
const guessUrl = 'http://localhost:3000/api/tellme';

export const gameFetch = async function(payload) {
  const response = await fetch(gameUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const res = await response.json();
  return res;
};

export const guessFetch = async function(payload) {
  const response = await fetch(guessUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const res = await response.json();
  return res.letter;
};
