import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { fetchMessages } from "./fetch";

void (async () => {
  try {
    const defaultLang = "en";
    const messages = await fetchMessages(defaultLang);
    const jsonContent = JSON.stringify(messages, null, 2);
    writeFileSync(join(process.cwd(), "i18n/messages.json"), jsonContent);
  } catch (error) {
    console.error("Error pulling translations:", error);
    process.exit(1);
  }
})();
