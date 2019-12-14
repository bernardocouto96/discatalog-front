type Disc = {
  discId: string;
  name: string;
  genre: string;
  artist: string;
  releaseYear: number;
};

export type Collection = {
  collectionId: string;
  collectionName: string;
  discs: [Disc];
};
