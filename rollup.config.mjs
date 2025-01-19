import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';  // New Terser Plugin
import commonjs from '@rollup/plugin-commonjs';  // New CommonJS Plugin

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/esm/index.js',
      format: 'esm',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    commonjs(),
    terser(),  // Add Terser plugin
  ],
};
