const uuid = require("uuid");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/users");
const Forgotpassword = require("../models/password");

const client = SibApiV3Sdk.ApiClient.instance;
const apikey = client.authentications["api-key"];
apikey.apiKey = process.env.BREVO_API_KEY;

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const id = uuid.v4();
      user.createForgotpassword({ id, active: true }).catch((err) => {
        throw new Error(err);
      });
      // Send email using Sendinblue API
      const sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();

      const sendSmtpEmail = {
        to: [{ email: email }],
        sender: {
          email: "any@email.com",
          name: "anyName",
        },
        subject: "Reset Your Password",
        htmlContent: `<p>Hello,</p>
                      <p>Please click the following link to reset your password:</p>
                      <p><a href="https://google.com">Reset password</a></p>
                      <p>If you did not request a password reset, please ignore this email.</p>
                      <p>Thank you!</p>`,
      };

      await sendinblue.sendTransacEmail(sendSmtpEmail);
      return res.status(200).json({
        message: "Link to reset password sent to your email",
        success: true,
      });
    } else {
      throw new Error("User doesn't exist");
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: err, success: false });
  }
};

const resetpassword = (req, res) => {
  const id = req.params.id;
  Forgotpassword.findOne({ where: { id } }).then((forgotpasswordrequest) => {
    if (forgotpasswordrequest) {
      forgotpasswordrequest.update({ active: false });
      res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`);
      res.end();
    }
  });
};

const updatepassword = (req, res) => {
  try {
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    Forgotpassword.findOne({ where: { id: resetpasswordid } }).then(
      (resetpasswordrequest) => {
        User.findOne({ where: { id: resetpasswordrequest.userId } }).then(
          (user) => {
            // console.log('userDetails', user)
            if (user) {
              //encrypt the password

              const saltRounds = 10;
              bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) {
                  console.log(err);
                  throw new Error(err);
                }
                bcrypt.hash(newpassword, salt, function (err, hash) {
                  // Store hash in your password DB.
                  if (err) {
                    console.log(err);
                    throw new Error(err);
                  }
                  user.update({ password: hash }).then(() => {
                    res
                      .status(201)
                      .json({ message: "Successfuly update the new password" });
                  });
                });
              });
            } else {
              return res
                .status(404)
                .json({ error: "No user Exists", success: false });
            }
          }
        );
      }
    );
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};

module.exports = {
  forgotpassword,
  updatepassword,
  resetpassword,
};
