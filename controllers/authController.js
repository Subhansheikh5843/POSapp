import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password,lastName } = req.body;

  //validate
  if (!name) {
    next("name is required");
  }
  if (!email) {
    next("email is required");
  }
  if (!password) {
    next("password is required and greater then 6 character");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email Already Register Please Login");
  }

  const user = await userModel.create({ name, email, password,lastName });
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "user created sussesfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

//login controller
export const loginController = async (req, res,next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please Provide All fileds");
  }

  //find user by email

  const user = await userModel.findOne({ email }).select("+password")
  if (!user) {
    next("Invalid Username or Password");
  }

  //compare password

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid Username or Password");
  }

  user.password = undefined;

  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};
