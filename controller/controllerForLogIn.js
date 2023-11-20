const mongoose = require('mongoose');
const SchemaForCommanUserData = require('../models/signinmodels')
const { createSession, encryptedPassword } = require('../services/servicesForAuthentication');

const controllerForLogIn = async (req, res) => {
  const { email, password } = req.body
  const db = mongoose.connection.useDb('users');
  const Model = db.model('Users', SchemaForCommanUserData, 'common-users-storage');

  try {
    Model.findOne({ email: email })
      .then(async (user) => {
        console.log("user" , user)
        if (user) {
          console.log("new", user.get('password'));
          let hashedPassword = await encryptedPassword(password);
          // const isPasswordMatch = await bcrypt.compare(hashedPassword, user._doc.password);
          // console.log("Password", hashedPassword)
          if (user._doc.password === hashedPassword && email === user._doc.email) {
            createSession({ uid: user._doc._id, type: user._doc.type })
              .then((token) => {
                console.log("Token has been created" , token)
                try {
                  res.cookie('access_token', token, {
                    // domain: '.investipi.com', // Remove the protocol
                    maxAge: 1296000000,
                  })
                } catch (error) {
                  console.log("Error while Storing cookie" , error)
                }
                res.status(201).json({
                  authenticated: true,
                  message: 'Welcome Back'
                })
              }).catch((error) => {
                res.status(201).json({
                  authenticated: true,
                  message: `${error}`
                })
              })

          } else {
            console.log("ERORR IS :", 1)
            res.status(401).json({
              authenticated: false,
              message: `Your password or Email might not correct`
            })
          }
        } else {
          console.log("ERORR IS :", 2)
          res.status(401).json({
            authenticated: false,
            message: `Your password or Email might not correct`
          })
        }
      })
      
    } catch (error) {
    console.log("ERORR IS :", error)
    res.status(401).json({
      authenticated: false,
      message: `Network Error ${error}`
    })
  }
}
module.exports = controllerForLogIn;



