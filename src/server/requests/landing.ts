"use server";

import type { SupportedLocale } from "@/i18n/config";
import type {
  Advisor,
  Media,
  PressArticle,
  Strategy,
  TeamMember,
} from "@/types";
import { ensureResolved } from "@/ui/utils";

import { cachedRequest } from "../cache";
import { getPayloadClient } from "../payload";

export const fetchGlobalMetadata = cachedRequest(
  async (locale: SupportedLocale) => {
    const payload = await getPayloadClient();
    const { meta } = await payload.findGlobal({
      slug: "landing-page",
      locale,
      select: {
        meta: true,
      },
    });
    return meta;
  },
  ["cms", "landing-page"],
);

const fetchStrategies = cachedRequest(
  async (locale: SupportedLocale) => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "strategies",
      sort: "order",
      locale,
      pagination: false,
    });
    return docs;
  },
  ["cms", "strategies"],
);

const fetchLandingPage = cachedRequest(
  async (locale: SupportedLocale) => {
    const payload = await getPayloadClient();
    return payload.findGlobal({
      slug: "landing-page",
      locale,
    });
  },
  ["landing-page"],
);

export const getLandingPageData = async (
  locale: SupportedLocale,
): Promise<{
  articles: PressArticle[];
  strategies: Strategy[];
  teamImage: Media;
  teamMembers: TeamMember[];
  advisors: Advisor[];
}> => {
  const [page, strategies] = await Promise.all([
    fetchLandingPage(locale),
    fetchStrategies(locale),
  ]);
  const teamImage = ensureResolved(page.teamImage);

  if (!teamImage) {
    console.error("No team image found for landing page", page.id);
  }

  return {
    articles: (page.articles ?? []).reduce<PressArticle[]>((acc, article) => {
      const logo = ensureResolved(article.logo);

      if (!logo?.url) {
        console.error("No logo found for article", article.id);
        return acc;
      }

      return [
        ...acc,
        {
          ...article,
          logo,
        },
      ];
    }, []),
    strategies: strategies.reduce<Strategy[]>((acc, strategy) => {
      const deck = ensureResolved(strategy.deck);

      if (!deck?.url) {
        console.error("No deck found for strategy", strategy.id);
        return acc;
      }

      const video = ensureResolved(strategy.video);

      return [
        ...acc,
        {
          ...strategy,
          image: `/gradients/${strategy.color}.png`,
          presentationUrl: deck.url,
          video: video?.url ?? null,
        },
      ];
    }, []),
    teamImage: teamImage ?? { id: -1 },
    teamMembers: page.teamMembers ?? [],
    advisors: page.advisors ?? [],
  };
};
