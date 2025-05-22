"use client";

import dynamic from "next/dynamic";

const AdminApp = dynamic(() => import("@/cms/AdminApp"), {
  ssr: false,
});

export default AdminApp;
