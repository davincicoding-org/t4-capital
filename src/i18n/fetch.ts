import { google } from "googleapis";

import { getGoogleClient } from "@/services/googleapi";

export const fetchMessages = async (lang: string) => {
  const glSheets = google.sheets({
    version: "v4",
    auth: await getGoogleClient(),
  });

  const {
    data: { values },
  } = await glSheets.spreadsheets.values.get({
    spreadsheetId: "17b2MWKCrZU22jztYFHcCYGOkgqewS44X4PFYhEg8a8k",
    range: "Sheet1",
  });

  if (!values) throw new Error("Could not load messages from Google Sheet");

  const [headers, ...rows] = values;

  if (!headers) throw new Error("Header missing in Google Sheet");

  const langIndex = headers.indexOf(lang);

  if (langIndex === -1) throw new Error("Language not defined in Google Sheet");

  return rows.reduce(
    (acc, row) => ({
      ...acc,
      [row[0]]: row[langIndex] as string,
    }),
    {},
  );
};
