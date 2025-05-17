import type { ArrayInputProps, FieldProps } from "react-admin";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import {
  ArrayInput,
  ImageInput,
  required,
  SimpleFormIterator,
  TextInput,
  TranslatableInputs,
  useFieldValue,
  useSimpleFormIteratorItem,
  useTranslate,
} from "react-admin";

const maxFileSize = (maxSize: number) => {
  return (value: { rawFile?: File; src: string } | null) => {
    if (!value?.rawFile) return undefined;
    if (value.rawFile.size > maxSize) return "Image is too large";
    return undefined;
  };
};

export const ImageGalleryInput = (props: Omit<ArrayInputProps, "children">) => {
  return (
    <ArrayInput label={false} variant="outlined" {...props}>
      <SimpleFormIterator
        disableClear
        reOrderButtons={<ReOrderButtons />}
        removeButton={<RemoveButton />}
        sx={{
          marginTop: 1,
          display: "grid",
          ".RaSimpleFormIterator-list": {
            display: "flex",
            gap: 3,
            overflowX: "auto",
          },
          ".RaSimpleFormIterator-line": {
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flexShrink: 0,
            border: "none",
          },
          ".RaSimpleFormIterator-form": {
            gap: 1,
          },
          ".RaSimpleFormIterator-action": {
            display: "flex",
          },
        }}
      >
        <ImageInput
          label={false}
          source="image"
          variant="outlined"
          accept={{ "image/*": [".png", ".jpg"] }}
          placeholder="Drop a picture (max. 5MB) to upload, or click to select it."
          validate={[maxFileSize(5_000_000), required("Image is required")]}
          sx={{
            flex: 1,
            position: "relative",
            ".RaFileInput-dropZone": {
              height: "100%",
              aspectRatio: "16/9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingInline: "10%",
              textWrap: "balance",
            },
            ".RaFileInput-removeButton": {
              display: "block",
            },
            ".RaFileInputPreview-removeButton": {
              zIndex: 1,
            },
            ".Mui-error": {
              position: "absolute",
              insetInline: 0,
              margin: 0,
              padding: 1,
              textAlign: "center",
              fontSize: "1rem",
              bottom: 0,
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(4px)",
            },
            ".RaFileInput-dropZone:has(~ .previews:not(:empty))": {
              display: "none",
            },
          }}
        >
          <ImagePreview source="src" />
        </ImageInput>
        <TranslatableInputs
          defaultLocale="de"
          locales={["de", "en"]}
          sx={{ flexGrow: 0 }}
        >
          <TextInput source="caption" variant="outlined" helperText={false} />
        </TranslatableInputs>
      </SimpleFormIterator>
    </ArrayInput>
  );
};

const ImagePreview = (props: FieldProps) => {
  const src = useFieldValue(props) as string;
  return (
    <div className="grid aspect-video w-96">
      <Image src={src} alt="preview" className="object-cover" fill />
    </div>
  );
};

const ReOrderButtons = () => {
  const { index, total, reOrder } = useSimpleFormIteratorItem();

  return (
    <>
      <IconButton
        size="small"
        onClick={() => reOrder(index - 1)}
        disabled={index <= 0}
      >
        <ArrowLeft />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => reOrder(index + 1)}
        disabled={total == null || index >= total - 1}
      >
        <ArrowRight />
      </IconButton>
    </>
  );
};

export const RemoveButton = () => {
  const { remove } = useSimpleFormIteratorItem();
  const translate = useTranslate();

  return (
    <Button onClick={() => remove()} color="warning" className="ml-auto!">
      {translate("ra.action.remove")}
    </Button>
  );
};
