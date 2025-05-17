"use client";

import {
  LoginPage,
  supabaseAuthProvider,
  supabaseDataProvider,
} from "ra-supabase";
import { Admin, CustomRoutes, withLifecycleCallbacks } from "react-admin";
import { Route } from "react-router-dom";

import { env } from "@/env";
import { MESSAGES_SCHEMA, SUPPORTED_LOCALES } from "@/i18n/config";
import { fetchMessages, saveMessages } from "@/server/messages";
import { supabaseClient } from "@/server/supabase";

import { CustomLayout } from "./CustomLayout";
import { TranslationsRoute } from "./translations/TranslationsRoute";

const authProvider = supabaseAuthProvider(supabaseClient, {});

const dataProvider = withLifecycleCallbacks(
  supabaseDataProvider({
    instanceUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    apiKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseClient,
  }),
  [],
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
              saveMessages={saveMessages}
            />
          }
        />
      </CustomRoutes>
    </Admin>
  );
}
