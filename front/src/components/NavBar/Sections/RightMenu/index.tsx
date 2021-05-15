import React, { useCallback } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { logOutUser } from "@_actions/user_action";
import { MenuMode } from "antd/lib/menu";

interface IRightMenu {
  mode: MenuMode;
}
function RightMenu({ mode }: IRightMenu) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const logoutHandler = useCallback(() => {
    dispatch(logOutUser());
  }, [dispatch]);

  // if (user.userData && !user.userData.isAuth) {
  return (
    <Menu mode={mode}>
      <Menu.Item key="mail">
        <a href="/login">Signin</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="/register">Signup</a>
      </Menu.Item>
    </Menu>
  );
  // } else {
  //   return (
  //     <Menu mode={mode}>
  //       <Menu.Item key="logout">
  //         <NavBarLink to="#" onClick={logoutHandler}>
  //           Logout
  //         </NavBarLink>
  //       </Menu.Item>
  //     </Menu>
  //   );
  // }
}

export default RightMenu;
