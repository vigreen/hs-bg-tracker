import { AxiosInstance } from "axios";

export type WithCode = {
  [code: string]: boolean;
};

export type LocaleString =
  | "en_US"
  | "es_MX"
  | "pt_BR"
  | "en_GB"
  | "es_ES"
  | "fr_FR"
  | "ru_RU"
  | "de_DE"
  | "pt_PT"
  | "it_IT"
  | "ko_KR"
  | "zh_TW"
  | "zh_CN";

export type RegionString = "CN" | "US" | "EU" | "KR" | "TW";

export type NodeEnvString = "development" | "production" | "test";

export type TokenType = "bearer" | "basis";

export type FilterType = "winners" | "all" | "others";

export type ApiType = AxiosInstance | undefined;
