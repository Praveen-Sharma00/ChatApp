"use strict";

exports.authenticate = async (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  }

  res.redirect('/');
};