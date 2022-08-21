import { LinkGroup } from './link-group';
import { SelectGroup } from './select-group';

export const DeviceGroup = ({ data, updateData, definition }) => (
  <div>
    <LinkGroup contents={data} definition={definition} updateData={updateData} />
    <SelectGroup contents={data} definition={definition} updateData={updateData} />
  </div>
);
