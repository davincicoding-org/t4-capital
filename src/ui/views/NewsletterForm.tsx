import { useState } from "react";

import { Alert, Button, Modal, TextInput } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useForm } from "@tanstack/react-form";

import { cn } from "@/ui/utils";

import {
  type INewsletterSubscriptionOutput,
  subscribeToNewsletter,
} from "@/services/mailchimp";
import { z } from "zod";

const formSchema = z.object({
  firstname: z.string().trim().min(1),
  lastname: z.string().trim().min(1),
  email: z.string().email(),
});

export interface INewsletterFormProps {
  open: boolean;
  onClose: () => void;
}

export function NewsletterForm({ open, onClose }: INewsletterFormProps) {
  const t = useTranslations();
  const [submission, setSubmission] = useState<INewsletterSubscriptionOutput>();
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
      const response = await subscribeToNewsletter(value);
      setSubmission(response);
    },
  });

  return (
    <Modal
      title={
        <span className="text-center text-xl font-medium">
          {t("NEWSLETTER-TITLE")}
        </span>
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
        <Alert
          color="green"
          className="mb-3"
          title={t("NEWSLETTER-SUBSCRIBED")}
        />
      )}
      {submission?.success === false && (
        <Alert
          color="red"
          className="mb-3"
          title={submission.error ?? t("NEWSLETTER-ERROR")}
        />
      )}
      <p className="mb-4 text-balance text-center">
        {t("NEWSLETTER-DESCRIPTION")}
      </p>
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
                label={t("NEWSLETTER-FNAME_LABEL")}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={field.form.state.isSubmitting}
              />
            )}
          </form.Field>
          <form.Field name="lastname">
            {(field) => (
              <TextInput
                label={t("NEWSLETTER-LNAME_LABEL")}
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
                label={t("NEWSLETTER-EMAIL_LABEL")}
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
              {t("NEWSLETTER-SUBMIT")}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </Modal>
  );
}
