import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const loginUser = async (req, res) => {
  const { username, email, password } = req.body;
  const inputUser = (username || email || '').trim();

  if (!inputUser || !password) {
    return res.status(400).json({ success: false, message: 'Please enter username and password' });
  }

  const validAdminUser = process.env.ADMIN_USERNAME || 'inkarttattoo';
  const validAdminPassword = process.env.ADMIN_PASSWORD || 'inkart@123';

  if (
    (inputUser.toLowerCase() === validAdminUser.toLowerCase() || inputUser.toLowerCase() === 'admin@inkarttattoo.com') &&
    password === validAdminPassword
  ) {
    const token = jwt.sign(
      { id: 'admin-1', username: validAdminUser, role: 'admin' },
      process.env.JWT_SECRET || 'ink_art_secret_key_2026',
      { expiresIn: '30d' }
    );

    return res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }).json({
      success: true,
      token,
      user: { name: 'Ink Art Studio Director', username: validAdminUser, role: 'admin' },
    });
  }

  try {
    const user = await User.findOne({
      $or: [{ username: inputUser }, { email: inputUser.toLowerCase() }],
    });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign(
        { id: user._id, username: user.username || user.name, role: user.role },
        process.env.JWT_SECRET || 'ink_art_secret_key_2026',
        { expiresIn: '30d' }
      );
      return res.cookie('token', token, { httpOnly: true }).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, username: user.username, role: user.role },
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
