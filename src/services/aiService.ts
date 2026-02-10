export const generateRecipe = async (payload: string, model?: string) => {
  const res = await fetch('/api/ai/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: payload, model }),
  });

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();

  async function* stream() {
    if (!reader) return;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield decoder.decode(value);
    }
  }

  return stream();
}
