import tw, { styled } from "twin.macro";

const Button = styled.button(({ checked }: { checked?: boolean }) => [
  tw`border-none cursor-pointer focus:outline-none transition-all duration-150 ease-in bg-[#3E4446] relative`,
  tw`h-[24px] min-w-[58px] p-0 rounded-[20px] overflow-hidden`,
  {
    "& > .active": {
      ...tw`bg-green transition-all duration-200 ease-in w-full h-full p-0 m-0 absolute top-0 left-0 flex items-center justify-center rounded-[20px] text-white text-left font-bold`,
      transform: "translateX(-100%)",
      fontSize: 12,
      "& > span": tw`w-full ml-[8px]`,
    },
    "& > .circle-zone": {
      ...tw`px-[6px] w-full h-full relative flex items-center absolute left-0 top-0`,
      "& > div": {
        ...tw`h-[16px] w-[16px] rounded-full bg-[#121519] absolute left-[6px] transition-all duration-200 ease-in delay-[100ms]`,
      },
    },
  },
  checked && {
    "& > .active": {
      transform: "translateX(0px)",
      ...tw`delay-[100ms]`,
    },
    "& > .circle-zone > div": {
      left: "calc(100% - 16px - 6px)",
      ...tw`delay-[0ms]`,
    },
  },
]);

export default function Switch({
  checked,
  handleChecked,
}: {
  checked: boolean;
  handleChecked: Function;
}) {
  return (
    <Button checked={checked} onClick={() => handleChecked(!checked)}>
      <div className="active">
        <span>Edit</span>
      </div>
      <div className="circle-zone">
        <div />
      </div>
    </Button>
  );
}
