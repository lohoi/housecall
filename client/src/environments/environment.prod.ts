export const environment = {
  production: true,
  apiUrl: 'https://housecall.herokuapp.com/api/',
  token_auth_config: {
    apiBase: 'https://housecall.herokuapp.com',
    signInPath: 'auth/sign_in',
    resetPasswordPath: 'auth/password',
    // resetPasswordCallback: 'https://housecall.herokuapp.com/login',
    userTypes: [
        { name: 'doctor', path: '' },
        { name: 'patient', path: '' }
    ]
  }
};
