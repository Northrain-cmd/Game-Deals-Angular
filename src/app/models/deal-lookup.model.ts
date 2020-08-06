export interface DealLookup {
  "gameInfo": {
    "storeID": string,
    "gameID": string,
    "name": string,
    "steamAppID": string,
    "salePrice": string,
    "retailPrice": string,
    "steamRatingText": string,
    "steamRatingPercent": string,
    "steamRatingCount": string,
    "metacriticScore": string,
    "metacriticLink": string,
    "releaseDate": number,
    "publisher": string,
    "steamworks": string,
    "thumb": string
  },
  "cheaperStores": Array<any>,
  "cheapestPrice": {
    "price": string,
    "date": number
  }
}