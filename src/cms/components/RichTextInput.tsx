import type { RichTextInputProps as RichTextInputPropsBase } from "ra-input-rich-text";
import DOMPurify from "dompurify";
import {
  AlignmentButtons,
  FormatButtons,
  LevelSelect,
  LinkButtons,
  ListButtons,
  RichTextInput as RichTextInputBase,
  RichTextInputToolbar,
} from "ra-input-rich-text";
import { useTranslatableContext } from "react-admin";
import { useController } from "react-hook-form";

import { cn } from "@/ui/utils";

const purifyOptions = {
  FORBID_ATTR: ["style"],
  FORBID_TAGS: ["style"],
};

export interface RichTextInputProps
  extends Omit<RichTextInputPropsBase, "toolbar"> {
  size?: "small" | "medium" | "large";
}

export function TranslatableRichTextInput({
  source,
  ...props
}: RichTextInputProps) {
  const { selectedLocale } = useTranslatableContext();
  const localizedSource = `${source}.${selectedLocale}`;

  return <RichTextInput source={localizedSource} {...props} />;
}

export function RichTextInput({
  size,
  className,
  ...inputProps
}: RichTextInputProps) {
  const { field } = useController({
    name: inputProps.source,
  });

  return (
    <RichTextInputBase
      {...inputProps}
      className={cn(className, "!prose")}
      toolbar={
        <RichTextInputToolbar>
          <LevelSelect size={size} />
          <FormatButtons size={size} />
          <AlignmentButtons size={size} />
          <ListButtons size={size} />
          <LinkButtons size={size} />
        </RichTextInputToolbar>
      }
      onChange={(value) => {
        const cleanValue = DOMPurify.sanitize(value as string, purifyOptions);
        inputProps.onChange?.(cleanValue);

        field.onChange(cleanValue);
      }}
    />
  );
}
