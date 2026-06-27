const dummy_email = 'admin@futeservices.com';
const dummy_password = 'admin123';

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (email !== dummy_email || password !== dummy_password) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

 
  const fakeToken = Buffer.from(`${email}:${Date.now()}`).toString('base64');

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token: fakeToken,
    user: { email },
  });
};
