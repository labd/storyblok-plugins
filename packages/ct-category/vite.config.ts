import { plugins } from "@storyblok/field-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), cssInjectedByJs(), ...plugins],
	build: {
		rolldownOptions: {
			output: {
				format: "cjs",
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
	},
	server: {
		port: 8080,
		host: true,
	},
});
