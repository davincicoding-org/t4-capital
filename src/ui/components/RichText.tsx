import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText as ConvertRichText } from "@payloadcms/richtext-lexical/react";

import { cn } from "../utils";

export type RichTextProps = {
  data: DefaultTypedEditorState;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText({
  className,
  enableProse = true,
  ...rest
}: RichTextProps) {
  return (
    <ConvertRichText
      className={cn(
        "payload-richtext",
        {
          "prose md:prose-md dark:prose-invert mx-auto": enableProse,
        },
        className,
      )}
      {...rest}
    />
  );
}
