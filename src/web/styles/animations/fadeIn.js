import s from '../variables';

const fadeIn = `
  @keyframes fadeIn {
      from {
          opacity: 0;
      }

      to {
          opacity: 1;
      }
  }

  animation: ${s.transition.time.fast} fadeIn ${s.transition.style.dynamic};
  animation-fill-mode: both;
`;

export default fadeIn;
