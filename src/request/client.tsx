import { createContext, useContext, useState, useEffect } from "react";
import {
  TokenRequestData,
  WithChildren,
  ClientContextInt,
} from "../types/interfaces";
import { tokenUri, baseUrl } from "../helpers/api";
import axios from "axios";
import { ApiType } from "../types/types";

export const ClientContext = createContext<ClientContextInt>({
  init: false,
});

export const useClient = () => useContext(ClientContext);

export const getAccessToken = async () => {
  const token = `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_SECRET}`;

  return axios
    .post(tokenUri, "grant_type=client_credentials", {
      headers: {
        Authorization: `Basic ${Buffer.from(String(token)).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => ({ data: res.data as TokenRequestData, err: null }))
    .catch((err) => ({ err: err, data: {} as TokenRequestData }));
};

export const ClientWrapper = ({ children }: WithChildren) => {
  const [token, setAccessToken] = useState<string>();

  const setToken = async () => {
    const {
      data: { access_token },
      err,
    } = await getAccessToken();

    if (err) throw new Error(err.message);

    setAccessToken(access_token);
  };

  useEffect(() => {
    if (!token) {
      setToken();
    }
  }, [token]);

  const init = typeof token === "string";

  const createApi = () => {
    let api: ApiType;

    if (init) {
      api = axios.create({
        headers: {
          Authorization: "Bearer " + token,
        },
        baseURL: baseUrl,
      });
    }

    return {
      api,
      init,
    };
  };

  return (
    <ClientContext.Provider value={createApi()}>
      {!init ? "" : children}
    </ClientContext.Provider>
  );
};
