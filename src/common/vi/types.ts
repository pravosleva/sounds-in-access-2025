export type TSoundPack = {
  title: string;
  descr: string;
  bg: {
    src: string;
  };
  items: {
    title: string;
    descr: string;
    audio: string;
    bg: {
      src: string;
    };
  }[];
}
export enum EProject {
  WHAT_WHERE_WHEN = 'what_where_when',
  TOM_AND_JERRY = 'tom-and-jerry',
  GAMES = 'games',
  MEMS = 'mems',
}
export enum ELoadStatus {
  INACTIVE = 'inactive',
  STARTED = 'loading...',
  ERRORED = 'load error',
  LOADED = 'loaded'
}
