const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  name: {
    type: String,
    required: "isim girmelisiniz!",
  },
  email: {
    type: String,
    lovercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  role: {
    type: String,
    default: "student",
  },
  gender: {
    type: String,
    enum: ["Erkek", "Kadın"],
  },
  photo: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    default: "Misfit platrfomunda vucut geliştirici",
  },
  password: {
    type: String,
    required: true,
  },
  hareketler: {
    type: Schema.Types.ObjectId,
    ref: "Hareket",
  },
});

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.pre("save", function (next) {
  const user = this;
  user.gender == "Erkek"
    ? (user.photo =
        "https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png")
    : "https://media.istockphoto.com/photos/portrait-of-a-beautiful-woman-at-the-gym-picture-id856797530?k=20&m=856797530&s=612x612&w=0&h=kFFhoXpDoF6jCmerJe-cZzOMKRvpl2orilNip2t3McU=";
  next();
});

module.exports = mongoose.model("User", UserSchema);
