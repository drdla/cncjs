import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {omit} from 'lodash';

import i18n from '../../lib/i18n';

const REGEXP = /{{(.+?)}}/;

class I18n extends Component {
  static propTypes = {
    _: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    options: PropTypes.object,
    parent: PropTypes.string,
    replacement: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    t: PropTypes.string,
  };
  static defaultProps = {
    _: '',
    parent: 'span',
    t: '',
  };

  render() {
    const {t, _, parent, replacement} = this.props;
    const i18nOptions = {
      ...this.props.options,
      ...{
        interpolation: {
          prefix: '#$?',
          suffix: '?$#',
        },
      },
    };
    let format = null;
    if (this.props.children) {
      format = this.props.children;
    } else if (t) {
      format = i18n.t(t, i18nOptions);
    } else if (_) {
      format = i18n._(_, i18nOptions);
    }
    if (!format || typeof format !== 'string') {
      return React.createElement('noscript', null);
    }

    let props = omit(this.props, ['t', '_', 'options', 'parent', 'replacement']);
    const matches = [];
    const children = [];

    // "AAA {{foo}} BBB {{bar}}".split(REGEXP)
    // ["AAA ", "foo", " BBB ", "bar", ""]
    format.split(REGEXP).reduce((memo, match, index) => {
      let child = null;

      if (index % 2 === 0) {
        if (match.length === 0) {
          return memo;
        }
        child = match;
      } else if (replacement) {
        child = replacement[match];
      } else {
        child = this.props[match];
        matches.push(match);
      }

      memo.push(child);

      return memo;
    }, children);

    props = omit(props, matches);

    return React.createElement.apply(this, [parent, props].concat(children));
  }
}

export default I18n;
