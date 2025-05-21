import Tile from "@/components/ui";

export default function Home() {
  return (
    <div className="grid w-screen h-screen grid-cols-4 grid-rows-3 gap-2 p-4 bg-white text-3xl">
      <Tile className="bg-[var(--project-share-leaderboard)] col-start-1 col-span-2 row-start-1 rounded-tl-2xl text-3xl">
        Leaderboard
      </Tile>
      <Tile className="bg-[var(--comp-soc-primary)] col-start-3 col-span-2 row-start-1 rounded-tr-2xl text-3xl">
        Partnered by comp-soc
      </Tile>
      <Tile className="bg-[var(--project-share-primary)] col-start-1 row-start-2 row-span-2 rounded-bl-2xl text-4xl">
        Project share
      </Tile>
      <Tile className="bg-[var(--project-share-project)] col-start-2 row-start-2 col-span-2 text-3xl">
        Projects
      </Tile>
      <Tile className="bg-[var(--project-share-team)] col-start-2 row-start-3 col-span-3 rounded-br-2xl text-3xl">
        Team
      </Tile>
      <Tile className="bg-[var(--project-share-news)] col-start-4 row-start-2 text-3xl">
        News
      </Tile>
    </div>
  );
}
