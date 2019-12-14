type Disc = {
  discId: number;
  name: string;
  genre: string;
  artist: string;
  releaseYear: number;
};

export type Collection = {
  collectionId: Number;
  collectionName: string;
  discs: [Disc];
};
