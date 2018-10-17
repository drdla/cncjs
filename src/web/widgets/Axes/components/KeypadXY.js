import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

import jogButtonFactory from '../jogButtonFactory';
import AxisLabel from './AxisLabel';
import Flexbox from '../../../components_new/Flexbox';

class KeypadXY extends PureComponent {
  static propTypes = {
    height: PropTypes.string,
  };

  static defaultProps = {
    height: '200px',
  };

  render() {
    return (
      <div className="keypad">
        <svg
          role="img"
          viewBox="0 0 423.7 424.6"
          className="keypad-image keypad-image--xy"
          style={{height: this.props.height}}
        >
          <radialGradient id="SVGID_2_" cx="211.8631" cy="211.8627" r="210.8629" gradientUnits="userSpaceOnUse">
            <stop offset="0.3462" style={{stopColor: '#1C92C9'}} />
            <stop offset="1" style={{stopColor: '#007BC7'}} />
          </radialGradient>

          <circle className="keypad-image__button" style={{fill: 'url(#SVGID_2_)'}} cx="211.9" cy="211.9" r="210.9" />

          <path
            className="keypad-image__button keypad-image__button--inner"
            d="M211.9,14.6c13.6,0,27.3,1.4,40.6,4.2l0,0.1l2,0.4c6.6,1.3,11.6,7,12.1,13.8c2.3,28.5,7.6,94.9,7.7,95.6
                l0.3,1.7h0.1c2.6,10.4,12.1,18.7,22.7,19.5l93.4,7.5c6.8,0.5,12.4,5.4,13.7,12.1l0.4,2l0,0c2.8,13.3,4.2,26.9,4.2,40.6
                s-1.4,27.3-4.2,40.6l-0.1,0l-0.4,2c-1.3,6.6-7,11.6-13.8,12.1l-93.4,7.5c-10.6,0.8-20.1,9.1-22.7,19.5h-0.1l-0.3,1.7
                c-0.1,0.7-5.5,67.1-7.7,95.6c-0.5,6.8-5.4,12.4-12.1,13.7l-2,0.4l0,0c-13.3,2.8-26.9,4.2-40.6,4.2s-27.3-1.4-40.6-4.2l0-0.1l-2-0.4
                c-6.6-1.3-11.6-7-12.1-13.8c-2.3-28.5-7.6-94.9-7.7-95.6l-0.3-1.7h-0.1c-2.6-10.4-12.1-18.7-22.7-19.5L33,266.5
                c-6.8-0.5-12.4-5.4-13.7-12.1l-0.4-2l0,0c-2.8-13.3-4.2-26.9-4.2-40.6s1.4-27.3,4.2-40.6l0.1,0l0.4-2c1.3-6.6,7-11.6,13.8-12.1
                l93.4-7.5c10.6-0.8,20.1-9.1,22.7-19.5h0.1l0.3-1.7c0.1-0.7,5.4-67,7.7-95.6c0.5-6.8,5.4-12.4,12.1-13.7l2-0.4l0,0
                C184.6,16,198.2,14.6,211.9,14.6 M211.9,12.6c-14.7,0-29.1,1.6-42.9,4.7l0,0c-7.4,1.5-13.1,7.8-13.7,15.6c0,0-7.6,94.7-7.7,95.4h0
                c-1.8,10.1-11,18.7-21.3,19.5l-93.4,7.5c-7.7,0.5-14.1,6.2-15.6,13.7l0,0c-3,13.8-4.7,28.2-4.7,42.9s1.6,29.1,4.7,42.9l0,0
                c1.5,7.4,7.8,13.1,15.6,13.7l93.4,7.5c10.3,0.8,19.5,9.4,21.3,19.5h0c0.1,0.7,7.7,95.4,7.7,95.4c0.5,7.7,6.2,14.1,13.7,15.6l0,0
                c13.8,3,28.2,4.7,42.9,4.7s29.1-1.6,42.9-4.7l0,0c7.4-1.5,13.1-7.8,13.7-15.6c0,0,7.6-94.7,7.7-95.4h0c1.8-10.1,11-18.7,21.3-19.5
                l93.4-7.5c7.7-0.5,14.1-6.2,15.6-13.7l0,0c3-13.8,4.7-28.2,4.7-42.9s-1.6-29.1-4.7-42.9l0,0c-1.5-7.4-7.8-13.1-15.6-13.7l-93.4-7.5
                c-10.3-0.8-19.5-9.4-21.3-19.5h0c-0.1-0.7-7.7-95.4-7.7-95.4c-0.5-7.7-6.2-14.1-13.7-15.6l0,0C241,14.2,226.6,12.6,211.9,12.6
                L211.9,12.6z"
          />

          <path
            className="keypad-image__arrow"
            d="M211.9,44.6c0.4,0,1.3,0.1,1.8,1.1L226.6,68c0.6,1,0.2,1.8,0,2.1c-0.2,0.3-0.7,1.1-1.8,1.1H199
            c-1.1,0-1.6-0.7-1.8-1.1c-0.2-0.3-0.6-1.2,0-2.1L210,45.7C210.6,44.7,211.5,44.6,211.9,44.6 M211.9,42.6c-1.4,0-2.8,0.7-3.6,2.1
            L195.4,67c-1.6,2.7,0.4,6.2,3.6,6.2h25.8c3.2,0,5.1-3.4,3.6-6.2l-12.9-22.3C214.6,43.3,213.2,42.6,211.9,42.6L211.9,42.6z"
          />
          <path
            className="keypad-image__arrow"
            d="M224.7,352.6c1.1,0,1.6,0.7,1.8,1.1c0.2,0.3,0.6,1.2,0,2.1L213.7,378c-0.6,1-1.5,1.1-1.8,1.1s-1.3-0.1-1.8-1.1
            l-12.9-22.3c-0.6-1-0.2-1.8,0-2.1c0.2-0.3,0.7-1.1,1.8-1.1H224.7 M224.7,350.6H199c-3.2,0-5.1,3.4-3.6,6.2l12.9,22.3
            c0.8,1.4,2.2,2.1,3.6,2.1s2.8-0.7,3.6-2.1l12.9-22.3C229.9,354,227.9,350.6,224.7,350.6L224.7,350.6z"
          />
          <path
            className="keypad-image__arrow"
            d="M354.7,196.9c0.4,0,0.7,0.1,1,0.3L378,210c1,0.6,1.1,1.5,1.1,1.8s-0.1,1.3-1.1,1.8l-22.3,12.9
            c-0.3,0.2-0.7,0.3-1,0.3c-1,0-2.1-0.8-2.1-2.1V199C352.6,197.7,353.7,196.9,354.7,196.9 M354.7,194.9c-2.1,0-4.1,1.7-4.1,4.1v25.8
            c0,2.4,2,4.1,4.1,4.1c0.7,0,1.4-0.2,2-0.6l22.3-12.9c2.7-1.6,2.7-5.5,0-7.1l-22.3-12.9C356.1,195,355.4,194.9,354.7,194.9
            L354.7,194.9z"
          />
          <path
            className="keypad-image__arrow"
            d="M69,196.9c1,0,2.1,0.8,2.1,2.1v25.8c0,1.3-1.1,2.1-2.1,2.1c-0.4,0-0.7-0.1-1-0.3l-22.3-12.9
            c-1-0.6-1.1-1.5-1.1-1.8s0.1-1.3,1.1-1.8L68,197.2C68.3,197,68.7,196.9,69,196.9 M69,194.9c-0.7,0-1.4,0.2-2,0.6l-22.3,12.9
            c-2.7,1.6-2.7,5.5,0,7.1L67,228.3c0.7,0.4,1.4,0.6,2,0.6c2.1,0,4.1-1.7,4.1-4.1V199C73.2,196.6,71.2,194.9,69,194.9L69,194.9z"
          />
        </svg>
        <AxisLabel>XY</AxisLabel>
        <Flexbox
          flexDirection="column"
          alignContent="stretch"
          justifyContent="stretch"
          className="keypad-button__wrapper"
        >
          <Flexbox flexDirection="row" alignContent="stretch" justifyContent="stretch" flexGrow="1">
            {jogButtonFactory(this.props, {direction: '-', name: 'x'}, {direction: '-', name: 'Y'})}
            {jogButtonFactory(this.props, {direction: '-', name: 'y'})}
            {jogButtonFactory(this.props, {direction: '+', name: 'x'}, {direction: '-', name: 'y'})}
          </Flexbox>
          <Flexbox flexDirection="row" alignContent="stretch" justifyContent="stretch" flexGrow="1">
            {jogButtonFactory(this.props, {direction: '-', name: 'x'})}
            <Flexbox flexGrow="1" />
            {jogButtonFactory(this.props, {direction: '+', name: 'x'})}
          </Flexbox>
          <Flexbox flexDirection="row" alignContent="stretch" justifyContent="stretch" flexGrow="1">
            {jogButtonFactory(this.props, {direction: '-', name: 'x'}, {direction: '+', name: 'y'})}
            {jogButtonFactory(this.props, {direction: '+', name: 'y'})}
            {jogButtonFactory(this.props, {direction: '+', name: 'x'}, {direction: '+', name: 'y'})}
          </Flexbox>
        </Flexbox>
      </div>
    );
  }
}

export default KeypadXY;