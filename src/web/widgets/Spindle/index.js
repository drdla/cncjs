import classcat from 'classcat';
import includes from 'lodash/includes';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

import controller from '../../lib/controller';
import i18n from '../../lib/i18n';

import {
  // Controller
  GRBL,
  GRBL_MACHINE_STATE_IDLE,
  GRBL_MACHINE_STATE_RUN,
  MARLIN,
  SMOOTHIE,
  SMOOTHIE_MACHINE_STATE_IDLE,
  SMOOTHIE_MACHINE_STATE_RUN,
  TINYG,
  TINYG_MACHINE_STATE_READY,
  TINYG_MACHINE_STATE_STOP,
  TINYG_MACHINE_STATE_END,
  TINYG_MACHINE_STATE_RUN,
  // Workflow
  WORKFLOW_STATE_RUNNING,
} from '../../constants';

import Spindle from './Spindle';
import Widget from '../../components/Widget';
import WidgetConfig from '../WidgetConfig';

import styles from './index.styl';

class SpindleWidget extends PureComponent {
  static propTypes = {
    widgetId: PropTypes.string.isRequired,
  };

  collapse = () => {
    this.setState({minimized: true});
  };

  expand = () => {
    this.setState({minimized: false});
  };

  config = new WidgetConfig(this.props.widgetId);

  state = this.getInitialState();

  getInitialState() {
    return {
      canClick: false,
      connection: {
        ident: controller.connection.ident,
      },
      controller: {
        modal: {
          coolant: '',
          spindle: '',
        },
        state: controller.state,
        type: controller.type,
      },
      isFullscreen: false,
      minimized: this.config.get('minimized', false),
      spindleSpeed: this.config.get('speed', 1000),
      workflow: {
        state: controller.workflow.state,
      },
    };
  }

  render() {
    const {minimized} = this.state;
    const state = {
      ...this.state,
      canClick: this.canClick(),
    };
    const actions = {...this.actions};

    return (
      <Widget>
        <Widget.Header>
          <Widget.Title>{i18n._('Spindle')}</Widget.Title>
          <Widget.Controls>
            <Widget.Button title={minimized ? i18n._('Expand') : i18n._('Collapse')} onClick={actions.toggleMinimized}>
              <i className={classcat(['fa', {'fa-chevron-up': !minimized}, {'fa-chevron-down': minimized}])} />
            </Widget.Button>
          </Widget.Controls>
        </Widget.Header>
        <Widget.Content className={classcat([styles['widget-content'], {[styles.hidden]: minimized}])}>
          <Spindle state={state} actions={actions} />
        </Widget.Content>
      </Widget>
    );
  }

  actions = {
    handleSpindleSpeedChange: event => {
      const spindleSpeed = Number(event.target.value) || 0;
      this.setState({spindleSpeed});
    },
    toggleMinimized: () => {
      this.setState({minimized: !this.state.minimized});
    },
  };

  controllerEvents = {
    'connection:open': options => {
      const {ident} = options;
      this.setState(state => ({
        connection: {
          ...state.connection,
          ident,
        },
      }));
    },
    'connection:close': () => {
      const initialState = this.getInitialState();
      this.setState({...initialState});
    },
    'workflow:state': workflowState => {
      this.setState(() => ({
        workflow: {
          state: workflowState,
        },
      }));
    },
    'controller:state': (type, state) => {
      // Grbl
      if (type === GRBL) {
        const {modal = {}} = {...state};

        this.setState({
          controller: {
            type,
            state,
            modal: {
              spindle: modal.spindle || '',
              coolant: modal.coolant || '',
            },
          },
        });
      }

      // Marlin
      if (type === MARLIN) {
        const {modal = {}} = {...state};

        this.setState({
          controller: {
            type,
            state,
            modal: {
              spindle: modal.spindle || '',
              coolant: modal.coolant || '',
            },
          },
        });
      }

      // Smoothie
      if (type === SMOOTHIE) {
        const {modal = {}} = {...state};

        this.setState({
          controller: {
            type,
            state,
            modal: {
              spindle: modal.spindle || '',
              coolant: modal.coolant || '',
            },
          },
        });
      }

      // TinyG
      if (type === TINYG) {
        const {modal = {}} = {...state};

        this.setState({
          controller: {
            type,
            state,
            modal: {
              spindle: modal.spindle || '',
              coolant: modal.coolant || '',
            },
          },
        });
      }
    },
  };

  componentDidMount() {
    this.addControllerEvents();
  }

  componentWillUnmount() {
    this.removeControllerEvents();
  }

  componentDidUpdate() {
    const {minimized, spindleSpeed} = this.state;

    this.config.set('minimized', minimized);
    this.config.set('speed', spindleSpeed);
  }

  addControllerEvents() {
    Object.keys(this.controllerEvents).forEach(eventName => {
      const callback = this.controllerEvents[eventName];
      controller.addListener(eventName, callback);
    });
  }

  removeControllerEvents() {
    Object.keys(this.controllerEvents).forEach(eventName => {
      const callback = this.controllerEvents[eventName];
      controller.removeListener(eventName, callback);
    });
  }

  canClick() {
    const machineState = controller.getMachineState();

    if (!controller.connection.ident) {
      return false;
    }

    if (controller.type === GRBL && !includes([GRBL_MACHINE_STATE_IDLE, GRBL_MACHINE_STATE_RUN], machineState)) {
      return false;
    }

    if (controller.type === MARLIN) {
      // Marlin does not have machine state
    }

    if (
      controller.type === SMOOTHIE &&
      !includes([SMOOTHIE_MACHINE_STATE_IDLE, SMOOTHIE_MACHINE_STATE_RUN], machineState)
    ) {
      return false;
    }

    if (
      controller.type === TINYG &&
      !includes(
        [TINYG_MACHINE_STATE_READY, TINYG_MACHINE_STATE_STOP, TINYG_MACHINE_STATE_END, TINYG_MACHINE_STATE_RUN],
        machineState
      )
    ) {
      return false;
    }

    if (controller.workflow.state === WORKFLOW_STATE_RUNNING) {
      return false;
    }

    return true;
  }
}

export default SpindleWidget;
