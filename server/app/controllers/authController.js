const User = require('../models/userModel');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;

class authController {
  static async login(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          success: false,
          message: info ? info.message : 'Login failed',
        });
      }
      req.login(user, { session: false }, async (err) => {
        if (err) {
          res.send(err);
        }
        const payload = {
          email: user.email,
          id: user._id,
          role: user.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
        user = user.toObject();
        user.token = token;
        user.password = undefined;
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie('token', token, options).status(200).json({
          success: true,
          token,
          user,
          message: 'Logged in Successfully✅',
        });
      });
    })(req, res, next);
  }

  static async signup(req, res) {
    const { username, email, password } = req.body;
    const isExisting = await User.findOne({ email });
    if (isExisting) {
      return res.send('Already existing');
    }
    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).send({ message: 'successfully signed up!', newUser });
  }
  static async updateUser(req, res) {
    const { id } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async getProgress(req,res){
    const {id} = req.params;
    try {
      const user = await User.findById(id).populate('progress.videoId');
      if (user == null) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user.progress);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
  }

  static async updateProgress(req,res){
    const { videoId, lastPosition, completed } = req.body;
    const {id} = req.params;
    try {
      
      const user = await User.findById(id);

      if (user == null) {
          return res.status(404).json({ message: 'User not found' });
      }

      const progressIndex = user.progress.findIndex(p => p.videoId.toString() === videoId);

      if (progressIndex === -1) {
          user.progress.push({ videoId, lastPosition, completed });
      } else {
          user.progress[progressIndex].lastPosition = lastPosition;
          user.progress[progressIndex].completed = completed;
      }

      await user.save();
      res.status(200).json(user.progress);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
  }

}

// Configure Passport Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Password incorrect' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = authController;
