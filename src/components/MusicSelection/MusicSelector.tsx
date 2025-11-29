import { toast } from "sonner";
import MusicPlayer, { ISong } from "./MusicPlayer";

const SONGS = [
  {
    id: "song_main",
    name: "Señorita - Shawn Mendes, Camila Cabello - Cover (fingerstyle guitar) Andrew Foy",
    src: "/audio/musics/main.mp3",
    playTime: 0,
  },
  {
    id: "song_havana",
    name: "Camila Cabello - Havana - Cover (Fingerstyle Guitar)",
    src: "/audio/musics/havana.mp3",
    playTime: 22,
  },
  {
    id: "song_shape_of_u",
    name: "Shape of You - Ed Sheeran - Fingerstyle Guitar Cover",
    src: "/audio/musics/shape_of_u.mp3",
    playTime: 10,
  },
  {
    id: "song_attention",
    name: "(Charlie Puth) Attention - Josephine Alexandra | Fingerstyle Guitar Cover",
    src: "/audio/musics/attention.mp3",
    playTime: 10,
  },
  {
    id: "song_pasoori",
    name: "Pasoori Fingerstyle Guitar Cover",
    src: "/audio/musics/pasoori.mp3",
    playTime: 4.5,
  },

  {
    id: "song_until_i_found_u",
    name: "Until I Found You - Stephen Sanchez - Fingerstyle Guitar Cover",
    src: "/audio/musics/until_i_found_u.mp3",
    playTime: 0,
  },
];
const MusicSelector = ({
  onComplete,
}: {
  onComplete: (song: ISong) => void;
}) => {
  const handleContinue = (id: string) => {
    const selectedSong = SONGS.find((song) => song.id === id);

    if (!selectedSong) {
      toast.error("Song not found.", {
        description: "Please try again with another song.",
      });
      return;
    }

    onComplete(selectedSong);
  };
  return (
    <div className="max-h-dvh h-full flex items-center justify-center p-4 relative overflow-x-hidden overflow-y-auto bg-[url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsb2ZmaWNlOV9zaW1wbGlmaWVkX3Jvc2VfYnV0dGVyZmxpZXNfYW5kX2Nsb3VkX3dhbGxwYXBlcl9kMGUxYWFlMC1jNmRmLTRkNmQtOWYyMy1hYzYxYTk5ODAwNWFfMS5qcGc.jpg')] bg-no-repeat bg-cover">
      {/* Musical notes decoration */}
      <div className="absolute top-20 right-1/4 text-4xl animate-bounce-gentle">
        ♪
      </div>
      <div
        className="absolute bottom-1/3 left-10 text-5xl animate-bounce-gentle"
        style={{ animationDelay: "0.3s" }}
      >
        ♫
      </div>

      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-2">
            Pick Your Vibe
          </h1>
          <p className="text-gray-600 text-md">
            Choose the soundtrack for your special day
          </p>
        </div>

        <MusicPlayer onContinue={handleContinue} songs={SONGS} />
      </div>
    </div>
  );
};

export default MusicSelector;
