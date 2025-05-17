import type { FieldProps, FileInputProps } from "react-admin";
import { Movie } from "@mui/icons-material";
import { FileInput, useFieldValue } from "react-admin";

export function VideoInput(props: FileInputProps) {
  return (
    <FileInput
      helperText={false}
      accept={{ "video/mp4": [".mp4"] }}
      sx={{
        ...props.sx,
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
          position: "relative",
        },
        ".RaFileInputPreview-removeButton": {
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
        },
        ".RaFileInput-dropZone:has(+ .previews:not(:empty))": {
          display: "none",
        },
      }}
      placeholder={
        <div className="flex flex-col items-center gap-1">
          <Movie fontSize="large" />
          <span>
            Drop a video file to upload,
            <br /> or click to select it.
          </span>
        </div>
      }
      {...props}
    >
      <VideoPreview source="src" />
    </FileInput>
  );
}

const VideoPreview = (props: FieldProps) => {
  const src = useFieldValue(props) as string;
  return (
    <video
      controls
      className="aspect-video w-full object-cover"
      preload="auto"
      src={src}
    />
  );
};
