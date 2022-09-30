const res = {
  login_head_403: 'Incorrect credentials',
  login_msg_403: 'The username or email and password you provided is incorrect.',
  login_msg_500: 'An error occurred while attempting to login to your account.',

  msg_500: '500 Internal Server Error',

  reg_head_403: 'Invalid format',
  reg_msg_403: 'Either your Name, Email address or Username resulted in a pattern error.',
  reg_msg_500: 'An error occurred while attempting to create to your account.',

  post_head_403: 'Token invalid',
  post_msg_403: 'Potential failure in token validation',
  post_msg_500: 'Could not post. Internal server error.',

  unknown_format: 'The server returned an unknown response format.',

  server_error_head: 'Oops!',
  server_error_msg: 'Something went wrong!\n\n',

  head_100: 'Username exists',
  msg_100: "Now that's just sad, someone already took that username.",
  
  head_101: 'Email exists',
  msg_101: 'That email address has already been registered, proceed to login instead!',
  
  head_102: '',
  msg_102: ''
};
export default res;