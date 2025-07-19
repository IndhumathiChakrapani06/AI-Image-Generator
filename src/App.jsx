import { useState } from "react";
import PromptForm from "./Components/PromptForm";
import ImageDisplay from "./Components/ImageDisplay";
import History from "./Components/History";

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchImage = async (prompt) => {
    const encoded = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encoded}`;
    try {
      setLoading(true);
      setError("");
      const img = new Image();
      img.onload = () => {
        setImageUrl(url);
        setHistory((prev) => [prompt, ...prev]);
        setLoading(false);
      };
      img.onerror = () => {
        setError("Failed to generate image.");
        setLoading(false);
      };
      img.src = url;
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "ai-image.png";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gray-800 shadow-2xl rounded-2xl p-6">
        <h1 className="text-4xl font-bold text-indigo-400 text-center mb-6">
           AI Image Generator
        </h1>

        <PromptForm onGenerate={fetchImage} />

        {loading && (
          <p className="text-indigo-300 text-center animate-pulse mb-4">
            Generating image...
          </p>
        )}

        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}

        <ImageDisplay imageUrl={imageUrl} onDownload={handleDownload} />

        <History prompts={history} />
      </div>

      <p className="text-sm text-gray-400 mt-6">
        Built with ❤️ using Pollinations.ai
      </p>
    </div>
  );
}

export default App;


