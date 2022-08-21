import React from 'react';
import { Backspace } from '@mui/icons-material';
import { Constants } from '../../../../config';

const LinkElement = ({ el, definition, updateData }) => (
  <div>
    {el.split(Constants.PairSeparator)[0]}
    <div>
      <Backspace onClick={() => updateData(null, el, definition.fieldName, definition.fieldFormat)} />
    </div>
  </div>
);
const MemoLinkElement = React.memo(LinkElement);

export const LinkGroup = ({ contents, definition, updateData }) => (
  <div>
    <ul>
      {contents?.map(el => (
        <li key={el}>
          <MemoLinkElement definition={definition} el={el} updateData={updateData} />
        </li>
      ))}
    </ul>
  </div>
);
