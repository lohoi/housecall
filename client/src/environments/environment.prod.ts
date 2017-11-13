export const environment = {
  production: true,
  token_auth_config: {
    apiBase: 'http://housecall.herokuapp.com/',
    signInPath: 'auth/sign_in',
    userTypes: [
        { name: 'doctor', path: '' },
        { name: 'patient', path: '' }
    ]
  }
};
