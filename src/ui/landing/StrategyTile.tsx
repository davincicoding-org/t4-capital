"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ActionIcon, Button } from "@mantine/core";
import { useDisclosure, useOs } from "@mantine/hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslations } from "next-intl";

import { useReducedMotion } from "@/ui/motion";
import { cn } from "@/ui/utils";

import { CardBody, CardContainer, CardItem } from "../components/3d-card";

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
  const t = useTranslations("strategies");
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const os = useOs();
  const isMobile = os === "ios" || os === "android";
  const liveSince = dayjs(launchDate).fromNow(true);
  const [isVideoPlaying, { toggle: toggleVideo, close: pauseVideo }] =
    useDisclosure(false);

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
      disabled={(shouldReduceMotion ?? isMobile) || isVideoPlaying}
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
          translateZ="50"
          className={cn(
            "relative w-full",
            "relative flex aspect-video grow flex-col justify-center",
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
            <ActionIcon
              color="black"
              radius="xl"
              variant="outline"
              className="absolute top-2 right-2"
              aria-label={t("video-button")}
              onClick={toggleVideo}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181Z"
                  fill="currentColor"
                />
              </svg>
            </ActionIcon>
          ) : null}
        </CardItem>

        <div className={cn("flex flex-col p-3 md:p-4")}>
          <CardItem
            as="p"
            translateZ="20"
            className={cn(
              "mb-3 text-base text-balance opacity-60 sm:max-lg:my-auto sm:max-lg:text-pretty md:text-lg lg:text-center",
            )}
          >
            {subtitle}
          </CardItem>

          <CardItem className="mt-auto flex w-full gap-2" translateZ={30}>
            <Button
              color="black"
              variant="outline"
              disabled={presentationUrl === undefined}
              size="sm"
              radius="xl"
              component={Link}
              href={presentationUrl ?? ""}
              target="_blank"
              fullWidth
            >
              {t("attachment-button")}
            </Button>
          </CardItem>
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
          poster={image}
          onClick={toggleVideo}
          onPause={pauseVideo}
        />
      ) : null}
    </CardContainer>
  );
}
