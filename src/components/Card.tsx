import tw, { styled } from "twin.macro";
import { CardInterface } from "../types/interfaces";

const Wrap = styled.div(
  ({
    hidden,
    editMode,
    showAnim,
  }: {
    hidden?: boolean;
    editMode: boolean;
    showAnim?: boolean;
  }) => [
    tw`flex flex-col justify-center w-full items-center w-[240px] mx-auto p-[20px] bg-darkgray rounded-[8px] overflow-hidden relative`,
    hidden && tw`hidden`,
    editMode && tw`cursor-pointer`,
    showAnim && {
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
    },
  ]
);
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
  return (
    <Wrap
      hidden={hidden}
      editMode={editMode}
      showAnim={showAnim}
      onClick={onClick}
    >
      <Image src={battlegrounds.image} />
      <Title>
        <span>{name}</span>
        <span>{id}</span>
      </Title>
    </Wrap>
  );
}
