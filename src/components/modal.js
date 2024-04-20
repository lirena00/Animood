import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function Modal({ anime }) {
  const [current, setCurrent] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();
  const id = anime.id;

  const handleStatusChange = async () => {
    if (session) {
      // Check if there's a session and current is false
      try {
        const query = `
          query Q{
            Media(id:${id}) {
              mediaListEntry {
                status
              }
            }
          }`;
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.token}`,
          },
          body: JSON.stringify({
            query: query,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (data.data.Media.mediaListEntry) {
          setCurrent(true);
          return; // Exit early if current is true
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (current === true) return;
    const status = "PLANNING";
    try {
      const response = await fetch("https://graphql.anilist.co/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify({
          query: `
            mutation UpdateProgress($animeId: Int!, $status: MediaListStatus) {
              SaveMediaListEntry(mediaId: $animeId,status: $status) {
                id
                status
              }
            }
          `,
          variables: {
            animeId: id,
            status: status,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update progress");
      }

      const { data } = await response.json();
      setSuccess(true);

      if (data.SaveMediaListEntry === null) {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" lg:flex  bg-secondary/70 backdrop-blur-xl rounded-lg shadow-lg p-4  border-t-2 border-action">
      <div className="relative w-full h-[120px] lg:w-[200px] lg:h-[308px]   aspect-[2/3]">
        <Image
          src={anime.coverImage.extraLarge}
          alt="image"
          height={500}
          width={500}
          className="object-cover w-full h-full rounded-lg md:rounded-l-lg md:rounded-tr-none"
        />
      </div>
      <div className="p-2 text-sm  space-y-2 text-white relative">
        <span className="text-lg md:text-xl leading-6 font-semibold z-30 text-white">
          {anime.title.userPreferred}
        </span>

        <div className="flex space-x-2 text-xs">
          <div className="px-2 py-1 bg-white/20 rounded">{anime.format}</div>
          <div className="px-2 py-1 bg-white/20 rounded">
            {anime.duration} Min/Ep
          </div>
          <div className="px-2 py-1 bg-white/20 rounded">
            {anime.meanScore}%
          </div>
          <div className="px-2 py-1 bg-white/20 rounded">
            {anime.episodes} Episodes
          </div>
        </div>

        <div className="hidden lg:flex flex-wrap items-center gap-2 w-fit md:flex">
          {anime.genres.slice(0, 3).map((genre) => (
            <div
              key={genre}
              className="flex items-center px-2 py-1 rounded  text-xs bg-black/30 backdrop-blur-md text-white border border-action"
            >
              <span className="text-center">{genre}</span>
            </div>
          ))}
        </div>

        <div>
          {anime.externalLinks && (
            <div className="flex space-x-2 text-xs">
              {anime.externalLinks
                .filter(
                  (link) => link.icon !== null && link.type === "STREAMING"
                )
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: link.color }}
                    className="flex items-center p-1.5 rounded  "
                  >
                    <Image
                      width={15}
                      height={15}
                      src={link.icon}
                      alt={link.icon}
                      className=""
                    />
                  </a>
                ))}
            </div>
          )}
        </div>

        <div
          className="max-h-72 overflow-y-auto -mr-5"
          dangerouslySetInnerHTML={{ __html: anime.description }}
        />

        <div className="text-xl absolute top-0 right-0">
          {success ? (
            <button
              className={`outline-none text-action`}
              onClick={handleStatusChange}
              disabled
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162z"
                ></path>
              </svg>
            </button>
          ) : (
            <button
              className={`outline-none text-white"`}
              onClick={handleStatusChange}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 16.923l-3.738 1.608q-.808.348-1.535-.134T6 17.052V5.615q0-.69.463-1.152T7.615 4h8.77q.69 0 1.152.463T18 5.615v11.437q0 .863-.727 1.345t-1.535.134zm0-1.123l4.135 1.785q.307.134.586-.058t.279-.52V5.616q0-.23-.192-.423T16.385 5h-8.77q-.23 0-.423.192T7 5.615v11.393q0 .327.279.519t.586.058zM12 5H7h10z"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
