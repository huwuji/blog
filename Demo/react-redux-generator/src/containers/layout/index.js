import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* "布局路由（layout）"适合放置一些被所有页面共享的组件，比如导航栏 */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/intro">intro</Link>
          </li>
          <li>
            <Link to="/404">404</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* <Outlet> 绘制当前（被选中的）激活的子路由组件，你可以理解为是我们事先定义的子路由组件的占位符 */}
      <Outlet />
    </div>
  );
};

export default Layout;
