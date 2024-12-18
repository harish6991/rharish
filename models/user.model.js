const mongoose = require("mongoose");

const User = mongoose.model('User',
  new mongoose.Schema({
      username: String,
      email: String,
      phonenumber: String,
      password: String,
      status: {
        type: String,
        enum: ["Pending", "Active"],
        default: "Pending"
      },
      confirmationCode: {
        type: String,
        unique: true
      },
      roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }]
  }, {
    timestamps: true
  })
);

module.exports = User;
