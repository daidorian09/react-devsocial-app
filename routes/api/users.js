const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const generateToken = require("../../utils/token/tokenGenerator")

const sendEmail = require('../../utils/notification/emailNotification')

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateTokenInput = require('../../validation/token')

// Load User model
const User = require('../../models/User');
const UserToken = require("../../models/UserToken")

const setTokenExpiration = require('../../utils/date/setTokenExpiration')
const dateSubtractor = require('../../utils/date/dateSubtractor')


// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/signup', (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(422).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(409).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.salt = salt
          newUser
            .save()
            .then(user => {
              const data  = {
                email : user.email,
                token : generateToken()
              }
              const expirationDate = setTokenExpiration()
              const userToken = new UserToken({
                user : user.id,
                token : data.token,
                expiredAt : expirationDate
              })
              userToken.save()
              .then(userToken => {
                if(!userToken){
                  const errors = {
                    error : "Internal server error"
                  }
                  return res.status(500).json({
                  })
                }
              })
              sendEmail(data)
              res.status(201).json(user)
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(422).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({
    email
  }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    if(!user.isActive){
      errors.isActive = "User is not ready yet"
      return res.status(400).json(errors)
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey, {
            expiresIn: keys.tokenExpiration
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route   Post api/users/confirmactionvation
// @desc    Return token activation result
// @access  Public

router.post('/confirmactivation', (req, res) => {
  const {
    errors,
    isValid
  } = validateTokenInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(422).json(errors);
  }

  UserToken.findOneAndUpdate({
      token: req.body.token,
      isActive: true
    }, {
      $set: { isActive: false, modifiedAt: Date.now()}
    }, {
      new: true
    })
    .populate('user', ['_id'])
    .then(userToken => {
      if (!userToken) {
        errors.token = 'Token not found';
        return res.status(404).json(errors);
      }

      const tokenExpiration = userToken.expiredAt

      const isTokenActive = dateSubtractor(tokenExpiration)

      if (!isTokenActive) {
        errors.token = "Token is expired"
        return res.status(400).json(errors)
      }

      User.findOneAndUpdate({
        _id: userToken.user.id,
        isActive: false
      }, {
        $set: {
          modifiedAt: Date.now(),
          isActive: true
        }
      }, {
        new: true
      }).then(user => {
        if (!user) {
          errors.token = "User not found"
          return res.status(400).json(errors)
        }

        return res.status(200).json({
          token: user.isActive
        })
      }).catch(err => res.status(500).json(err))
    }).catch(err => res.status(500).json(err))
});

module.exports = router;