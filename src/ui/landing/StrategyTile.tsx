"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewport, useOs } from "@mantine/hooks";
import { IconPlayerPlay } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslations } from "next-intl";

import { cn } from "@/ui/utils";

import { CardBody, CardContainer, CardItem } from "../components/3dCard";

dayjs.extend(relativeTime);

export interface StrategyTileProps {
  title: string;
  subtitle: string;
  launchDate: string;
  image: string;
  video?: string | null;
  presentationUrl?: string;
  className?: string;
}
export function StrategyTile({
  title,
  subtitle,
  launchDate,
  image,
  video,
  presentationUrl,
  className,
}: StrategyTileProps) {
  const t = useTranslations();
  const os = useOs();
  const isMobile = os === "ios" || os === "android";
  const { ref, inViewport } = useInViewport();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const liveSince = dayjs(launchDate).fromNow(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current === null) return;
    if (isVideoPlaying) {
      videoRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
      void videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <CardContainer
      className="inter-var items-stretch"
      disabled={isMobile || isVideoPlaying}
    >
      <CardBody
        className={cn(
          "group/card relative grid h-full w-full grid-rows-[auto_1fr] shadow-sm",
          "grid sm:max-lg:grid-cols-[2fr_3fr]",
          "bg-noise rounded-2xl",
          className,
        )}
      >
        <CardItem
          className={cn(
            "relative w-full",
            "relative flex aspect-video grow flex-col justify-center group-hover:translate-z-10",
            "min-h-40 rounded-2xl bg-cover bg-center shadow-lg",
          )}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div
            className={cn(
              "absolute top-2 left-2 rounded-full bg-white px-2.5 py-0.5 text-sm font-medium uppercase shadow-sm empty:hidden",
            )}
          >
            {liveSince} live
          </div>

          <h3 className={cn("px-4 text-center text-3xl text-wrap text-black")}>
            {title}
          </h3>

          {video ? (
            <button
              type="button"
              className="btn btn-outline btn-sm btn-circle absolute top-2 right-2"
              aria-label={t("strategies.video-button")}
              onClick={() => setIsVideoPlaying(true)}
            >
              <IconPlayerPlay className="size-4" />
            </button>
          ) : null}
        </CardItem>

        <div className={cn("flex flex-col p-3 md:p-4")}>
          <CardItem
            as="p"
            className={cn(
              "mb-3 text-base text-balance opacity-60 group-hover:translate-z-5 sm:max-lg:my-auto sm:max-lg:text-pretty md:text-lg lg:text-center",
            )}
          >
            {subtitle}
          </CardItem>

          <a
            className={cn(
              "btn btn-outline mx-auto mt-auto rounded-lg tracking-widest uppercase",
              {
                "btn-disabled": presentationUrl === undefined,
              },
            )}
            href={presentationUrl}
            target="_blank"
            ref={ref}
          >
            {t("strategies.attachment-button")}
          </a>
        </div>
      </CardBody>
      {video ? (
        <video
          className={cn(
            "absolute -z-10 opacity-0",
            isMobile
              ? "inset-0"
              : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            {
              "cursor-pointer overflow-hidden rounded-2xl shadow-2xl":
                !isMobile,
            },
            {
              "pointer-events-none": !isVideoPlaying,
              "z-50 opacity-100": isVideoPlaying,
            },
          )}
          ref={videoRef}
          src={video}
          preload={inViewport ? "auto" : "none"}
          onClick={() => setIsVideoPlaying((current) => !current)}
          onPause={() => setIsVideoPlaying(false)}
        />
      ) : null}
    </CardContainer>
  );
}
