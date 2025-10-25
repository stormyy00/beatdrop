import AudioTrimmer from "./drop";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Dropform = ({ onDone }: { onDone: () => void }) => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-xl mx-auto px-4">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Create a Drop 🎶</h2>
        <p className="text-sm text-gray-500">
          Trim your audio, add a caption, and share your vibe.
        </p>
      </div>
      <AudioTrimmer />
      <div className="w-full space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Caption <span className="text-gray-400">(optional)</span>
        </label>
        <Input
          placeholder="Describe the vibe..."
          className="w-full border-gray-200 focus-visible:ring-photo-green-300"
        />
      </div>

      <Button
        onClick={onDone}
        className="w-full  text-white cursor-pointer font-medium py-2.5 rounded-lg transition"
      >
        Post Drop 
      </Button>
    </div>
  );
};

export default Dropform;
