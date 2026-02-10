import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { streamText } from 'ai'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'ai-proxy',
      configureServer(server) {
        server.middlewares.use('/api/ai/generate', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end('Method Not Allowed')
            return
          }
          try {
            let body = ''
            await new Promise<void>((resolve, reject) => {
              req.on('data', (chunk) => { body += chunk })
              req.on('end', () => resolve())
              req.on('error', (err) => reject(err))
            })
            const { prompt } = JSON.parse(body || '{}')
            const { model } = JSON.parse(body || '{}')
            if (!prompt || typeof prompt !== 'string') {
              res.statusCode = 400
              res.end('Bad Request: prompt is required')
              return
            }

            const openrouter = createOpenRouter({
              apiKey: process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY
            })
            const result = await streamText({
              model: openrouter(model || 'meta-llama/llama-3.1-8b-instruct'),
              messages: [
                { role: 'system', content: 'Eres un experto mixólogo. Genera recetas de bebidas claras y concisas en español con formato: Título, Ingredientes (lista con cantidades), Instrucciones (pasos numerados), Tips opcionales. No incluyas texto adicional.' },
                { role: 'user', content: prompt }
              ]
            })

            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.setHeader('Cache-Control', 'no-cache')
            for await (const chunk of result.textStream as AsyncIterable<string>) {
              res.write(chunk)
            }
            res.end()
          } catch {
            res.statusCode = 500
            res.end('Internal Server Error')
          }
        })
      }
    }
  ],
})
