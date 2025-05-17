"use server";

import { unstable_cache } from "next/cache";

import { db } from "@/database";

export const fetchStrategies = unstable_cache(
  async () => {
    const strategies = await db.query.strategy.findMany({
      orderBy: (strategy, { asc }) => [asc(strategy.order)],
    });
    return strategies;
  },
  undefined,
  {
    tags: ["cms", "strategies"],
  },
);

export const fetchTeamMembers = unstable_cache(
  async () => {
    const teamMembers = await db.query.teamMember.findMany({
      orderBy: (teamMember, { asc }) => [asc(teamMember.order)],
    });
    return teamMembers;
  },
  undefined,
  {
    tags: ["cms", "team-members"],
  },
);
