"use server";

import { revalidateTag } from "next/cache";

import type { Security } from "@/database/types";
import { db } from "@/database";
import { computeSecurityPerformance } from "@/utils/computeSecurityPerformance";
import { computeSecurityReturns } from "@/utils/computeSecurityReturns";

import type { CacheTag } from "./cache";
import { cachedRequest } from "./cache";

export const revalidateCache = async (tag: CacheTag) => revalidateTag(tag);

// MARK: Requests

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

export const fetchSecurityByPassword = cachedRequest(
  async (password: Security["password"]) => {
    const [security] = await db.query.security.findMany({
      where: (security, { eq }) => eq(security.password, password),
      columns: {
        isin: true,
        id: true,
        name: true,
      },
      with: {
        strategy: {
          columns: {
            title: true,
            launchDate: true,
            color: true,
          },
        },
      },
    });
    return security;
  },
  ["cms", "securities"],
);

export const fetchSecurityData = cachedRequest(
  async (security: Pick<Security, "id" | "name">) => {
    const prices = await db.query.securityPrice.findMany({
      columns: {
        date: true,
        price: true,
      },
      where: (securityPrice, { eq }) => eq(securityPrice.security, security.id),
      orderBy: (securityPrice, { asc }) => [asc(securityPrice.date)],
    });

    const returns = computeSecurityReturns(prices);

    const performance = computeSecurityPerformance(prices);

    return {
      prices,
      returns,
      performance,
    };
  },
  ["prices", "securities"],
);
