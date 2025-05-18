import {
  Create,
  Datagrid,
  DateInput,
  Edit,
  List,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

import { colorEnum } from "@/database/schema";

export const StrategyList = () => (
  <List sort={{ field: "order", order: "ASC" }}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="title" />
      <TextField source="launch_date" />
    </Datagrid>
  </List>
);

export const StrategyCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput
        source="title"
        variant="outlined"
        validate={required("Title is required")}
        helperText={false}
      />
      <TextInput
        source="description.en"
        label="Description"
        multiline
        variant="outlined"
        validate={required("Description is required")}
        helperText={false}
      />

      <div className="flex gap-2">
        <NumberInput
          source="order"
          variant="outlined"
          validate={required("Order is required")}
          helperText={false}
        />
        <SelectInput
          source="color"
          variant="outlined"
          helperText={false}
          choices={colorEnum.enumValues}
          validate={required("Color is required")}
        />
        <DateInput
          source="launch_date"
          variant="outlined"
          validate={required("Launch date is required")}
          helperText={false}
        />
      </div>

      <TextInput
        source="deck"
        type="url"
        variant="outlined"
        helperText={false}
        validate={required("Deck is required")}
      />
      <TextInput source="video" variant="outlined" helperText={false} />
    </SimpleForm>
  </Create>
);

export const StrategyEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <TextInput
        source="title"
        variant="outlined"
        validate={required("Title is required")}
        helperText={false}
      />
      <TextInput
        source="description.en"
        label="Description"
        multiline
        variant="outlined"
        validate={required("Description is required")}
        helperText={false}
      />

      <div className="flex gap-2">
        <NumberInput
          source="order"
          variant="outlined"
          validate={required("Order is required")}
          helperText={false}
        />
        <SelectInput
          source="color"
          variant="outlined"
          helperText={false}
          choices={colorEnum.enumValues}
          validate={required("Color is required")}
        />
        <DateInput
          source="launch_date"
          variant="outlined"
          validate={required("Launch date is required")}
          helperText={false}
        />
      </div>

      <TextInput
        source="deck"
        type="url"
        variant="outlined"
        helperText={false}
        validate={required("Deck is required")}
      />
      <TextInput source="video" variant="outlined" helperText={false} />
    </SimpleForm>
  </Edit>
);
