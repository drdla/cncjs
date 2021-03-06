import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import React, {PureComponent} from 'react';

import i18n from '../../../../lib/i18n';
import * as validations from '../../../../lib/validations';

import Modal from '../../../../components/Modal';
import Space from '../../../../components/Space';
import {Button} from '../../../../components/Buttons';
import {Form, Input, Textarea} from '../../../../components/Validation';
import {FormGroup} from '../../../../components/Forms';
import {ToastNotification} from '../../../../components/Notifications';

class CreateRecord extends PureComponent {
  static propTypes = {
    action: PropTypes.object,
    state: PropTypes.object,
  };

  slider = null;

  get value() {
    const {name, command} = this.form.getValues();

    return {
      command,
      grid: {
        xs: this.slider.state.value,
      },
      name,
    };
  }
  render() {
    const {action, state} = this.props;
    const {modal} = state;
    const {alertMessage} = modal.params;

    return (
      <Modal disableOverlay size="sm" onClose={action.closeModal}>
        <Modal.Header>
          <Modal.Title>
            {i18n._('Custom Commands')}
            <Space width="8" />
            &rsaquo;
            <Space width="8" />
            {i18n._('New')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertMessage && (
            <ToastNotification
              style={{margin: '-16px -24px 10px -24px'}}
              type="error"
              onDismiss={() => {
                action.updateModalParams({alertMessage: ''});
              }}
            >
              {alertMessage}
            </ToastNotification>
          )}
          <Form
            ref={node => {
              this.form = node;
            }}
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            <FormGroup>
              <label>{i18n._('Name')}</label>
              <Input
                type="text"
                name="name"
                value=""
                className="form-control short"
                validations={[validations.required]}
              />
            </FormGroup>
            <FormGroup>
              <label>{i18n._('Command')}</label>
              <Textarea
                name="command"
                value=""
                rows="5"
                className="form-control long"
                validations={[validations.required]}
              />
            </FormGroup>
            <FormGroup>
              <label>{i18n._('Button Width')}</label>
              <Slider
                ref={node => {
                  this.slider = node;
                }}
                dots
                marks={{
                  1: (
                    <span>
                      <sup>1</sup>/<sub>12</sub>
                    </span>
                  ),
                  2: (
                    <span>
                      <sup>1</sup>/<sub>6</sub>
                    </span>
                  ),
                  3: (
                    <span>
                      <sup>1</sup>/<sub>4</sub>
                    </span>
                  ),
                  4: (
                    <span>
                      <sup>1</sup>/<sub>3</sub>
                    </span>
                  ),
                  5: (
                    <span>
                      <sup>5</sup>/<sub>12</sub>
                    </span>
                  ),
                  6: (
                    <span>
                      <sup>1</sup>/<sub>2</sub>
                    </span>
                  ),
                  7: (
                    <span>
                      <sup>7</sup>/<sub>12</sub>
                    </span>
                  ),
                  8: (
                    <span>
                      <sup>2</sup>/<sub>3</sub>
                    </span>
                  ),
                  9: (
                    <span>
                      <sup>3</sup>/<sub>4</sub>
                    </span>
                  ),
                  10: (
                    <span>
                      <sup>5</sup>/<sub>6</sub>
                    </span>
                  ),
                  11: (
                    <span>
                      <sup>11</sup>/<sub>12</sub>
                    </span>
                  ),
                  12: '100%',
                }}
                included={false}
                defaultValue={6}
                min={1}
                max={12}
                step={1}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button btnStyle="default" onClick={action.closeModal}>
            {i18n._('Cancel')}
          </Button>
          <Button
            btnStyle="primary"
            onClick={() => {
              this.form.validate(err => {
                if (err) {
                  return;
                }

                const {name, command, grid} = this.value;
                action.createRecord({name, command, grid});
              });
            }}
          >
            {i18n._('OK')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateRecord;
