import { useState } from "react";
import { Alert, Button, Modal, TextInput } from "@mantine/core";
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
  open: boolean;
  onClose: () => void;
}

export function NewsletterForm({
  handler,
  open,
  onClose,
}: NewsletterFormProps) {
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
    <Modal
      title={
        <span className="text-center text-xl font-medium">{t("title")}</span>
      }
      opened={open}
      transitionProps={{
        transition: "pop",
      }}
      onClose={onClose}
      centered
      radius="lg"
    >
      {submission?.success === true && (
        <Alert color="green" className="mb-3" title={t("success")} />
      )}
      {submission?.success === false && (
        <Alert
          color="red"
          className="mb-3"
          title={submission.error ?? t("error")}
        />
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
              <TextInput
                label={t("fields.firstname")}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={field.form.state.isSubmitting}
              />
            )}
          </form.Field>
          <form.Field name="lastname">
            {(field) => (
              <TextInput
                label={t("fields.lastname")}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={field.form.state.isSubmitting}
              />
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <TextInput
                className="col-span-2"
                label={t("fields.email")}
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
            <Button
              fullWidth
              type="submit"
              radius="xl"
              color="accent"
              disabled={!isTouched || !canSubmit}
              loading={isSubmitting}
            >
              {t("submit")}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </Modal>
  );
}
