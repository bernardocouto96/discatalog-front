import { Disc, Collection } from "./collection.types";

export const emptyDisc: Disc = {
  discId: "",
  name: "",
  genre: "",
  artist: "",
  releaseYear: ""
};

export const emptyCollection: Collection = {
  collectionId: "",
  collectionName: "",
  discs: [emptyDisc]
};
