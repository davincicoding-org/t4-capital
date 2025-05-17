"use client";

import GroupsIcon from "@mui/icons-material/GroupsOutlined";
import StarIcon from "@mui/icons-material/StarOutline";
import {
  LoginPage,
  supabaseAuthProvider,
  supabaseDataProvider,
} from "ra-supabase";
import {
  Admin,
  CustomRoutes,
  Resource,
  withLifecycleCallbacks,
} from "react-admin";
import { Route } from "react-router-dom";

import { env } from "@/env";
import { MESSAGES_SCHEMA, SUPPORTED_LOCALES } from "@/i18n/config";
import { revalidateCache } from "@/server/actions";
import { fetchMessages, saveMessages } from "@/server/messages";
import { supabaseClient } from "@/server/supabase";

import { CustomLayout } from "./CustomLayout";
import {
  StrategyCreate,
  StrategyEdit,
  StrategyList,
} from "./resources/strategy";
import {
  TeamMemberCreate,
  TeamMemberEdit,
  TeamMemberList,
} from "./resources/team-member";
import { TranslationsRoute } from "./translations/TranslationsRoute";

const authProvider = supabaseAuthProvider(supabaseClient, {});

const dataProvider = withLifecycleCallbacks(
  supabaseDataProvider({
    instanceUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    apiKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseClient,
  }),
  [
    {
      resource: "strategy",
      afterSave: async (params: undefined) => {
        void revalidateCache("strategies");
        return params;
      },
      afterDelete: async (args) => {
        void revalidateCache("strategies");
        return args;
      },
      afterDeleteMany: async (args) => {
        void revalidateCache("strategies");
        return args;
      },
    },
    {
      resource: "team_member",
      afterSave: async (params: undefined) => {
        void revalidateCache("team-members");
        return params;
      },
      afterDelete: async (args) => {
        void revalidateCache("team-members");
        return args;
      },
      afterDeleteMany: async (args) => {
        void revalidateCache("team-members");
        return args;
      },
    },
  ],
);

export default function AdminApp() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      layout={CustomLayout}
    >
      <CustomRoutes>
        <Route
          path="/translations"
          element={
            <TranslationsRoute
              schema={MESSAGES_SCHEMA}
              locales={SUPPORTED_LOCALES}
              fetchMessages={fetchMessages}
              saveMessages={async (locale, messages) => {
                await saveMessages(locale, messages);
                await revalidateCache("messages");
              }}
            />
          }
        />
      </CustomRoutes>
      <Resource
        name="team_member"
        options={{ label: "Team" }}
        icon={GroupsIcon}
        create={TeamMemberCreate}
        list={TeamMemberList}
        edit={TeamMemberEdit}
      />
      <Resource
        name="strategy"
        options={{ label: "Strategies" }}
        icon={StarIcon}
        create={StrategyCreate}
        list={StrategyList}
        edit={StrategyEdit}
      />
    </Admin>
  );
}
