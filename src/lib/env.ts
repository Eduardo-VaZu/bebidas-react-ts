const openRouterApiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
if (!openRouterApiKey) {
    console.error('Falta VITE_OPENROUTER_API_KEY en .env.local');
}

const openRouterModel = import.meta.env.VITE_OPENROUTER_MODEL ?? 'openai/gpt-oss-120b:free';

export const env = {
    openRouterApiKey,
    openRouterModel,
}