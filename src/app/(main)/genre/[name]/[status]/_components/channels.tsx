import Link from "next/link";

const Channels: React.FC<{
  title: "Genres" | "Status";
  channels: string[];
  currentGenre: string;
  currentStatus: number;
}> = ({ title, channels, currentGenre, currentStatus }) => {
  return (
    <div className="my-2.5 ml-5 w-full max-w-[1200px] overflow-hidden whitespace-nowrap md:mx-auto md:mb-[35px]">
      <div className="flex items-center justify-between overflow-hidden md:items-start">
        <div className="my-[5px] w-[50px] py-[5px] text-sm text-[var(--app-text-color-stone-gray)] md:mr-[50px] md:w-[80px] md:text-lg">
          <span>{title}</span>
        </div>

        <div className="hide-scrollbar flex w-[85%] max-w-[1060px] overflow-auto md:w-full md:flex-wrap">
          {channels.map((channel, index) => (
            <Link
              key={channel}
              href={
                title === "Genres"
                  ? `/genre/${channel}/${currentStatus}`
                  : `/genre/${currentGenre}/${index}`
              }
              className="last:mr-[10%]"
            >
              <div
                data-active={
                  title === "Genres"
                    ? channel === currentGenre
                    : channel === channels[currentStatus]
                }
                className="m-[5px] py-[5px] text-sm capitalize data-[active=true]:rounded-xl data-[active=true]:bg-[var(--app-text-color-red)] data-[active=true]:px-2.5 data-[active=true]:text-white md:m-[5px_20px_5px_0] md:text-base data-[active=true]:md:rounded-2xl data-[active=true]:md:px-5"
              >
                <span>{channel}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Channels;
