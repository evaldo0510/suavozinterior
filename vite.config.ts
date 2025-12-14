import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  // Vercel injects env vars into process.env. 
  // We prioritize the one loaded by Vite, then fallback to process.env
  const apiKey = env.API_KEY || process.env.API_KEY;

  return {
    plugins: [react()],
    define: {
      // Securely replace process.env.API_KEY in the client code with the string value
      'process.env.API_KEY': JSON.stringify(apiKey),
      // Prevent "process is not defined" error in browser
      'process.env': {} 
    },
    build: {
      outDir: 'dist',
    }
  };
});