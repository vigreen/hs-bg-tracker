import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import { useClient } from "../request/client";
import {
  exampleUri,
  bgLocalUri,
  statusLocalUri,
  jsonUri,
  getImageUri,
} from "../helpers/api";
import {
  BlizData,
  BGWinRateData,
  BodyInterface,
  StatusBody,
  StatusInfo,
  InfoJSON,
  InfoObject,
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
        const [{ data }, wr, statusInfo, info]: [
          AxiosResponse<BlizData>,
          BGWinRateData,
          StatusBody[],
          InfoJSON[]
        ] = await Promise.all([
          api.get(exampleUri),
          await (await fetch(bgLocalUri)).json(),
          await (await fetch(statusLocalUri)).json(),
          await (await fetch(jsonUri)).json(),
        ]);

        handleResponse({
          heroes: data.cards.sort(
            (a, b) =>
              wr[a.id].avg_final_placement - wr[b.id].avg_final_placement
          ),
          wr,
          info: info
            .filter(
              ({ set, type }) =>
                set === "BATTLEGROUNDS" &&
                (type === "HERO" || type === "HERO_POWER")
            )
            .reduce((acc, obj) => {
              if (obj.type === "HERO") {
                let id: number;
                if (typeof obj.battlegroundsSkinParentId === "number") {
                  id = obj.battlegroundsSkinParentId;
                } else {
                  id = obj.dbfId;
                }

                if (!acc[id]) acc[id] = obj;
                if (!acc[id].images) {
                  acc[id].images = [getImageUri(obj.id)];
                } else {
                  acc[id].images?.push(getImageUri(obj.id));
                }
              } else {
                const id = obj.dbfId;
                if (!acc[id]) acc[id] = obj;
                acc[id].images = [getImageUri(obj.id)];
              }
              return acc;
            }, {} as InfoObject),
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
