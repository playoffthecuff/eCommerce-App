import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

type ViteConfigOutput = {
  mode: string;
  command: string;
}

// https://vitejs.dev/config/
export default (args: ViteConfigOutput) => {

  const generateScopedName = args.mode === 'production' ? '[hash:base64:3]' : '[local]_[hash:base64:3]';

  return defineConfig({
    plugins: [react()],
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName,
      },
    },
  })
}