import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules/@hookform")) {
                        return "vendorHookform";
                    }
                    if (id.includes("node_modules/antd/es/button")) {
                        return "antd-button";
                    }
                    if (id.includes("node_modules/antd/es/icon")) {
                        return "antd-icon";
                    }
                    if (id.includes("node_modules/antd/es/table")) {
                        return "antd-table";
                    }
                    if (id.includes("node_modules/antd/es/input")) {
                        return "antd-input";
                    }
                    if (id.includes("node_modules/antd/es/form")) {
                        return "antd-form";
                    }
                    if (id.includes("node_modules/antd/es/menu")) {
                        return "antd-menu";
                    }
                    if (id.includes("node_modules/antd/es/layout")) {
                        return "antd-layout";
                    }
                },
            },
        },
    },
    optimizeDeps: {
        exclude: ["cv-graphql"],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
