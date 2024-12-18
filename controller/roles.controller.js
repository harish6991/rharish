const db = require("../models");
const Roles = db.roles;
const RefreshToken = db.refreshToken;

exports.makeCollection = async () => {
  try {
    const count = await Roles.collection.estimatedDocumentCount();
    if (count === 0) {
      await new Roles({ name: "student" }).save();
      console.log('Student Collection Has Been Created');

      await new Roles({ name: "admin" }).save();
      console.log('Admin Collection Has Been Created');

      await new Roles({ name: "guest" }).save();
      console.log('Guest Collection Has Been Created');
    } else {
      console.log("Collection Has Already Been Created");
    }
  } catch (err) {
    console.log('Error:', err);
  }
};

exports.makeRefreshCollection = async () => {
  try {
    const count = await RefreshToken.collection.estimatedDocumentCount();

    if (count === 0) {
      await new RefreshToken({
        token: null,
        expiryDate: null,
        userId: null,
      }).save();

      console.log('RefreshToken Collection Has Been Created');
    } else {
      console.log('RefreshToken Collection Already Exists');
    }
  } catch (err) {
    console.log('Error:', err);
  }
};
