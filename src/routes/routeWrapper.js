import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

export default function RouteWrapper({
  component: Component,
  isPrivateAdmin,
  isPrivateGrow,
  ...rest
}) {
  const user = useSelector((state) => state.login);
  const userType = user?.user?.type;
  let signed = false;

  if (user) {
    signed = true;
  }

  if (!signed && isPrivateAdmin) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivateAdmin && userType === 'Admin') {
    return <Redirect to="/admin-home" />;
  }

  if (!signed && isPrivateGrow) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivateGrow && userType === 'Growdever') {
    return <Redirect to="/growdeverHome" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivateAdmin: propTypes.bool,
  isPrivateGrow: propTypes.bool,
  component: propTypes.oneOfType([propTypes.elementType, propTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivateAdmin: false,
  isPrivateGrow: false,
};
