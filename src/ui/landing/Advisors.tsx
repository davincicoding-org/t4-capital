import { Fragment } from "react";
import { IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import type { Advisor } from "@/types";
import { cn } from "@/ui/utils";

export interface AdvisorsProps {
  advisors: Advisor[];
  className?: string;
}

export function Advisors({ className, advisors }: AdvisorsProps) {
  const t = useTranslations();

  if (advisors.length === 0) return null;

  return (
    <section className={cn("grid gap-4", className)}>
      <div className="sm:text-center">
        <h3 className="mb-2 text-2xl font-medium">{t("advisors.title")}</h3>
        <p className="text-gray-69 text-xl">{t("advisors.description")}</p>
      </div>

      <div className="grid gap-2">
        <div className="mx-auto flex flex-wrap gap-2 py-1 sm:gap-4">
          {advisors.map((advisor) => (
            <Fragment key={advisor.id}>
              <label
                htmlFor={`modal-${advisor.id}`}
                className="btn btn-lg rounded-md text-nowrap shadow-sm"
              >
                {advisor.name}
              </label>

              <input
                type="checkbox"
                id={`modal-${advisor.id}`}
                className="modal-toggle"
              />
              <div className="modal modal-bottom px-6" role="dialog">
                <div className="modal-box mx-auto max-w-2xl pt-4">
                  <header className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-medium">{advisor.name}</h3>

                    <label
                      htmlFor={`modal-${advisor.id}`}
                      className="btn btn-ghost btn-sm btn-square -mr-2 rounded-sm"
                    >
                      <IconX />
                    </label>
                  </header>

                  <p className="text-lg text-pretty">{advisor.description}</p>
                </div>
                <label
                  className="modal-backdrop"
                  htmlFor={`modal-${advisor.id}`}
                >
                  Close
                </label>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
