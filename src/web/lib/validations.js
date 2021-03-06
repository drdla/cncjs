/* eslint-disable react/prop-types */

import React from 'react';

import i18n from './i18n';

const Error = props => <div {...props} style={{color: '#A94442'}} />;

export const required = (value, props, components) => {
  let localValue = value;
  let localComponents = components;
  if (props.type === 'radio') {
    const name = props.name;

    localComponents = localComponents[name] || [];
    if (localComponents.length === 0) {
      return null;
    }

    // Controls the placement of the error message for radio buttons
    if (localComponents[localComponents.length - 1] !== props) {
      return null;
    }

    const checked = localComponents.reduce((checked, props) => {
      return checked || props.checked;
    }, false);

    if (checked) {
      return null;
    }

    return <Error>{i18n._('This field is required.')}</Error>;
  }

  if (props.type === 'checkbox') {
    if (props.checked) {
      return null;
    }

    return <Error>{i18n._('This field is required.')}</Error>;
  }

  localValue = String(localValue).trim();
  if (!localValue) {
    return <Error>{i18n._('This field is required.')}</Error>;
  }

  return null;
};

export const password = (value, props, components) => {
  const bothBlurred = components.password[0].blurred && components.confirm[0].blurred;
  const bothChanged = components.password[0].changed && components.confirm[0].changed;

  if (bothBlurred && bothChanged && components.password[0].value !== components.confirm[0].value) {
    return <Error>{i18n._('Passwords should be equal.')}</Error>;
  }

  return null;
};
