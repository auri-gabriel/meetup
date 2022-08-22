const express = require('express');
const passport = require('passport');
const UserModel = require('../../models/UserModel');

const router = express.Router();

module.exports = () => {
  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login?error=true',
    })
  );
  router.get('/login', (req, res) =>
    res.render('users/login', { error: req.query.error })
  );

  router.get('/logout', (req, res) => {
    req.logout({}, (err) => console.log(err));
    return res.redirect('/');
  });
  router.get('/registration', (req, res) =>
    res.render('users/registration', { success: req.query.success })
  );

  router.post('/registration', async (req, res, next) => {
    try {
      const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const savedUser = await user.save();

      if (savedUser) return res.redirect('/users/registration?success=true');

      return next(new Error('Failed to save user'));
    } catch (err) {
      return next(err);
    }
  });

  router.get('/account', (req, res) =>
    res.render('users/account', { user: req.user })
  );

  return router;
};
