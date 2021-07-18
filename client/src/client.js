import { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';

export const BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_BASE_PROD_API_URL
  : process.env.REACT_APP_BASE_API_URL;

export const useClient = () => {
  const [idToken, setIdToken] = useState('');

  useEffect(() => {
    const token = window.gapi.auth2
      .getAuthInstance()
      .currentUser
      .get()
      .getAuthResponse()
      .id_token;
    setIdToken(token);
  }, []);

  return new GraphQLClient(BASE_URL, {
    headers: { authorization: idToken }
  });
};
