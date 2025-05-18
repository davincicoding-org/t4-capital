import {
  Create,
  Datagrid,
  Edit,
  List,
  NumberInput,
  required,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

export const TeamMemberList = () => (
  <List sort={{ field: "order", order: "ASC" }}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="name" />
    </Datagrid>
  </List>
);

export const TeamMemberCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput
        source="name"
        variant="outlined"
        validate={required("Name is required")}
        helperText={false}
      />
      <TextInput
        source="linked_in_url"
        type="url"
        variant="outlined"
        validate={required("LinkedIn URL is required")}
        helperText={false}
      />
      <NumberInput
        source="order"
        variant="outlined"
        validate={required("Order is required")}
        helperText={false}
      />
    </SimpleForm>
  </Create>
);

export const TeamMemberEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <TextInput
        source="name"
        variant="outlined"
        validate={required("Name is required")}
        helperText={false}
      />
      <TextInput
        source="linked_in_url"
        type="url"
        variant="outlined"
        validate={required("LinkedIn URL is required")}
        helperText={false}
      />
      <NumberInput
        source="order"
        variant="outlined"
        validate={required("Order is required")}
        helperText={false}
      />
    </SimpleForm>
  </Edit>
);
