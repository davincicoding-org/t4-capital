import type { PropsWithChildren } from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import { Layout, Menu } from "react-admin";

const CustomMenu = () => (
  <Menu className="h-full">
    {/* <Menu.ResourceItems /> */}
    <Menu.Item
      to="/translations"
      primaryText="Translations"
      leftIcon={<TranslateIcon />}
    />
  </Menu>
);

export const CustomLayout = ({ children }: PropsWithChildren) => (
  <Layout menu={CustomMenu}>{children}</Layout>
);
