import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    if (env.DEEPSEEK_API_KEY && !process.env.DEEPSEEK_API_KEY) {
      process.env.DEEPSEEK_API_KEY = env.DEEPSEEK_API_KEY;
    }
    if (env.DEEPSEEK_MODEL && !process.env.DEEPSEEK_MODEL) {
      process.env.DEEPSEEK_MODEL = env.DEEPSEEK_MODEL;
    }
    if (env.DEEPSEEK_BASE_URL && !process.env.DEEPSEEK_BASE_URL) {
      process.env.DEEPSEEK_BASE_URL = env.DEEPSEEK_BASE_URL;
    }

    const chatHandlerModuleUrl = new URL('./api/chat.js', import.meta.url).href;

    const localChatApi = (): Plugin => ({
      name: 'local-chat-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const urlPath = (req.url || '').split('?')[0];
          if (urlPath !== '/api/chat') return next();
          const mod: any = await import(chatHandlerModuleUrl);
          const handler: any = mod?.default;
          if (typeof handler !== 'function') {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing chat handler' }));
            return;
          }
          return handler(req, res);
        });
      },
    });

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [localChatApi(), react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
