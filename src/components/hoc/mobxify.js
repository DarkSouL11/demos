import { inject, observer } from 'mobx-react';
import compose from 'lodash/fp/compose';

function mobxify(...stores) {
  return compose(
    inject(...stores),
    observer
  );
}

export default mobxify;
