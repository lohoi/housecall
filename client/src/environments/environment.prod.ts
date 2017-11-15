export const environment = {
  production: true,
  apiUrl: 'https://housecall.herokuapp.com/',
  token_auth_config: {
    apiBase: 'https://housecall.herokuapp.com/',
    // signInPath: 'auth/sign_in',
    resetPasswordCallback: 'https://housecall.herokuapp.com/change-password',
    userTypes: [
        { name: 'doctor', path: '' },
        { name: 'patient', path: '' }
    ]
  }
};
