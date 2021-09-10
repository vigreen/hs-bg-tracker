import { MouseEventHandler } from "react";
import { TokenType, ApiType } from "./types";

export interface ExampleInt<T> {
  [key: string]: T;
}

export interface WithChildren {
  children: JSX.Element | JSX.Element[] | string;
}

export interface TokenRequestData {
  access_token: string;
  token_type: TokenType;
  expires_in: number;
  sub: string;
}

export interface ClientContextInt {
  api?: ApiType;
  init: boolean;
}

export interface BGData {
  hero: boolean; //true,
  image: string; //"https://d15f34w2p8l1cc.cloudfront.net/hearthstone/936681665a49f4a66712e61c847e1d176df59564e97ec094cf321cafa4f129b5.png",
  imageGold: string; //"https://d15f34w2p8l1cc.cloudfront.net/hearthstone/c311df22d12f7de7ec09ec90044521b3a96b92ec318e2425f1dc732fa1867736.png"
}

export interface HeroData {
  id: number; //57944
  collectible: number; // 0
  slug: string; //"57944-a-f-kay",
  classId: number; //12,
  multiClassIds?: []; //[]
  cardTypeId: number; //3
  cardSetId: 1453;
  rarityId?: null;
  artistName?: null;
  health: number; //40,
  manaCost: number; //0,
  name: string; //"А. Ф. Ка",
  text: string; //"",
  image: string; //"https://d15f34w2p8l1cc.cloudfront.net/hearthstone/cf8cc60627d31233c1a456f74858de97ca1d1d3baa8360e6f20267f0bc07aedf.png",
  imageGold: string; //"https://d15f34w2p8l1cc.cloudfront.net/hearthstone/b5bf48e7b70d42f2e04a2ea4b91815abb44b6e2efb9b9ba2aeef9a7000205e84.png",
  flavorText: string; //"",
  cropImage: string; //"https://d15f34w2p8l1cc.cloudfront.net/hearthstone/8a60b28b4a9bb70748ce68815582bbde7a0c2ebfdf70988adb51da88c5d655fc.png",
  childIds: number[]; // [59891],
  battlegrounds: BGData;
}

export interface BlizData {
  cardCount: number;
  cards: HeroData[];
  page: number;
  pageCount: number;
}

export interface BodyInterface {
  heroes: HeroData[];
  wr: BGWinRateData;
}

export interface BodyStatusInterface {
  heroes: HeroData[];
  wr: BGWinRateData;
  status: StatusInfo;
  handleStatus: Function;
}

export interface StatusInfo {
  [hero: string]: boolean;
}

export interface StatusBody {
  hero_id: number;
  victory: boolean;
}

export interface WinRateObject {
  hero_dbf_id: number; //57633,
  num_games_played: number; //6004,
  pick_rate: number; //3.47,
  popularity: number; //0.23,
  times_offered: number; //171329,
  times_chosen: number; //6004,
  avg_final_placement: number; //5.1426,
  final_placement_distribution: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  confidence_interval: number; // 0.07
}

export interface BGWinRateData {
  [id: number]: WinRateObject;
}

export interface LoadingContextInt {
  loading: boolean;
  handleLoading: Function;
}

export interface CardInterface extends HeroData {
  hidden?: boolean;
  showAnim?: boolean;
  editMode: boolean;
  onClick: Function;
}
