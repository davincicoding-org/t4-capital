import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { env } from "@/env";

export async function POST() {
  const headersList = await headers();
  const authHeader = headersList.get("Authorization");

  if (!authHeader || authHeader !== `Bearer ${env.I18N_SECRET}`)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    revalidateTag("i18n");
    return NextResponse.json({ message: "Cache invalidated" }, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { message: "Failed to invalidate cache" },
      { status: 500 },
    );
  }
}
