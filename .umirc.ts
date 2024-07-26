import { defineConfig } from '@umijs/max';
import proxy from "./config/proxy";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},

  routes: [
    {
      path: "/",
      component: "index" ,
      routes: [
        { path: "/", component: "@/components/Content" },
        { path: "/editArticle/:id", component: "@/components/EditArticle" },
        { path: "/login", component: "@/components/Login"}
      ]
    },

  ],
  npmClient: 'pnpm',
  proxy: proxy['dev'],
});

