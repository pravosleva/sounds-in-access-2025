export type TSoundPackItem = {
  title: string;
  descr: string;
  audio: string;
  bg: {
    src: string;
  };
}

export type TSoundPack = {
  title: string;
  descr: string;
  bg: {
    src: string;
  };
  items: TSoundPackItem[];
}
export enum EProject {
  WHAT_WHERE_WHEN = 'what_where_when',
  TOM_AND_JERRY = 'tom-and-jerry',
  GAMES = 'games',
  MEMS = 'mems',
  CLICKS_2023 = 'clicks',
  FAILS_2023 = 'fails',
  INTRO_2023 = 'intro',
  PLOP_2023 = 'plop',
  SUCCESS_2023 = 'success',
  GONG_2023 = 'gong',
  LOAD_2023 = 'load',
  TRILLER_2023 = 'triller',
  BRAT_1_2 = 'brat-1-2',
  CRIME_RUSSIA = 'crime-russia'
}
export enum ELoadStatus {
  INACTIVE = 'inactive',
  STARTED = 'loading...',
  ERRORED = 'load error',
  LOADED = 'loaded'
}
