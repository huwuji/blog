import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), "");
  console.log("env==", mode, process.cwd(), env);
  return {
    // vite 配置
    publicDir: "public",
    resolve: {
      extensions: [".js", ".ts"],
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  };
});
