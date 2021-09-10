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
  ...tw`absolute w-full h-full rounded-[5px] p-[20px]`,
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
  },
  showAnim && blinkStyle,
]);

const Image = styled.img([tw`w-[200px]`]);
const Title = styled.div([
  tw`flex justify-between w-full items-baseline`,
  {
    "& > span:first-of-type": tw`font-black max-w-[120px]`,
    "& > span:last-of-type": tw`font-semibold text-green`,
  },
]);

export default function Card({
  id,
  battlegrounds,
  name,
  hidden,
  editMode,
  showAnim,
  onClick,
}: CardInterface) {
  const [isFront, handleFront] = useState(true);
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
            <span>{id}</span>
          </Title>
        </Front>
        <Back showAnim={showAnim}>
          <span>{name}</span>
        </Back>
      </Body>
    </Wrap>
  );
}
