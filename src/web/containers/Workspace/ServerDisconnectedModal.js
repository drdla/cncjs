import React from 'react';

import i18n from '../../lib/i18n';

import Button from '../../components_new/Button';
import Dialog, {DialogHeader, DialogActions} from '../../components_new/Dialog';

const reloadPage = (forcedReload = true) => {
  // true => reload the current page without using the cache
  window.location.reload(forcedReload);
};

const ServerDisconnectedModal = () => (
  <Dialog>
    <DialogHeader>{i18n._('Server has stopped working')}</DialogHeader>
    <p>{i18n._('A problem caused the server to stop working correctly. Check out the server status and try again.')}</p>
    <DialogActions>
      <Button text={i18n._('Reload')} onClick={reloadPage} />
    </DialogActions>
  </Dialog>
);

export default ServerDisconnectedModal;
