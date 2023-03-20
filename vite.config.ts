import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
    // XXX Asking vite to build sourcemaps causes it to use too much ram, so builds fail
    //build: { sourcemap: true, minify: true },
});
