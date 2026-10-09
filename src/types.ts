export type TrackInfo = {
  title?: string;
  artist?: string;
  audioUrl: string | null;
};

export type Letter = {
  id: string;
  title: string;
  from: string;
  to: string;
  text?: string;
};

export type CreateLetter = {
  title: string;
  from: string;
  to: string;
  text: string;
};
