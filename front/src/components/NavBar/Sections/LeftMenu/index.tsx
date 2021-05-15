import React from "react";
import { Menu } from "antd";
import { MenuMode } from "antd/lib/menu";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

interface ILeftMenu {
  mode: MenuMode;
}
function LeftMenu({ mode }: ILeftMenu) {
  return (
    <Menu mode={mode}>
      <Menu.Item key="mail">
        <Link to="/">Home</Link>
      </Menu.Item>
      <SubMenu key="subMenu" title={<div>Blogs</div>}>
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
