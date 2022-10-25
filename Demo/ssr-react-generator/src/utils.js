import React from "react";
import { Route } from "react-router-dom";
/**
 * 根据路由配置，实现渲染Route
 */
export const renderRouters = (routerConfig = []) =>
  (routerConfig || []).map(({ children, ...rest }, index) => (
    <Route key={index} {...rest}>
      {children && renderRouters(children)}
    </Route>
  ));
