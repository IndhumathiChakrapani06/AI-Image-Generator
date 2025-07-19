function ImageDisplay({ imageUrl, onDownload }) {
  if (!imageUrl) return null;

  const handleDownload = () => {
    fetch(imageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "ai-image.png"; // ⬅️ name of the file
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        alert("Failed to download image.");
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <img
        src={imageUrl}
        alt="Generated"
        className="rounded-lg shadow-lg max-w-full h-auto"
      />
      <button
        onClick={handleDownload}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Download Image
      </button>
    </div>
  );
}

export default ImageDisplay;
