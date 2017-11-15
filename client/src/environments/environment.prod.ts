export const environment = {
  production: true,
  apiUrl: 'https://housecall.herokuapp.com/',
  token_auth_config: {
    apiBase: 'https://housecall.herokuapp.com/auth/',
    // signInPath: 'auth/sign_in',
    userTypes: [
        { name: 'doctor', path: '' },
        { name: 'patient', path: '' }
    ]
  }
};
