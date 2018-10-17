import classcat from 'classcat';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';

import i18n from '../../lib/i18n';

import {MEDIA_SOURCE_LOCAL, MEDIA_SOURCE_MJPEG} from './constants';

import Anchor from '../../components/Anchor';
import Circle from './Circle';
import Image from './Image';
import Line from './Line';
import WebcamComponent from '../../components/Webcam';
import Tooltip from '../../components/Tooltip';

import './index.scss';

class Webcam extends PureComponent {
  static propTypes = {
    actions: PropTypes.object,
    state: PropTypes.object,
  };

  mediaSource = null;

  refresh() {
    const {state} = this.props;
    const {mediaSource} = state;

    if (mediaSource === MEDIA_SOURCE_MJPEG) {
      // eslint-disable-next-line react/no-find-dom-node
      const el = ReactDOM.findDOMNode(this.mediaSource);
      el.src = '';

      setTimeout(() => {
        el.src = state.url;
      }, 10);
    }
  }

  render() {
    const {actions, state} = this.props;
    const {
      crosshair,
      deviceId,
      disabled,
      flipHorizontally,
      flipVertically,
      mediaSource,
      muted,
      rotation,
      scale,
      url,
    } = state;

    if (disabled) {
      return (
        <div className="webcam-off-container">
          <h4>
            <i className="icon-webcam" />
          </h4>
          <h5>{i18n._('Webcam is off')}</h5>
        </div>
      );
    }

    const transformStyle = [
      'translate(-50%, -50%)',
      `rotateX(${flipVertically ? 180 : 0}deg)`,
      `rotateY(${flipHorizontally ? 180 : 0}deg)`,
      `rotate(${(rotation % 4) * 90}deg)`,
    ].join(' ');

    return (
      <div className="webcam-on-container">
        {mediaSource === MEDIA_SOURCE_LOCAL && (
          <div style={{width: '100%'}}>
            <WebcamComponent
              ref={ref => (this.mediaSource = ref)}
              className="center"
              style={{transform: transformStyle}}
              width={`${(100 * scale).toFixed(0)}%`}
              height="auto"
              muted={muted}
              video={deviceId ? deviceId : true}
            />
          </div>
        )}
        {mediaSource === MEDIA_SOURCE_MJPEG && (
          <Image
            ref={ref => (this.mediaSource = ref)}
            src={url}
            style={{
              transform: transformStyle,
              width: `${(100 * scale).toFixed(0)}%`,
            }}
            className="center"
          />
        )}
        {crosshair && (
          <div>
            <Line className={classcat(['center', 'line-shadow'])} length="100%" />
            <Line className={classcat(['center', 'line-shadow'])} length="100%" vertical />
            <Circle className={classcat(['center', 'line-shadow'])} diameter={20} />
            <Circle className={classcat(['center', 'line-shadow'])} diameter={40} />
          </div>
        )}
        <div className="toolbar">
          <div className="scale-text">{scale}x</div>
          <div className="pull-right">
            {mediaSource === MEDIA_SOURCE_LOCAL && (
              <Anchor className="btn-icon" onClick={actions.toggleMute}>
                <i
                  className={classcat([
                    'icon',
                    'inverted',
                    {
                      iconUnmute: !muted,
                      iconMute: muted,
                    },
                  ])}
                />
              </Anchor>
            )}
            <Tooltip content={i18n._('Rotate Left')} placement="top">
              <Anchor className={'btn-icon'} onClick={actions.rotateLeft}>
                <i className="icon inverted icon-rotate-left" />
              </Anchor>
            </Tooltip>
            <Tooltip content={i18n._('Rotate Right')} placement="top">
              <Anchor className={'btn-icon'} onClick={actions.rotateRight}>
                <i className="icon inverted icon-rotate-right" />
              </Anchor>
            </Tooltip>
            <Tooltip content={i18n._('Flip Horizontally')} placement="top">
              <Anchor className={'btn-icon'} onClick={actions.toggleFlipHorizontally}>
                <i className="icon inverted icon-flip-horizontally" />
              </Anchor>
            </Tooltip>
            <Tooltip content={i18n._('Flip Vertically')} placement="top">
              <Anchor className={'btn-icon'} onClick={actions.toggleFlipVertically}>
                <i className="icon inverted icon-flip-vertically" />
              </Anchor>
            </Tooltip>
            <Tooltip content={i18n._('Crosshair')} placement="top">
              <Anchor className={'btn-icon'} onClick={actions.toggleCrosshair}>
                <i className="icon inverted icon-crosshair" />
              </Anchor>
            </Tooltip>
          </div>
        </div>
        <div className="image-scale-slider">
          <Slider
            defaultValue={scale}
            min={0.1}
            max={10}
            step={0.1}
            tipFormatter={null}
            onChange={actions.changeImageScale}
          />
        </div>
      </div>
    );
  }
}

export default Webcam;
