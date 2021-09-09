export const baseUrl = `https://${process.env.REACT_APP_REGION}.api.blizzard.com/hearthstone`;

export const exampleUri = `/cards?locale=${process.env.REACT_APP_LOCALE}&gameMode=battlegrounds&tier=hero&pageSize=100`;
export const authUri = `https://${process.env.REACT_APP_REGION}.battle.net/oauth/authorize`;
export const tokenUri = `https://${process.env.REACT_APP_REGION}.battle.net/oauth/token`;
export const userInfoUri = `https://${process.env.REACT_APP_REGION}.battle.net/oauth/userinfo`;

export const ApiUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "/api";

export const bgLocalUri = `${ApiUrl}/winrate`;
export const statusLocalUri = `${ApiUrl}/status`;
