"use strict";

exports.checkSession = async (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  }

  return res.redirect('/');
};