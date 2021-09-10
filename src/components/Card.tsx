import { MouseEventHandler, useState } from "react";
import tw, { styled } from "twin.macro";
import { CSSObject } from "@emotion/react";
import { CardInterface } from "../types/interfaces";

const Wrap = styled.div(
  ({ hidden, isFront }: { hidden?: boolean; isFront: boolean }) => [
    tw`w-[240px] h-[385px] mx-auto`,
    {
      perspective: 1000,
    },
    !isFront && {
      "& > div": {
        transform: "rotateY(180deg)",
      },
    },
    hidden && tw`hidden`,
  ]
);

const Body = styled.div(({ editMode }: { editMode: boolean }) => [
  tw`flex flex-col w-full h-full items-center mx-auto bg-darkgray rounded-[8px] relative`,
  {
    transition: "transform 0.6s",
    transformStyle: "preserve-3d",
  },
  editMode && tw`cursor-pointer`,
]);
const blinkStyle: CSSObject = {
  overflow: "hidden",
  "&::after": {
    animation: "shine 4s ease-in-out  infinite",
    animationFillMode: "forwards",
    content: "''",
    position: "absolute",
    top: "-110%",
    left: "-210%",
    width: "200%",
    height: "200%",
    opacity: 0,
    transform: "rotate(30deg)",
    background: `linear-gradient(
    to right, 
    rgba(255, 255, 255, 0.13) 0%,
    rgba(255, 255, 255, 0.13) 77%,
    rgba(255, 255, 255, 0.3) 92%,
    rgba(255, 255, 255, 0.0) 100%
  )`,
  },
};
const sideStyle: CSSObject = {
  ...tw`absolute w-full h-full rounded-[5px] p-[20px] overflow-hidden`,
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
};
const Front = styled.div(({ showAnim }: { showAnim?: boolean }) => [
  sideStyle,
  {
    transform: "rotateY(0deg)",
  },
  showAnim && blinkStyle,
]);
const Back = styled.div(({ showAnim }: { showAnim?: boolean }) => [
  sideStyle,
  {
    transform: "rotateY(180deg)",
    "& > h2": tw`mt-0 mb-[10px] p-0 text-center text-white`,
    "& > h3": tw`bg-[#121519] text-white text-[18px] font-bold mt-0 my-[0px] p-0 text-center py-[5px] px-[10px] ml-auto absolute bottom-0 left-0 w-full`,
    backgroundColor: "#00000055",
  },
]);

const Image = styled.img([tw`w-[200px]`]);
const BGImage = styled.div([
  tw`absolute left-0 top-0 w-full h-full bg-no-repeat bg-center z-[-1] opacity-10`,
  {
    backgroundSize: "200%",
  },
]);
const Title = styled.div([
  tw`flex justify-between w-full items-baseline`,
  {
    "& > span:first-of-type": tw`font-black max-w-[120px]`,
    "& > span:last-of-type": tw`font-semibold text-green`,
  },
]);
const Chart = styled.div([
  tw`w-[100px] h-[30px] grid grid-cols-8 gap-x-[5px] bg-[#121519] p-[3px] rounded-[5px]`,
  {
    "& > div": tw`w-[6px] bg-red mx-auto mt-auto`,
  },
]);
const Passive = styled.div([
  {
    "& > *": tw`mr-[0.25rem]`,
    "& > b": tw`mr-0`,
  },
]);
const BTWN = styled.div([tw`flex justify-between items-center mb-[10px]`]);

export default function Card({
  id,
  battlegrounds,
  name,
  hidden,
  editMode,
  showAnim,
  onClick,
  stat,
  info,
  power,
}: CardInterface) {
  const [isFront, handleFront] = useState(true);
  const { avg_final_placement, final_placement_distribution } = stat;
  const highPlace = Math.max(...final_placement_distribution);
  const clickFn: MouseEventHandler = () => {
    if (!editMode) handleFront(!isFront);
    onClick();
  };
  return (
    <Wrap hidden={hidden} isFront={isFront} onClick={clickFn}>
      <Body editMode={editMode}>
        <Front showAnim={showAnim}>
          <Image src={battlegrounds.image} />
          <Title>
            <span>{name}</span>
            <span>{avg_final_placement.toFixed(2)}</span>
          </Title>
        </Front>
        <Back showAnim={showAnim}>
          <h3>{id}</h3>
          <h2>{name}</h2>
          <BTWN>
            <Chart>
              {final_placement_distribution.map((v, i) => (
                <div
                  data-for="custom-tooltip"
                  data-tip={`Top ${i + 1} - ${v}%`}
                  style={{ height: (80 * v) / highPlace + "%" }}
                  key={i}
                />
              ))}
            </Chart>
            <strong>AVG: {avg_final_placement.toFixed(2)}</strong>
          </BTWN>
          <Passive
            dangerouslySetInnerHTML={{
              __html: `${power?.text?.replace(/\[x\]|/g, "")}`,
            }}
          />
          <BGImage
            style={{
              backgroundImage: `url("${info.images[info.images?.length - 1]}")`,
            }}
          />
        </Back>
      </Body>
    </Wrap>
  );
}
