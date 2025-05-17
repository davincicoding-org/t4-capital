import {
  AutocompleteInput,
  Create,
  Datagrid,
  Edit,
  List,
  ReferenceField,
  ReferenceInput,
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
  <ReferenceInput source="project_id" reference="project" key="project_id">
    <AutocompleteInput
      variant="outlined"
      filterToQuery={(searchText) => ({ "title@ilike": `%${searchText}%` })}
    />
  </ReferenceInput>,
];

export const ResidenceList = () => (
  <List filters={filters}>
    <Datagrid>
      <ReferenceField source="project_id" reference="project" />
      <TextField source="slug" />
    </Datagrid>
  </List>
);

export const ResidenceCreate = () => (
  <Create>
    <SimpleForm>
      <div className="flex gap-4">
        <ReferenceInput source="project_id" reference="project">
          <AutocompleteInput
            variant="outlined"
            filterToQuery={(searchText) => ({
              "title@ilike": `%${searchText}%`,
            })}
            validate={required("Project is required")}
            helperText={false}
          />
        </ReferenceInput>
        {/* TODO add validation to make sure slug is unique within project */}
        <TextInput
          source="slug"
          variant="outlined"
          validate={required("Slug is required")}
        />
      </div>
    </SimpleForm>
  </Create>
);

export const ResidenceEdit = () => (
  <Edit>
    <TabbedForm>
      <TabbedForm.Tab label="Details">
        <div className="flex gap-4">
          <ReferenceInput source="project_id" reference="project">
            <AutocompleteInput
              variant="outlined"
              filterToQuery={(searchText) => ({
                "title@ilike": `%${searchText}%`,
              })}
              validate={required("Project is required")}
              helperText={false}
            />
          </ReferenceInput>
          {/* TODO add validation to make sure slug is unique within project */}
          <TextInput
            source="slug"
            variant="outlined"
            validate={required("Slug is required")}
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
    </TabbedForm>
  </Edit>
);
