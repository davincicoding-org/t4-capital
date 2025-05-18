import {
  Create,
  Datagrid,
  Edit,
  List,
  ReferenceField,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

export const SecurityList = () => (
  <List sort={{ field: "isin", order: "ASC" }}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="isin" label="ISIN" />
      <ReferenceField
        source="strategy_id"
        reference="strategy"
        label="Strategy"
      />
    </Datagrid>
  </List>
);

export const SecurityCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput
        source="isin"
        label="ISIN"
        variant="outlined"
        validate={required("ISIN is required")}
        helperText={false}
      />
      <TextInput
        source="password"
        variant="outlined"
        validate={required("Password is required")}
        helperText={false}
      />
      <ReferenceInput
        source="strategy_id"
        label="Strategy"
        reference="strategy"
      >
        <SelectInput
          variant="outlined"
          validate={required("Strategy is required")}
          helperText={false}
        />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const SecurityEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <TextInput
        source="isin"
        label="ISIN"
        variant="outlined"
        validate={required("ISIN is required")}
        helperText={false}
      />
      <TextInput
        source="password"
        variant="outlined"
        validate={required("Password is required")}
        helperText={false}
      />

      <ReferenceInput
        source="strategy_id"
        label="Strategy"
        reference="strategy"
      >
        <SelectInput
          variant="outlined"
          validate={required("Strategy is required")}
          helperText={false}
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
