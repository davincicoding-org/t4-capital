"use server";

import { z } from "zod";

import { env } from "@/env";

export interface INewsletterSubscriptionInput {
  firstname: string;
  lastname: string;
  email: string;
}

export type INewsletterSubscriptionOutput =
  | { success: true }
  | {
      success: false;
      error?: string;
    };

export type NewsletterHandler = (
  formData: INewsletterSubscriptionInput,
) => Promise<INewsletterSubscriptionOutput>;

export const subscribeToNewsletter: NewsletterHandler = async (formData) => {
  const apiKey = env.MAILCHIMP_APIKEY;
  const audienceId = env.NEWSLETTER_AUDIENCE_ID;
  const dataCenter = apiKey.split("-")[1]!;

  const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  const data = {
    email_address: formData.email,
    status: "subscribed",
    merge_fields: {
      FNAME: formData.firstname,
      LNAME: formData.lastname,
    },
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `apikey ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (response.status >= 400) {
      const error = z
        .object({ title: z.string(), detail: z.string() })
        .parse(await response.json());

      if (error.title === "Member Exists")
        return {
          success: false,
          error: "You are already subscribed to the newsletter.",
        };

      // TODO track errors
      return {
        success: false,
      };
    }
    return { success: true };
  } catch (_error) {
    return {
      success: false,
    };
  }
};
