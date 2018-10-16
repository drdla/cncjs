import chainedFunction from 'chained-function';
import ensureArray from 'ensure-array';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {noop} from 'lodash';

import controller from '../../lib/controller';
import i18n from '../../lib/i18n';

import {AXIS_E, AXIS_X, AXIS_Y, AXIS_Z, AXIS_A, AXIS_B, AXIS_C} from '../../constants';

import AxisLabel from './components/AxisLabel';
import Dropdown, {MenuItem} from '../../components/Dropdown';
import Image from '../../components/Image';
import PositionInput from './components/PositionInput';
import PositionLabel from './components/PositionLabel';
import Taskbar from './components/Taskbar';
import TaskbarButton from './components/TaskbarButton';
import {Tooltip} from '../../components/Tooltip';

import iconHome from './images/home.svg';
import iconMinus from './images/minus.svg';
import iconPencil from './images/pencil.svg';
import iconPin from './images/pin.svg';
import iconPlus from './images/plus.svg';

class DisplayPanel extends PureComponent {
  static propTypes = {
    actions: PropTypes.object,
    state: PropTypes.object,
  };

  state = {
    positionInput: {
      [AXIS_E]: false,
      [AXIS_X]: false,
      [AXIS_Y]: false,
      [AXIS_Z]: false,
      [AXIS_A]: false,
      [AXIS_B]: false,
      [AXIS_C]: false,
    },
  };

  render() {
    const {state} = this.props;
    const {axes, machinePosition, workPosition} = state;

    const hasAxisE = machinePosition.e !== undefined && workPosition.e !== undefined;
    const hasAxisX = axes.includes(AXIS_X);
    const hasAxisY = axes.includes(AXIS_Y);
    const hasAxisZ = axes.includes(AXIS_Z);
    const hasAxisA = axes.includes(AXIS_A);
    const hasAxisB = axes.includes(AXIS_B);
    const hasAxisC = axes.includes(AXIS_C);

    return (
      <div className="display-panel">
        <table>
          <thead>
            <tr>
              <th />
              <th className="nowrap text--right" style={{color: 'hsl(38, 13%, 42%)'}}>
                {i18n._('Machine Position')}
              </th>
              <th className="nowrap text--right" style={{color: 'hsl(38, 13%, 42%)'}}>
                {i18n._('Work Position')}
              </th>
              <th className="nowrap action">{this.renderActionDropdown()}</th>
            </tr>
          </thead>
          <tbody>
            {hasAxisE && this.renderAxis(AXIS_E)}
            {hasAxisX && this.renderAxis(AXIS_X)}
            {hasAxisY && this.renderAxis(AXIS_Y)}
            {hasAxisZ && this.renderAxis(AXIS_Z)}
            {hasAxisA && this.renderAxis(AXIS_A)}
            {hasAxisB && this.renderAxis(AXIS_B)}
            {hasAxisC && this.renderAxis(AXIS_C)}
          </tbody>
        </table>
      </div>
    );
  }

  handleSelect = eventKey => {
    const commands = ensureArray(eventKey);
    commands.forEach(command => controller.command('gcode', command));
  };

  showPositionInput = axis => () => {
    this.setState(state => ({
      positionInput: {
        ...state.positionInput,
        [axis]: true,
      },
    }));
  };

  hidePositionInput = axis => () => {
    this.setState(state => ({
      positionInput: {
        ...state.positionInput,
        [axis]: false,
      },
    }));
  };

  renderActionDropdown = () => {
    const {canClick} = this.props.state;
    const {wcs} = controller.getModalState();

    return (
      <Dropdown pullRight disabled={!canClick} onSelect={this.handleSelect}>
        <Dropdown.Toggle className="action-dropdown" btnStyle="link" compact noCaret>
          <i className="fa fa-fw fa-caret-down" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem header>{i18n._('Work Coordinate System ({{wcs}})', {wcs})}</MenuItem>
          <MenuItem eventKey="G0 X0 Y0 Z0" disabled={!canClick}>
            {i18n._('Go To Work Zero (G0 X0 Y0 Z0)')}
          </MenuItem>
          {wcs === 'G54' && (
            <MenuItem eventKey="G10 L20 P1 X0 Y0 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Offsets (G10 L20 P1 X0 Y0 Z0)')}
            </MenuItem>
          )}
          {wcs === 'G55' && (
            <MenuItem eventKey="G10 L20 P2 X0 Y0 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Offsets (G10 L20 P2 X0 Y0 Z0)')}
            </MenuItem>
          )}
          {wcs === 'G56' && (
            <MenuItem eventKey="G10 L20 P3 X0 Y0 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Offsets (G10 L20 P3 X0 Y0 Z0)')}
            </MenuItem>
          )}
          {wcs === 'G57' && (
            <MenuItem eventKey="G10 L20 P4 X0 Y0 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Offsets (G10 L20 P4 X0 Y0 Z0)')}
            </MenuItem>
          )}
          {wcs === 'G58' && (
            <MenuItem eventKey="G10 L20 P5 X0 Y0 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Offsets (G10 L20 P5 X0 Y0 Z0)')}
            </MenuItem>
          )}
          {wcs === 'G59' && (
            <MenuItem eventKey="G10 L20 P6 X0 Y0 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Offsets (G10 L20 P6 X0 Y0 Z0)')}
            </MenuItem>
          )}
          <MenuItem divider />
          <MenuItem header>{i18n._('Temporary Offsets (G92)')}</MenuItem>
          <MenuItem eventKey="G92 X0 Y0 Z0" disabled={!canClick}>
            {i18n._('Zero Out Temporary Offsets (G92 X0 Y0 Z0)')}
          </MenuItem>
          <MenuItem eventKey="G92.1 X0 Y0 Z0" disabled={!canClick}>
            {i18n._('Un-Zero Out Temporary Offsets (G92.1 X0 Y0 Z0)')}
          </MenuItem>
          <MenuItem divider />
          <MenuItem header>{i18n._('Machine Coordinate System (G53)')}</MenuItem>
          <MenuItem eventKey="G53 G0 X0 Y0 Z0" disabled={!canClick}>
            {i18n._('Go To Machine Zero (G53 G0 X0 Y0 Z0)')}
          </MenuItem>
          <MenuItem eventKey="G28.3 X0 Y0 Z0" disabled={!canClick}>
            {i18n._('Set Machine Zero (G28.3 X0 Y0 Z0)')}
          </MenuItem>
          <MenuItem eventKey="G28.2 X0 Y0 Z0" disabled={!canClick}>
            {i18n._('Homing Sequence (G28.2 X0 Y0 Z0)')}
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  renderActionDropdownForAxisE = () => {
    // TODO
    return null;
  };

  renderActionDropdownForAxisX = () => {
    const {canClick} = this.props.state;
    const {wcs} = controller.getModalState();

    return (
      <Dropdown pullRight disabled={!canClick} onSelect={this.handleSelect}>
        <Dropdown.Toggle className="action-dropdown" btnStyle="link" compact noCaret>
          <i className="fa fa-fw fa-ellipsis-v" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {wcs === 'G54' && <MenuItem header>{i18n._('Work Coordinate System (G54)')}</MenuItem>}
          {wcs === 'G55' && <MenuItem header>{i18n._('Work Coordinate System (G55)')}</MenuItem>}
          {wcs === 'G56' && <MenuItem header>{i18n._('Work Coordinate System (G56)')}</MenuItem>}
          {wcs === 'G57' && <MenuItem header>{i18n._('Work Coordinate System (G57)')}</MenuItem>}
          {wcs === 'G58' && <MenuItem header>{i18n._('Work Coordinate System (G58)')}</MenuItem>}
          {wcs === 'G59' && <MenuItem header>{i18n._('Work Coordinate System (G59)')}</MenuItem>}
          <MenuItem eventKey="G0 X0" disabled={!canClick}>
            {i18n._('Go To Work Zero On X Axis (G0 X0)')}
          </MenuItem>
          {wcs === 'G54' && (
            <MenuItem eventKey="G10 L20 P1 X0" disabled={!canClick}>
              {i18n._('Zero Out Work X Axis (G10 L20 P1 X0)')}
            </MenuItem>
          )}
          {wcs === 'G55' && (
            <MenuItem eventKey="G10 L20 P2 X0" disabled={!canClick}>
              {i18n._('Zero Out Work X Axis (G10 L20 P2 X0)')}
            </MenuItem>
          )}
          {wcs === 'G56' && (
            <MenuItem eventKey="G10 L20 P3 X0" disabled={!canClick}>
              {i18n._('Zero Out Work X Axis (G10 L20 P3 X0)')}
            </MenuItem>
          )}
          {wcs === 'G57' && (
            <MenuItem eventKey="G10 L20 P4 X0" disabled={!canClick}>
              {i18n._('Zero Out Work X Axis (G10 L20 P4 X0)')}
            </MenuItem>
          )}
          {wcs === 'G58' && (
            <MenuItem eventKey="G10 L20 P5 X0" disabled={!canClick}>
              {i18n._('Zero Out Work X Axis (G10 L20 P5 X0)')}
            </MenuItem>
          )}
          {wcs === 'G59' && (
            <MenuItem eventKey="G10 L20 P6 X0" disabled={!canClick}>
              {i18n._('Zero Out Work X Axis (G10 L20 P6 X0)')}
            </MenuItem>
          )}
          <MenuItem divider />
          <MenuItem header>{i18n._('Temporary Offsets (G92)')}</MenuItem>
          <MenuItem eventKey="G92 X0" disabled={!canClick}>
            {i18n._('Zero Out Temporary X Axis (G92 X0)')}
          </MenuItem>
          <MenuItem eventKey="G92.1 X0" disabled={!canClick}>
            {i18n._('Un-Zero Out Temporary X Axis (G92.1 X0)')}
          </MenuItem>
          <MenuItem divider />
          <MenuItem header>{i18n._('Machine Coordinate System (G53)')}</MenuItem>
          <MenuItem eventKey="G53 G0 X0" disabled={!canClick}>
            {i18n._('Go To Machine Zero On X Axis (G53 G0 X0)')}
          </MenuItem>
          <MenuItem eventKey="G28.3 X0" disabled={!canClick}>
            {i18n._('Zero Out Machine X Axis (G28.3 X0)')}
          </MenuItem>
          <MenuItem eventKey="G28.2 X0" disabled={!canClick}>
            {i18n._('Home Machine X Axis (G28.2 X0)')}
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  renderActionDropdownForAxisY = () => {
    const {canClick} = this.props.state;
    const {wcs} = controller.getModalState();

    return (
      <Dropdown pullRight disabled={!canClick} onSelect={this.handleSelect}>
        <Dropdown.Toggle className="action-dropdown" btnStyle="link" compact noCaret>
          <i className="fa fa-fw fa-ellipsis-v" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {wcs === 'G54' && <MenuItem header>{i18n._('Work Coordinate System (G54)')}</MenuItem>}
          {wcs === 'G55' && <MenuItem header>{i18n._('Work Coordinate System (G55)')}</MenuItem>}
          {wcs === 'G56' && <MenuItem header>{i18n._('Work Coordinate System (G56)')}</MenuItem>}
          {wcs === 'G57' && <MenuItem header>{i18n._('Work Coordinate System (G57)')}</MenuItem>}
          {wcs === 'G58' && <MenuItem header>{i18n._('Work Coordinate System (G58)')}</MenuItem>}
          {wcs === 'G59' && <MenuItem header>{i18n._('Work Coordinate System (G59)')}</MenuItem>}
          <MenuItem eventKey="G0 Y0" disabled={!canClick}>
            {i18n._('Go To Work Zero On Y Axis (G0 Y0)')}
          </MenuItem>
          {wcs === 'G54' && (
            <MenuItem eventKey="G10 L20 P1 Y0" disabled={!canClick}>
              {i18n._('Zero Out Work Y Axis (G10 L20 P1 Y0)')}
            </MenuItem>
          )}
          {wcs === 'G55' && (
            <MenuItem eventKey="G10 L20 P2 Y0" disabled={!canClick}>
              {i18n._('Zero Out Work Y Axis (G10 L20 P2 Y0)')}
            </MenuItem>
          )}
          {wcs === 'G56' && (
            <MenuItem eventKey="G10 L20 P3 Y0" disabled={!canClick}>
              {i18n._('Zero Out Work Y Axis (G10 L20 P3 Y0)')}
            </MenuItem>
          )}
          {wcs === 'G57' && (
            <MenuItem eventKey="G10 L20 P4 Y0" disabled={!canClick}>
              {i18n._('Zero Out Work Y Axis (G10 L20 P4 Y0)')}
            </MenuItem>
          )}
          {wcs === 'G58' && (
            <MenuItem eventKey="G10 L20 P5 Y0" disabled={!canClick}>
              {i18n._('Zero Out Work Y Axis (G10 L20 P5 Y0)')}
            </MenuItem>
          )}
          {wcs === 'G59' && (
            <MenuItem eventKey="G10 L20 P6 Y0" disabled={!canClick}>
              {i18n._('Zero Out Work Y Axis (G10 L20 P6 Y0)')}
            </MenuItem>
          )}
          <MenuItem divider />
          <MenuItem header>{i18n._('Temporary Offsets (G92)')}</MenuItem>
          <MenuItem eventKey="G92 Y0" disabled={!canClick}>
            {i18n._('Zero Out Temporary Y Axis (G92 Y0)')}
          </MenuItem>
          <MenuItem eventKey="G92.1 Y0" disabled={!canClick}>
            {i18n._('Un-Zero Out Temporary Y Axis (G92.1 Y0)')}
          </MenuItem>
          <MenuItem divider />
          <MenuItem header>{i18n._('Machine Coordinate System (G53)')}</MenuItem>
          <MenuItem eventKey="G53 G0 Y0" disabled={!canClick}>
            {i18n._('Go To Machine Zero On Y Axis (G53 G0 Y0)')}
          </MenuItem>
          <MenuItem eventKey="G28.3 Y0" disabled={!canClick}>
            {i18n._('Zero Out Machine Y Axis (G28.3 Y0)')}
          </MenuItem>
          <MenuItem eventKey="G28.2 Y0" disabled={!canClick}>
            {i18n._('Home Machine Y Axis (G28.2 Y0)')}
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  renderActionDropdownForAxisZ = () => {
    const {canClick} = this.props.state;
    const {wcs} = controller.getModalState();

    return (
      <Dropdown pullRight disabled={!canClick} onSelect={this.handleSelect}>
        <Dropdown.Toggle className="action-dropdown" btnStyle="link" compact noCaret>
          <i className="fa fa-fw fa-ellipsis-v" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {wcs === 'G54' && <MenuItem header>{i18n._('Work Coordinate System (G54)')}</MenuItem>}
          {wcs === 'G55' && <MenuItem header>{i18n._('Work Coordinate System (G55)')}</MenuItem>}
          {wcs === 'G56' && <MenuItem header>{i18n._('Work Coordinate System (G56)')}</MenuItem>}
          {wcs === 'G57' && <MenuItem header>{i18n._('Work Coordinate System (G57)')}</MenuItem>}
          {wcs === 'G58' && <MenuItem header>{i18n._('Work Coordinate System (G58)')}</MenuItem>}
          {wcs === 'G59' && <MenuItem header>{i18n._('Work Coordinate System (G59)')}</MenuItem>}
          <MenuItem eventKey="G0 Z0" disabled={!canClick}>
            {i18n._('Go To Work Zero On Z Axis (G0 Z0)')}
          </MenuItem>
          {wcs === 'G54' && (
            <MenuItem eventKey="G10 L20 P1 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Z Axis (G10 L20 P1 Z0)')}
            </MenuItem>
          )}
          {wcs === 'G55' && (
            <MenuItem eventKey="G10 L20 P2 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Z Axis (G10 L20 P2 Z0)')}
            </MenuItem>
          )}
          {wcs === 'G56' && (
            <MenuItem eventKey="G10 L20 P3 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Z Axis (G10 L20 P3 Z0)')}
            </MenuItem>
          )}
          {wcs === 'G57' && (
            <MenuItem eventKey="G10 L20 P4 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Z Axis (G10 L20 P4 Z0)')}
            </MenuItem>
          )}
          {wcs === 'G58' && (
            <MenuItem eventKey="G10 L20 P5 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Z Axis (G10 L20 P5 Z0)')}
            </MenuItem>
          )}
          {wcs === 'G59' && (
            <MenuItem eventKey="G10 L20 P6 Z0" disabled={!canClick}>
              {i18n._('Zero Out Work Z Axis (G10 L20 P6 Z0)')}
            </MenuItem>
          )}
          <MenuItem divider />
          <MenuItem header>{i18n._('Temporary Offsets (G92)')}</MenuItem>
          <MenuItem eventKey="G92 Z0" disabled={!canClick}>
            {i18n._('Zero Out Temporary Z Axis (G92 Z0)')}
          </MenuItem>
          <MenuItem eventKey="G92.1 Z0" disabled={!canClick}>
            {i18n._('Un-Zero Out Temporary Z Axis (G92.1 Z0)')}
          </MenuItem>
          <MenuItem divider />
          <MenuItem header>{i18n._('Machine Coordinate System (G53)')}</MenuItem>
          <MenuItem eventKey="G53 G0 Z0" disabled={!canClick}>
            {i18n._('Go To Machine Zero On Z Axis (G53 G0 Z0)')}
          </MenuItem>
          <MenuItem eventKey="G28.3 Z0" disabled={!canClick}>
            {i18n._('Zero Out Machine Z Axis (G28.3 Z0)')}
          </MenuItem>
          <MenuItem eventKey="G28.2 Z0" disabled={!canClick}>
            {i18n._('Home Machine Z Axis (G28.2 Z0)')}
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  renderActionDropdownForAxisA = () => {
    const {canClick} = this.props.state;
    const {wcs} = controller.getModalState();

    return (
      <Dropdown pullRight disabled={!canClick} onSelect={this.handleSelect}>
        <Dropdown.Toggle className="action-dropdown" btnStyle="link" compact noCaret>
          <i className="fa fa-fw fa-ellipsis-v" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {wcs === 'G54' && <MenuItem header>{i18n._('Work Coordinate System (G54)')}</MenuItem>}
          {wcs === 'G55' && <MenuItem header>{i18n._('Work Coordinate System (G55)')}</MenuItem>}
          {wcs === 'G56' && <MenuItem header>{i18n._('Work Coordinate System (G56)')}</MenuItem>}
          {wcs === 'G57' && <MenuItem header>{i18n._('Work Coordinate System (G57)')}</MenuItem>}
          {wcs === 'G58' && <MenuItem header>{i18n._('Work Coordinate System (G58)')}</MenuItem>}
          {wcs === 'G59' && <MenuItem header>{i18n._('Work Coordinate System (G59)')}</MenuItem>}
          <MenuItem eventKey="G0 A0" disabled={!canClick}>
            {i18n._('Go To Work Zero On A Axis (G0 A0)')}
          </MenuItem>
          {wcs === 'G54' && (
            <MenuItem eventKey="G10 L20 P1 A0" disabled={!canClick}>
              {i18n._('Zero Out Work A Axis (G10 L20 P1 A0)')}
            </MenuItem>
          )}
          {wcs === 'G55' && (
            <MenuItem eventKey="G10 L20 P2 A0" disabled={!canClick}>
              {i18n._('Zero Out Work A Axis (G10 L20 P2 A0)')}
            </MenuItem>
          )}
          {wcs === 'G56' && (
            <MenuItem eventKey="G10 L20 P3 A0" disabled={!canClick}>
              {i18n._('Zero Out Work A Axis (G10 L20 P3 A0)')}
            </MenuItem>
          )}
          {wcs === 'G57' && (
            <MenuItem eventKey="G10 L20 P4 A0" disabled={!canClick}>
              {i18n._('Zero Out Work A Axis (G10 L20 P4 A0)')}
            </MenuItem>
          )}
          {wcs === 'G58' && (
            <MenuItem eventKey="G10 L20 P5 A0" disabled={!canClick}>
              {i18n._('Zero Out Work A Axis (G10 L20 P5 A0)')}
            </MenuItem>
          )}
          {wcs === 'G59' && (
            <MenuItem eventKey="G10 L20 P6 A0" disabled={!canClick}>
              {i18n._('Zero Out Work A Axis (G10 L20 P6 A0)')}
            </MenuItem>
          )}
          <MenuItem divider />
          <MenuItem header>{i18n._('Temporary Offsets (G92)')}</MenuItem>
          <MenuItem eventKey="G92 A0" disabled={!canClick}>
            {i18n._('Zero Out Temporary A Axis (G92 A0)')}
          </MenuItem>
          <MenuItem eventKey="G92.1 A0" disabled={!canClick}>
            {i18n._('Un-Zero Out Temporary A Axis (G92.1 A0)')}
          </MenuItem>
          <MenuItem divider />
          <MenuItem header>{i18n._('Machine Coordinate System (G53)')}</MenuItem>
          <MenuItem eventKey="G53 G0 A0" disabled={!canClick}>
            {i18n._('Go To Machine Zero On A Axis (G53 G0 A0)')}
          </MenuItem>
          <MenuItem eventKey="G28.3 A0" disabled={!canClick}>
            {i18n._('Zero Out Machine A Axis (G28.3 A0)')}
          </MenuItem>
          <MenuItem eventKey="G28.2 A0" disabled={!canClick}>
            {i18n._('Home Machine A Axis (G28.2 A0)')}
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  renderActionDropdownForAxisB = () => {
    const {canClick} = this.props.state;
    const {wcs} = controller.getModalState();

    return (
      <Dropdown pullRight disabled={!canClick} onSelect={this.handleSelect}>
        <Dropdown.Toggle className="action-dropdown" btnStyle="link" compact noCaret>
          <i className="fa fa-fw fa-ellipsis-v" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {wcs === 'G54' && <MenuItem header>{i18n._('Work Coordinate System (G54)')}</MenuItem>}
          {wcs === 'G55' && <MenuItem header>{i18n._('Work Coordinate System (G55)')}</MenuItem>}
          {wcs === 'G56' && <MenuItem header>{i18n._('Work Coordinate System (G56)')}</MenuItem>}
          {wcs === 'G57' && <MenuItem header>{i18n._('Work Coordinate System (G57)')}</MenuItem>}
          {wcs === 'G58' && <MenuItem header>{i18n._('Work Coordinate System (G58)')}</MenuItem>}
          {wcs === 'G59' && <MenuItem header>{i18n._('Work Coordinate System (G59)')}</MenuItem>}
          <MenuItem eventKey="G0 B0" disabled={!canClick}>
            {i18n._('Go To Work Zero On B Axis (G0 B0)')}
          </MenuItem>
          {wcs === 'G54' && (
            <MenuItem eventKey="G10 L20 P1 B0" disabled={!canClick}>
              {i18n._('Zero Out Work B Axis (G10 L20 P1 B0)')}
            </MenuItem>
          )}
          {wcs === 'G55' && (
            <MenuItem eventKey="G10 L20 P2 B0" disabled={!canClick}>
              {i18n._('Zero Out Work B Axis (G10 L20 P2 B0)')}
            </MenuItem>
          )}
          {wcs === 'G56' && (
            <MenuItem eventKey="G10 L20 P3 B0" disabled={!canClick}>
              {i18n._('Zero Out Work B Axis (G10 L20 P3 B0)')}
            </MenuItem>
          )}
          {wcs === 'G57' && (
            <MenuItem eventKey="G10 L20 P4 B0" disabled={!canClick}>
              {i18n._('Zero Out Work B Axis (G10 L20 P4 B0)')}
            </MenuItem>
          )}
          {wcs === 'G58' && (
            <MenuItem eventKey="G10 L20 P5 B0" disabled={!canClick}>
              {i18n._('Zero Out Work B Axis (G10 L20 P5 B0)')}
            </MenuItem>
          )}
          {wcs === 'G59' && (
            <MenuItem eventKey="G10 L20 P6 B0" disabled={!canClick}>
              {i18n._('Zero Out Work B Axis (G10 L20 P6 B0)')}
            </MenuItem>
          )}
          <MenuItem divider />
          <MenuItem header>{i18n._('Temporary Offsets (G92)')}</MenuItem>
          <MenuItem eventKey="G92 B0" disabled={!canClick}>
            {i18n._('Zero Out Temporary B Axis (G92 B0)')}
          </MenuItem>
          <MenuItem eventKey="G92.1 B0" disabled={!canClick}>
            {i18n._('Un-Zero Out Temporary B Axis (G92.1 B0)')}
          </MenuItem>
          <MenuItem divider />
          <MenuItem header>{i18n._('Machine Coordinate System (G53)')}</MenuItem>
          <MenuItem eventKey="G53 G0 B0" disabled={!canClick}>
            {i18n._('Go To Machine Zero On B Axis (G53 G0 B0)')}
          </MenuItem>
          <MenuItem eventKey="G28.3 B0" disabled={!canClick}>
            {i18n._('Zero Out Machine B Axis (G28.3 B0)')}
          </MenuItem>
          <MenuItem eventKey="G28.2 B0" disabled={!canClick}>
            {i18n._('Home Machine B Axis (G28.2 B0)')}
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  renderActionDropdownForAxisC = () => {
    const {canClick} = this.props.state;
    const {wcs} = controller.getModalState();

    return (
      <Dropdown pullRight disabled={!canClick} onSelect={this.handleSelect}>
        <Dropdown.Toggle className="action-dropdown" btnStyle="link" compact noCaret>
          <i className="fa fa-fw fa-ellipsis-v" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {wcs === 'G54' && <MenuItem header>{i18n._('Work Coordinate System (G54)')}</MenuItem>}
          {wcs === 'G55' && <MenuItem header>{i18n._('Work Coordinate System (G55)')}</MenuItem>}
          {wcs === 'G56' && <MenuItem header>{i18n._('Work Coordinate System (G56)')}</MenuItem>}
          {wcs === 'G57' && <MenuItem header>{i18n._('Work Coordinate System (G57)')}</MenuItem>}
          {wcs === 'G58' && <MenuItem header>{i18n._('Work Coordinate System (G58)')}</MenuItem>}
          {wcs === 'G59' && <MenuItem header>{i18n._('Work Coordinate System (G59)')}</MenuItem>}
          <MenuItem eventKey="G0 C0" disabled={!canClick}>
            {i18n._('Go To Work Zero On C Axis (G0 C0)')}
          </MenuItem>
          {wcs === 'G54' && (
            <MenuItem eventKey="G10 L20 P1 C0" disabled={!canClick}>
              {i18n._('Zero Out Work C Axis (G10 L20 P1 C0)')}
            </MenuItem>
          )}
          {wcs === 'G55' && (
            <MenuItem eventKey="G10 L20 P2 C0" disabled={!canClick}>
              {i18n._('Zero Out Work C Axis (G10 L20 P2 C0)')}
            </MenuItem>
          )}
          {wcs === 'G56' && (
            <MenuItem eventKey="G10 L20 P3 C0" disabled={!canClick}>
              {i18n._('Zero Out Work C Axis (G10 L20 P3 C0)')}
            </MenuItem>
          )}
          {wcs === 'G57' && (
            <MenuItem eventKey="G10 L20 P4 C0" disabled={!canClick}>
              {i18n._('Zero Out Work C Axis (G10 L20 P4 C0)')}
            </MenuItem>
          )}
          {wcs === 'G58' && (
            <MenuItem eventKey="G10 L20 P5 C0" disabled={!canClick}>
              {i18n._('Zero Out Work C Axis (G10 L20 P5 C0)')}
            </MenuItem>
          )}
          {wcs === 'G59' && (
            <MenuItem eventKey="G10 L20 P6 C0" disabled={!canClick}>
              {i18n._('Zero Out Work C Axis (G10 L20 P6 C0)')}
            </MenuItem>
          )}
          <MenuItem divider />
          <MenuItem header>{i18n._('Temporary Offsets (G92)')}</MenuItem>
          <MenuItem eventKey="G92 C0" disabled={!canClick}>
            {i18n._('Zero Out Temporary C Axis (G92 C0)')}
          </MenuItem>
          <MenuItem eventKey="G92.1 C0" disabled={!canClick}>
            {i18n._('Un-Zero Out Temporary C Axis (G92.1 C0)')}
          </MenuItem>
          <MenuItem divider />
          <MenuItem header>{i18n._('Machine Coordinate System (G53)')}</MenuItem>
          <MenuItem eventKey="G53 G0 C0" disabled={!canClick}>
            {i18n._('Go To Machine Zero On C Axis (G53 G0 C0)')}
          </MenuItem>
          <MenuItem eventKey="G28.3 C0" disabled={!canClick}>
            {i18n._('Zero Out Machine C Axis (G28.3 C0)')}
          </MenuItem>
          <MenuItem eventKey="G28.2 C0" disabled={!canClick}>
            {i18n._('Home Machine C Axis (G28.2 C0)')}
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  renderAxis = axis => {
    const {actions} = this.props;
    const {canClick, jog, machinePosition, workPosition} = this.props.state;

    // const lengthUnits = units === METRIC_UNITS ? i18n._('mm') : i18n._('in');
    // const degreeUnits = i18n._('deg');
    const mpos = machinePosition[axis] || '0.000';
    const wpos = workPosition[axis] || '0.000';
    const axisLabel = axis.toUpperCase();
    // const displayUnits =
    //   {
    //     [AXIS_E]: lengthUnits,
    //     [AXIS_X]: lengthUnits,
    //     [AXIS_Y]: lengthUnits,
    //     [AXIS_Z]: lengthUnits,
    //     [AXIS_A]: degreeUnits,
    //     [AXIS_B]: degreeUnits,
    //     [AXIS_C]: degreeUnits,
    //   }[axis] || '';
    const renderActionDropdown =
      {
        [AXIS_E]: this.renderActionDropdownForAxisE,
        [AXIS_X]: this.renderActionDropdownForAxisX,
        [AXIS_Y]: this.renderActionDropdownForAxisY,
        [AXIS_Z]: this.renderActionDropdownForAxisZ,
        [AXIS_A]: this.renderActionDropdownForAxisA,
        [AXIS_B]: this.renderActionDropdownForAxisB,
        [AXIS_C]: this.renderActionDropdownForAxisC,
      }[axis] || noop;

    const canZeroOutMachine = canClick;
    const canHomeMachine = canClick;
    const canMoveBackward = canClick;
    const canMoveForward = canClick;
    const canZeroOutWorkOffsets = canClick;
    const canModifyWorkPosition = canClick && !this.state.positionInput[axis];

    const showPositionInput = canClick && this.state.positionInput[axis];
    const highlightAxis = canClick && (jog.keypad || jog.axis === axis);

    return (
      <tr>
        <td className="coordinate">
          <AxisLabel highlight={highlightAxis}>{axisLabel}</AxisLabel>
        </td>
        <td className="machinePosition">
          <PositionLabel value={mpos} />
          <Taskbar>
            <div className="clearfix">
              <div className="pull-right">
                <TaskbarButton
                  disabled={!canZeroOutMachine}
                  onClick={() => {
                    controller.command('gcode', `G28.3 ${axisLabel}0`);
                  }}
                >
                  <Tooltip
                    placement="bottom"
                    content={i18n._('Zero Out Machine')}
                    disabled={!canZeroOutMachine}
                    hideOnClick
                  >
                    <Image src={iconPin} width="14" height="14" />
                  </Tooltip>
                </TaskbarButton>
                <TaskbarButton
                  disabled={!canHomeMachine}
                  onClick={() => {
                    controller.command('gcode', `G28.2 ${axisLabel}0`);
                  }}
                >
                  <Tooltip placement="bottom" content={i18n._('Home Machine')} disabled={!canHomeMachine} hideOnClick>
                    <Image src={iconHome} width="14" height="14" />
                  </Tooltip>
                </TaskbarButton>
              </div>
            </div>
          </Taskbar>
        </td>
        <td className="work-position">
          {showPositionInput && (
            <PositionInput
              style={{margin: '5px 0'}}
              onSave={chainedFunction(value => {
                actions.setWorkOffsets(axis, value);
              }, this.hidePositionInput(axis))}
              onCancel={this.hidePositionInput(axis)}
            />
          )}
          {!showPositionInput && <PositionLabel value={wpos} />}
          <Taskbar>
            <div className="clearfix">
              <div className="pull-right">
                <TaskbarButton
                  disabled={!canMoveBackward}
                  onClick={() => {
                    const distance = actions.getJogDistance();
                    actions.jog({[axis]: -distance});
                  }}
                >
                  <Tooltip placement="bottom" content={i18n._('Move Backward')} disabled={!canMoveBackward} hideOnClick>
                    <Image src={iconMinus} width="14" height="14" />
                  </Tooltip>
                </TaskbarButton>
                <TaskbarButton
                  disabled={!canMoveForward}
                  onClick={() => {
                    const distance = actions.getJogDistance();
                    actions.jog({[axis]: distance});
                  }}
                >
                  <Tooltip placement="bottom" content={i18n._('Move Forward')} disabled={!canMoveForward} hideOnClick>
                    <Image src={iconPlus} width="14" height="14" />
                  </Tooltip>
                </TaskbarButton>
                <TaskbarButton
                  disabled={!canZeroOutWorkOffsets}
                  onClick={() => {
                    actions.setWorkOffsets(axis, 0);
                  }}
                >
                  <Tooltip
                    placement="bottom"
                    content={i18n._('Zero Out Work Offsets')}
                    disabled={!canZeroOutWorkOffsets}
                    hideOnClick
                  >
                    <Image src={iconPin} width="14" height="14" />
                  </Tooltip>
                </TaskbarButton>
                <TaskbarButton
                  active={showPositionInput}
                  disabled={!canModifyWorkPosition}
                  onClick={this.showPositionInput(axis)}
                >
                  <Tooltip
                    placement="bottom"
                    content={i18n._('Set Work Offsets')}
                    disabled={!canModifyWorkPosition}
                    hideOnClick
                  >
                    <Image src={iconPencil} width="14" height="14" />
                  </Tooltip>
                </TaskbarButton>
              </div>
            </div>
          </Taskbar>
        </td>
        <td className="action">{renderActionDropdown()}</td>
      </tr>
    );
  };
}

export default DisplayPanel;
