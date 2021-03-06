import {css} from 'styled-components';

const slideDownIn = css`
  @keyframes slideDownIn {
    from {
      transform: translate3d(-50%, -2000px, 0);
    }

    to {
      transform: translate3d(-50%, -50%, 0);
    }
  }

  /*
   * 1 - Keep appearance of last keyframe
   */

  animation: ${({theme}) => theme.transition.time.medium} slideDownIn ${({theme}) => theme.transition.style.dynamic};
  animation-fill-mode: forwards; /* 1 */
`;

export default slideDownIn;
