function History({ prompts }) {
  if (prompts.length === 0) return null;

  return (
    <div className="mt-6 bg-gray-700 p-4 rounded-lg shadow max-h-40 overflow-y-auto">
      <h2 className="text-md font-bold text-indigo-300 mb-2">Prompt History</h2>
      <ul className="text-sm space-y-1 text-gray-200 list-disc list-inside">
        {prompts.map((prompt, index) => (
          <li key={index}>{prompt}</li>
        ))}
      </ul>
    </div>
  );
}

export default History;
