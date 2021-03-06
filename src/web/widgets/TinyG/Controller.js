import PropTypes from 'prop-types';
import React from 'react';

import i18n from '../../lib/i18n';

import Modal from '../../components/Modal';
import {Button} from '../../components/Buttons';
import {Nav, NavItem} from '../../components/Navs';

import './index.scss';

const Controller = props => {
  const {state, actions} = props;
  const {activeTab = 'state'} = state.modal.params;
  const height = Math.max(window.innerHeight / 2, 200);

  return (
    <Modal size="lg" onClose={actions.closeModal}>
      <Modal.Header>
        <Modal.Title>TinyG</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav
          navStyle="tabs"
          activeKey={activeTab}
          onSelect={eventKey => {
            actions.updateModalParams({activeTab: eventKey});
          }}
          style={{marginBottom: 10}}
        >
          <NavItem eventKey="state">{i18n._('Controller State')}</NavItem>
          <NavItem eventKey="settings">{i18n._('Controller Settings')}</NavItem>
        </Nav>
        <div className="nav-content" style={{height}}>
          {activeTab === 'state' && (
            <pre className="pre">
              <code>{JSON.stringify(state.controller.state, null, 4)}</code>
            </pre>
          )}
          {activeTab === 'settings' && (
            <pre className="pre">
              <code>{JSON.stringify(state.controller.settings, null, 4)}</code>
            </pre>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={actions.closeModal}>{i18n._('Close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

Controller.propTypes = {
  actions: PropTypes.object,
  state: PropTypes.object,
};

export default Controller;
