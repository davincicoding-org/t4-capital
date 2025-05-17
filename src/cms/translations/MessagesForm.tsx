import type { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  InputLabel,
  TextField,
} from "@mui/material";
import { get, isEqual } from "lodash-es";
import { Button, Title } from "react-admin";
import { FormProvider, useForm } from "react-hook-form";

import type {
  MessageConfig,
  MessagesSchema,
  MessagesTree,
  Translations,
} from "@/i18n/types";
import { cn } from "@/ui/utils";

import { RichTextInput } from "../components/RichTextInput";

// MARK: Translations Form

export function MessagesForm({
  data,
  schema,
  processing,
  onSubmit,
  locales,
}: {
  data: Translations;
  schema: MessagesSchema;
  processing: boolean;
  locales: [string, ...string[]];
  onSubmit: (data: Translations) => void;
}) {
  const form = useForm<Translations>({
    values: data,
    reValidateMode: "onChange",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = form;

  const handleSubmitChanges = (values: Translations) => {
    const changes = Object.entries(values).reduce<Translations>(
      (acc, [locale, value]) => {
        const hasChanged = !isEqual(value, data[locale]);
        if (!hasChanged) return acc;
        return {
          ...acc,
          [locale]: value,
        };
      },
      {},
    );
    reset(values);
    onSubmit(changes);
  };

  return (
    <form
      className="flex flex-col gap-4 p-8"
      onSubmit={handleSubmit(handleSubmitChanges)}
    >
      <div className="flex items-center justify-end">
        <Title title="Translations" />
        <Button
          variant="contained"
          color="primary"
          label="Save"
          size="medium"
          type="submit"
          loading={processing}
          disabled={!isDirty}
        />
      </div>
      <Card variant="outlined" className="p-4">
        <FormProvider {...form}>
          <MessagesTree
            schema={schema}
            register={register}
            errors={errors}
            locales={locales}
          />
        </FormProvider>
      </Card>
    </form>
  );
}

// MARK: Translations Tree

export function MessagesTree({
  schema,
  path = [],
  locales,
  errors,
  register,
  className,
}: {
  schema: MessagesSchema;
  locales: [string, ...string[]];
  path?: string[];
  className?: string;
  errors: FieldErrors<Translations>;
  register: UseFormRegister<Translations>;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className, {})}>
      {Object.entries(schema).map(([key, config]) => {
        const hasErrors = locales.some(
          (locale) => get(errors, [locale, ...path, key]) !== undefined,
        );

        const isOnlyOneField = isMessageConfig(config) && locales.length === 1;

        if (isOnlyOneField)
          return (
            <MessageField
              key={key}
              label={key}
              name={[locales[0], ...path, key].join(".")}
              locale={locales[0]}
              config={config}
              register={register}
              error={getFieldError(errors, [locales[0], ...path, key])}
            />
          );

        return (
          <div key={key}>
            <Accordion
              variant="outlined"
              className={cn({
                "[&:not(.Mui-expanded)]:!border-red-500": hasErrors,
              })}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={cn({
                  "[&:not(.Mui-expanded)]:!text-red-500": hasErrors,
                })}
                sx={{
                  "&.MuiAccordionSummary-root": {
                    height: 48,
                    minHeight: 0,
                  },
                  ".MuiAccordionSummary-content": {
                    marginBlock: "0!important",
                  },
                }}
              >
                <b>{key}</b>
              </AccordionSummary>
              <AccordionDetails className="!pt-0">
                {isMessageConfig(config) ? (
                  <div className={cn("flex gap-4")}>
                    {locales.map((locale) => (
                      <MessageField
                        key={locale}
                        label={locale.toUpperCase()}
                        name={[locale, ...path, key].join(".")}
                        locale={locale}
                        config={config}
                        register={register}
                        error={getFieldError(errors, [locale, ...path, key])}
                      />
                    ))}
                  </div>
                ) : (
                  <MessagesTree
                    schema={config}
                    locales={locales}
                    path={[...path, key]}
                    errors={errors}
                    register={register}
                  />
                )}
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}

// MARK: Message Field

function MessageField({
  label,
  name,
  locale,
  config,
  register,
  error,
}: {
  label?: string;
  name: string;
  locale: string;
  error: FieldError | undefined;
  config: MessageConfig;
  register: UseFormRegister<Translations>;
}) {
  const [type, ...interpolations] = Array.isArray(config) ? config : [config];

  if (type === "rich") {
    const {
      onBlur: _onBlur,
      onChange: _onChange,
      ...registerRichTextInput
    } = register(name, {
      required: true,
      minLength: 1,
      onBlur: console.log,
    });
    return (
      <Card
        variant="outlined"
        component="fieldset"
        className={cn("p-3 pt-0", {
          "!border-red-500": error,
        })}
      >
        <legend>
          <InputLabel
            className={cn("!px-1 !text-xs", {
              "!text-red-500": error,
            })}
          >
            {label}
          </InputLabel>
        </legend>
        <RichTextInput
          label={false}
          lang={locale}
          variant="outlined"
          source={name}
          helperText={false}
          {...registerRichTextInput}
        />
      </Card>
    );
  }

  return (
    <TextField
      label={label}
      variant="outlined"
      multiline={type === "long"}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      lang={locale}
      error={error !== undefined}
      helperText={error?.message}
      fullWidth
      {...register(name, {
        required: true,
        minLength: 1,
        validate: (value) => {
          const missingInterpolations = interpolations.filter(
            (interpolation) =>
              !(value as unknown as string).includes(interpolation),
          );

          if (missingInterpolations.length === 0) return true;

          return `Missing interpolations: ${missingInterpolations.join(" | ")}`;
        },
      })}
    />
  );
}

// MARK: Helpers

const isMessageConfig = (
  config: MessageConfig | MessagesTree<MessageConfig>,
): config is MessageConfig =>
  typeof config === "string" || Array.isArray(config);

const getFieldError = (errors: FieldErrors<Translations>, path: string[]) => {
  return get(errors, path) as FieldError | undefined;
};
