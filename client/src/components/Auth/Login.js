import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';
// import Typography from "@material-ui/core/Typography";

const ME_QUERY = `
  {
    me {
      _id
      name
      email
      picture
    }
  }
`;

const Login = ({ classes }) => {
  const responseGoogle = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    const client = new GraphQLClient(process.env.REACT_APP_BASE_API_URL, {
      headers: { authorization: idToken }
    });
    const data = await client.request(ME_QUERY);
    console.log(data)
  };

  const rejectGoogle = (err) => console.error(err);

  return <GoogleLogin
    clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
    onSuccess={responseGoogle}
    onFailure={rejectGoogle}
    isSignedIn={true}
  />;
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
