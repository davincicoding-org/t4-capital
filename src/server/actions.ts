"use server";

import { revalidateTag } from "next/cache";

import { db } from "@/database";

import type { CacheTag } from "./cache";
import { cachedRequest } from "./cache";

// MARK request

export const fetchStrategies = cachedRequest(async () => {
  const strategies = await db.query.strategy.findMany({
    orderBy: (strategy, { asc }) => [asc(strategy.order)],
  });
  return strategies;
}, ["cms", "strategies"]);

export const fetchTeamMembers = cachedRequest(async () => {
  const teamMembers = await db.query.teamMember.findMany({
    orderBy: (teamMember, { asc }) => [asc(teamMember.order)],
  });
  return teamMembers;
}, ["cms", "team-members"]);

export const revalidateCache = async (tag: CacheTag) => revalidateTag(tag);
