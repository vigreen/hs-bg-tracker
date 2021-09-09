/// <reference types="react-scripts" />

import { RegionString, LocaleString, NodeEnvString } from "./types/types";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NodeEnvString,
      PUBLIC_URL: string,
      REACT_APP_REGION: RegionString,
      REACT_APP_LOCALE: LocaleString,
      REACT_APP_CLIENT_ID: string,
      REACT_APP_SECRET: string
    }
  }  
}