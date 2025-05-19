import type { PropsWithChildren } from "react";
import { Divider, Typography } from "@mui/material";
import { IconLanguage } from "@tabler/icons-react";
import { Layout, Menu, useSidebarState } from "react-admin";

const MenuDivider = ({ label }: { label?: string }) => {
  const [sidebarIsOpen] = useSidebarState();
  return (
    <Divider flexItem textAlign="left" sx={{ width: "100%", my: 1 }}>
      {label && sidebarIsOpen ? (
        <Typography variant="caption" color="textSecondary">
          {label}
        </Typography>
      ) : null}
    </Divider>
  );
};

const CustomMenu = () => (
  <Menu className="h-full">
    <Menu.Item
      to="/translations"
      primaryText="Translations"
      leftIcon={<IconLanguage />}
    />
    <MenuDivider label="Products" />
    <Menu.ResourceItem name="strategy" />
    <Menu.ResourceItem name="security" />
    <MenuDivider />
    <Menu.ResourceItem name="team_member" />
  </Menu>
);

export const CustomLayout = ({ children }: PropsWithChildren) => (
  <Layout menu={CustomMenu}>{children}</Layout>
);
