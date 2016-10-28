
const cardsRoute = '/cards';

export function backUp(cards) {
  return fetch(cardsRoute, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(cards),
  })
  .then((response) => {
    if (response.ok) {
      console.log('successfully updated');
    } else {
      // this happens on other failures, eg 404 or 401
      console.log(`failed to backup, status code: ${response.status}`);
    }
  })
  .catch((error) => {
    // this happens on network errors
    console.log(`network error encountered: ${error.message}`);
  });
}
