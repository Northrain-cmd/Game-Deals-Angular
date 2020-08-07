export interface DealLookup {
  "gameInfo": {
    "storeID": string,
    "gameID": string,
    "name": string,
    "steamAppID"?: string | null,
    "salePrice": string,
    "retailPrice": string,
    "steamRatingText"?: string | null,
    "steamRatingPercent"?: string,
    "steamRatingCount"?: string,
    "metacriticScore"?: string,
    "metacriticLink"?: string | null,
    "releaseDate": number,
    "publisher": string,
    "steamworks"?: string | null,
    "thumb"?: string
  },
  "cheaperStores": Array<any>,
  "cheapestPrice": {
    "price"?: string,
    "date": number
  }
}