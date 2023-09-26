import React from 'react';
import {} from '@backstage/plugin-scaffolder-react';
import {
  ScaffolderField,
  createNextScaffolderFieldExtension,
  NextFieldExtensionComponentProps,
} from '@backstage/plugin-scaffolder-react/alpha';

import { useFetch } from 'usehooks-ts';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { scaffolderPlugin } from '@backstage/plugin-scaffolder';

const ClusterPicker = (props: NextFieldExtensionComponentProps<{}>) => {
  const { data } = useFetch<{ clusters: { id: string; name: string }[] }>(
    'http://localhost:7007/api/clusters/list',
  );

  const [value, setValue] = React.useState('');

  if (!data) {
    return null;
  }

  return (
    <ScaffolderField {...props} rawDescription={props.schema.description}>
      <InputLabel htmlFor={props.schema.title}>{props.schema.title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={v => {
          setValue(v.target.value as string);
          props.onChange(v.target.value as string);
        }}
      >
        {data.clusters.map(cluster => {
          return <MenuItem value={cluster.id}>{cluster.name}</MenuItem>;
        })}
      </Select>
    </ScaffolderField>
  );
};

export const ClusterPickerFieldExtension = scaffolderPlugin.provide(
  createNextScaffolderFieldExtension({
    component: ClusterPicker,
    name: 'ClusterPickerFieldExtension',
  }),
);
