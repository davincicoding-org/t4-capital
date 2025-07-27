import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { z } from "zod";

import type {
  NewsletterHandler,
  NewsletterSubscriptionOutput,
} from "@/services/newsletter";
import { cn } from "@/ui/utils";

const formSchema = z.object({
  firstname: z.string().trim().min(1),
  lastname: z.string().trim().min(1),
  email: z.string().email(),
});

export interface NewsletterFormProps {
  handler: NewsletterHandler;
  className?: string;
}

export function NewsletterForm({ handler, className }: NewsletterFormProps) {
  const t = useTranslations("newsletter");
  const [submission, setSubmission] = useState<NewsletterSubscriptionOutput>();
  const form = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await handler(value);
      setSubmission(response);
    },
  });

  return (
    <div className={className}>
      {submission?.success === false && (
        <div role="alert" className="alert alert-error mb-3">
          <span>{submission.error ?? t("error")}</span>
        </div>
      )}
      <p className="mb-4 text-center text-balance">{t("description")}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return form.handleSubmit();
        }}
      >
        <div className={cn("mb-5 grid grid-cols-2 gap-2")}>
          <form.Field name="firstname">
            {(field) => (
              <input
                className="input"
                placeholder={t("fields.firstname")}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={field.form.state.isSubmitting}
              />
            )}
          </form.Field>
          <form.Field name="lastname">
            {(field) => (
              <input
                className="input"
                placeholder={t("fields.lastname")}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={field.form.state.isSubmitting}
              />
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <input
                className="input col-span-2 w-full"
                placeholder={t("fields.email")}
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={field.form.state.isSubmitting}
              />
            )}
          </form.Field>
        </div>

        <form.Subscribe
          selector={({ canSubmit, isSubmitting, isTouched }) => ({
            canSubmit,
            isTouched,
            isSubmitting,
          })}
        >
          {({ canSubmit, isSubmitting, isTouched }) => (
            <button
              className="btn w-full rounded-lg"
              type="submit"
              disabled={!isTouched || !canSubmit}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                t("submit")
              )}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
