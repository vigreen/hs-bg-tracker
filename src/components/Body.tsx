import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import { BodyStatusInterface, StatusInfo } from "../types/interfaces";
import { useLoading } from "../helpers/loadingContext";
import Card from "./Card";
import { FilterType } from "../types/types";
import Switch from "./Inputs/Switch";
import Loader from "./Loader";
import { statusLocalUri } from "../helpers/api";

const buttons: FilterType[] = ["winners", "others", "all"];
const title = {
  winners: "Winners",
  others: "Left",
  all: "All heroes",
};
const sizes = tw`w-[40px] h-[40px] p-0`;

const BodyWrap = styled.div([tw`w-full h-full overflow-hidden`]);
const ScrollWrap = styled.div([
  tw`my-[10px] overflow-y-scroll h-[calc(100vh - 92px)] relative mr-[3px] py-[10px]`,
]);
const HeroesGrid = styled.div([
  tw`w-[1200px] mx-auto grid grid-cols-4 gap-y-[30px] transition-all duration-150 ease-in`,
]);
const Header = styled.div([tw`w-full h-[72px] bg-[#121519] items-center flex`]);
const HeaderContent = styled.div(
  tw`flex justify-between items-center mx-auto w-[1200px]`
);
const TitleBlock = styled.div([
  tw`flex items-center h-full`,
  {
    "& > button:first-of-type": tw`mr-[15px]`,
  },
]);
const ButtonsBlock = styled.div([
  tw`grid grid-cols-3 w-[150px] h-full items-center ml-auto`,
]);
const Button = styled.button(({ isActive }: { isActive?: boolean }) => [
  sizes,
  tw`border-none rounded-[5px] cursor-pointer focus:outline-none transition-all duration-150 ease-in bg-mediumgray`,
  {
    "& > img": { ...tw`w-5/6 h-5/6`, filter: "invert(0.9)" },
  },
  isActive && tw`bg-green`,
]);

const showCard = (id: number, filter: FilterType, status: StatusInfo) => {
  switch (filter) {
    case "winners":
      return status[id] === true;

    case "others":
      return status[id] !== true;

    default:
      return true;
  }
};

export default function Body({
  heroes,
  wr,
  status,
  handleStatus,
}: BodyStatusInterface) {
  const { loading, handleLoading } = useLoading();
  const [checked, handleChecked] = useState(false);
  const [filter, handleFilter] = useState<FilterType>("others");

  useEffect(() => {
    if (loading) {
      handleLoading(false);
    }
  }, [loading]);
  console.log("wr: ", wr, heroes, status);

  const cards = heroes.map((props, i) => {
    const show = showCard(props.id, filter, status);
    const onClick = () => {
      if (!checked) return false;
      handleLoading(true);

      fetch(statusLocalUri, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          hero_id: props.id,
          victory: filter === "winners" ? false : true,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          const newStatus = { ...status };
          if (filter === "winners") {
            delete newStatus[props.id];
          } else {
            newStatus[props.id] = true;
          }
          handleStatus(newStatus);
          handleLoading(false);
        })
        .catch((err) => {
          console.error("error: ", err.message);
          handleLoading(false);
        });
    };
    return (
      <Card
        key={props.id}
        {...props}
        hidden={!show}
        editMode={checked}
        showAnim={i % 3 === 1}
        onClick={onClick}
      />
    );
  });

  return (
    <BodyWrap>
      <Header>
        <HeaderContent>
          <TitleBlock>
            <Switch checked={checked} handleChecked={handleChecked} />
          </TitleBlock>
          <h1>
            {title[filter]} (
            {heroes.filter(({ id }) => showCard(id, filter, status)).length}{" "}
            hero)
          </h1>
          <ButtonsBlock>
            {buttons.map((type) => (
              <Button
                key={type}
                onClick={() => handleFilter(type)}
                isActive={type === filter}
              >
                <img
                  src={require(`../assets/svg/${type}.svg?inline`).default}
                />
              </Button>
            ))}
          </ButtonsBlock>
        </HeaderContent>
      </Header>
      <ScrollWrap>
        {loading && (
          <div>
            <Loader />
          </div>
        )}
        <HeroesGrid>{cards}</HeroesGrid>
      </ScrollWrap>
    </BodyWrap>
  );
}
