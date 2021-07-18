import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';
import Typography from "@material-ui/core/Typography";

import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';
import { BASE_URL } from '../../client';

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const responseGoogle = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      });
      const { me } = await client.request(ME_QUERY);
      dispatch({
        type: 'LOGIN_USER',
        payload: me
      });
      dispatch({
        type: 'IS_LOGGED_IN',
        payload: googleUser.isSignedIn(),
      });
    } catch (err) {
      rejectGoogle(err);
    }
  };

  const rejectGoogle = (err) => console.error(err);

  return (
    <div className={classes.root}>
      <Typography
        component='h1'
        variant='h3'
        gutterBottom
        noWrap
        style={{ color: 'rgb(66, 133, 244)' }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
        onSuccess={responseGoogle}
        onFailure={rejectGoogle}
        isSignedIn={true}
        buttonText='Login with Google'
        theme='dark'
      />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
