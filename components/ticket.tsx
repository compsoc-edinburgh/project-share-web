import Image from "next/image";

export function Ticket() {
  return (
    <div
      className="bg-main h-70 w-152 px-10 py-5 flex flex-col"
      id="project_card"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% 40px, calc(100% - 20px) 60px, calc(100% - 20px) calc(100% - 60px), 100% calc(100% - 40px), 100% 100%, 0 100%, 0 calc(100% - 40px), 20px calc(100% - 60px), 20px 60px, 0 40px)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="pb-2 border-b-2 border-white">
          <div className="text-4xl uppercase font-departure text-white">
            Project share
          </div>
          <div className="text-lg uppercase font-departure text-white">
            discord_ticket
          </div>
        </div>
        <Image
          src="/logo-white.svg"
          alt="Project Share Logo"
          className="pr-5 border-white"
          width={104}
          height={104}
        />
      </div>
      <div className="uppercase font-departure my-1 text-sm py-0.5 pb-2 border-b-2 border-white border-dashed text-white">
        Making software together
      </div>
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="text-white uppercase font-departure text-xl font-bold">
          --- Free Snacks ---
        </div>
        <div className="text-white uppercase font-departure text-sm pt-2">
          Learn. Build. Share
        </div>
      </div>
      <div>
        <div className="uppercase fontfont-departure text-md mt-2 pt-2 border-t-2 border-white text-white">
          <span className="font-bold text-white">NEXT_SESSION:</span> 18/1/2026
          @ AT_2.06
        </div>
      </div>
    </div>
  );
}
