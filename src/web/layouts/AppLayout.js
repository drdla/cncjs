import React, {Component} from 'react';
import styled from 'styled-components';
import {bool, node} from 'prop-types';
import {connect} from 'react-redux';

import AppNotices from '../containers/Workspace/AppNotices';
import Dialogs from '../dialogs';
import FlashMessages from '../components_new/FlashMessages';

const StyledAppLayout = styled.div`
  /*
   * 1 - Force space for scrollbar
   */

  align-items: stretch;
  background-color: ${({theme}) => theme.color.background.white};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100.1vh; /* 1 */
  width: 100vw;
`;

const Body = styled.div`
  /*
   * Blur the content under the overlay
   */
  ${({hasOverlay}) =>
    hasOverlay
      ? `
        filter: blur(5px);
        transition: blur ${({theme}) => theme.transition.time.medium};
      `
      : ''};
`;

class AppLayout extends Component {
  static propTypes = {
    children: node.isRequired,
    hasOverlay: bool,
  };

  render() {
    const {children, hasOverlay} = this.props;

    return (
      <StyledAppLayout>
        <FlashMessages />
        <AppNotices />
        <Dialogs />
        <Body hasOverlay={hasOverlay}>{children}</Body>
      </StyledAppLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {currentDialog} = state.dialogs;

  return {
    children: ownProps.children,
    hasOverlay: Boolean(currentDialog),
  };
};

export default connect(mapStateToProps)(AppLayout);
