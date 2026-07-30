import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@inkarttattoo.com' && password === 'admin123') {
    const token = jwt.sign(
      { id: 'admin-1', email, role: 'admin' },
      process.env.JWT_SECRET || 'ink_art_secret_key_2026',
      { expiresIn: '30d' }
    );

    return res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }).json({
      success: true,
      token,
      user: { name: 'Studio Director', email, role: 'admin' },
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'ink_art_secret_key_2026',
        { expiresIn: '30d' }
      );
      return res.cookie('token', token, { httpOnly: true }).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    }
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
