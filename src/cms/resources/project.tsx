import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  required,
  SimpleForm,
  TabbedForm,
  TextField,
  TextInput,
  TranslatableInputs,
} from "react-admin";

import { ImageGalleryInput } from "../components/ImageGalleryInput";
import { TranslatableRichTextInput } from "../components/RichTextInput";
import { VideoInput } from "../components/VideoInput";

const filters = [
  <TextInput source="title" key="title" />,
  <DateInput source="created_at" key="created_at" />,
];

export const ProjectList = () => (
  <List filters={filters}>
    <Datagrid>
      <TextField source="title" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const ProjectCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="title"
        variant="outlined"
        validate={required("Title is required")}
        helperText={false}
      />
    </SimpleForm>
  </Create>
);

export const ProjectEdit = () => {
  return (
    <Edit>
      <TabbedForm>
        <TabbedForm.Tab label="Details">
          <div className="flex gap-4">
            <TextInput
              source="title"
              variant="outlined"
              validate={required("Title is required")}
              helperText={false}
            />
            <TextInput
              source="slug"
              variant="outlined"
              validate={required("Slug is required")}
              helperText="Displayed in the URL"
            />
          </div>
          <TranslatableInputs defaultLocale="de" locales={["de", "en"]}>
            <TranslatableRichTextInput
              source="description"
              variant="outlined"
              helperText={false}
            />
          </TranslatableInputs>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Media">
          <VideoInput source="video" label="Hero Video" />
          <ImageGalleryInput source="images" label="Image Gallery" />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Location">
          <TranslatableInputs defaultLocale="de" locales={["de", "en"]}>
            <TranslatableRichTextInput
              source="location_description"
              label="Description"
              variant="outlined"
              helperText={false}
            />
          </TranslatableInputs>
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};
