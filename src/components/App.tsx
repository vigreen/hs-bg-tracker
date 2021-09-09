import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import { useClient } from "../request/client";
import { exampleUri, bgLocalUri, statusLocalUri } from "../helpers/api";
import {
  BlizData,
  BGWinRateData,
  BodyInterface,
  StatusBody,
  StatusInfo,
} from "../types/interfaces";
import { AxiosResponse } from "axios";
import Body from "./Body";

const Main = styled.main([
  tw`bg-[#22272E] w-full text-white overflow-x-hidden overflow-y-hidden h-screen min-h-screen`,
]);

function App() {
  const { init, api } = useClient();
  const [response, handleResponse] = useState<BodyInterface>();
  const [status, handleStatus] = useState<StatusInfo>({});

  useEffect(() => {
    if (!response && init && api) {
      const load = async () => {
        const [{ data }, wr, statusInfo]: [
          AxiosResponse<BlizData>,
          BGWinRateData,
          StatusBody[]
        ] = await Promise.all([
          api.get(exampleUri),
          await (await fetch(bgLocalUri)).json(),
          await (await fetch(statusLocalUri)).json(),
        ]);

        handleResponse({
          heroes: data.cards,
          wr,
        });

        handleStatus(
          statusInfo.reduce(
            (acc, { hero_id, victory }) => ({ ...acc, [hero_id]: victory }),
            {} as StatusInfo
          )
        );
      };

      load();
    }
  }, [response, init, api]);

  return (
    <Main id="app">
      {response && (
        <Body {...response} status={status} handleStatus={handleStatus} />
      )}
    </Main>
  );
}

export default App;
