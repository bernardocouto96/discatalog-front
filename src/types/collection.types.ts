export type Disc = {
  discId: string;
  name: string;
  genre: string;
  artist: string;
  releaseYear: string;
};

export type Collection = {
  collectionId: string;
  collectionName: string;
  discs: [Disc];
};
