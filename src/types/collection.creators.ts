import { Disc, Collection } from "./collection.types";

export const emptyDisc: Disc = {
  discId: "",
  name: "",
  genre: "",
  artist: "",
  releaseYear: 0
};

export const emptyCollection: Collection = {
  collectionId: "",
  collectionName: "",
  discs: [emptyDisc]
};
