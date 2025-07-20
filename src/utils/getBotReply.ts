export async function getBotReply(message: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma:2b',          // Local LLM via Ollama
        prompt: message,            // User's input
        stream: false,              // Non-streamed response
        options: {
          num_predict: 100        // 🔹 Limit output length for speed
        }
      })
    });

    const data = await response.json();

    const rawReply = data.response || '';

    // ✂️ Trim to first paragraph and max 300 chars
    const trimmedReply = rawReply.split('\n\n')[0].slice(0, 300);

    return trimmedReply || '⚠️ No reply from SortBot.';
  } catch (err) {
    console.error('Gemma error:', err);
    return '⚠️ SortBot couldn’t connect to local model.';
  }
}