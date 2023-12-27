import vue from "@vitejs/plugin-vue"; //add this line

export default {
  plugins: [
      vue(),
  ],
  root: `./src`,
  build: {
    outDir: '../dist'
  },
  server: {
    port: 8080
  }
}



