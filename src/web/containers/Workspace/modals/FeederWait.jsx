import chainedFunction from 'chained-function';
import PropTypes from 'prop-types';
import React from 'react';
import {Button} from '../../../components/Buttons';
import ModalTemplate from '../../../components/ModalTemplate';
import Modal from '../../../components/Modal';
import controller from '../../../lib/controller';
import i18n from '../../../lib/i18n';

const FeederWait = props => (
  <Modal size="xs" disableOverlay showCloseButton={false}>
    <Modal.Body>
      <ModalTemplate type="warning">
        <h5>{props.title}</h5>
        <p>{i18n._('Waiting for the planner to empty...')}</p>
      </ModalTemplate>
    </Modal.Body>
    <Modal.Footer>
      <Button
        btnStyle="danger"
        onClick={chainedFunction(() => {
          controller.command('feeder:stop');
        }, props.onClose)}
      >
        {i18n._('Stop')}
      </Button>
    </Modal.Footer>
  </Modal>
);

FeederWait.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default FeederWait;
