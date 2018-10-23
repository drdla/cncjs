/*
 * Default text styles for various elements.
 */

import {css} from 'styled-components';

const text = css`
    body {
        color: ${({theme}) => theme.color.text.default};
        font-family: Nunito, Helvetica Neue, Calibri, Roboto, sans-serif;
    }

    p {
        margin: 0 0 1em;
    }

    strong {
        font-weight: bold;
    }

    em {
        font-style: italic;
    }

    dfn {
        color: ${({theme}) => theme.color.text.lighter};
        font-style: italic;
    }

    cite {
        font-style: normal;
    }

    sub,
    sup {
        font-size: 0.5em;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    sup {
        top: -0.75em;
    }

    sub {
        bottom: -0.33em;
    }

    h1,
    h2,
    h3,
    h4 {
        font-weight: normal;
    }

    h1 {
        font-size: ${({theme}) => theme.color.text.huge};
        text-align: center;
    }

    h2 {
        font-size: ${({theme}) => theme.color.text.large};
    }

    h3 {
        font-size: ${({theme}) => theme.color.text.large};
    }
`;

export default text;
