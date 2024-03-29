const APP_URL = "https://tp-chat-frontend.techpss.com";
// const APP_URL = "http://192.168.1.165:3000";

const sendMail = (mailContent) => {
  const { name } = mailContent;
  const firstName = name.split(" ").slice(0, -1).join(" ");
  return `<div><div style="font-family: &quot;Open Sans&quot;, sans-serif; color: rgba(43, 46, 52, 1); background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgba(241, 241, 241, 1); padding: 30px 15px; height: 100%; font-size: 16px"> <table style="width: 720px; max-width: 100%; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgba(255, 255, 255, 1); border-radius: 12px; padding: 15px; margin: 0 auto" width="720"><tbody><tr><td style="text-align: center; padding: 15px 0; border-bottom: 1px solid rgba(230, 231, 232, 1)" align="center"> <img style="max-width: 100%; height: auto; max-height: 100px"></td></tr><tr><td style="padding-top: 10px"> <table style="text-align: center; width: 100%; border-spacing: 0" width="100%" align="center"> <tbody><tr> <td style="padding-bottom: 10px"> <h4 style="margin: 0">Hello ${firstName}!</h4></td></tr><tr> <td style="padding-bottom: 10px">Your Tp-chat account has been successfully created.Please click on "Login now" to start chat.</td></tr><tr> <td style="padding-bottom: 10px"><a href=${APP_URL} style="text-decoration: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: purple; font-size: 16px; border-radius: 50px; padding: 7px 30px; display: inline-block; color: rgba(255, 255, 255, 1)">Login Now</a></td></tr></tbody></table><table style="width: 100%; text-align: center; font-size: 11px; color: rgba(170, 170, 170, 1); border-top: 1px solid rgba(230, 231, 232, 1); margin-top: 10px; border-spacing: 0" width="100%" align="center"><tbody><tr> <td style="padding-top: 10px; padding-bottom: 0">Copyright 2022 Tp-chat</td></tr></tbody></table></td></tr></tbody></table></div></div>`;
};

const sendTokenToMail = (mailContent) => {
  const { name, token } = mailContent;

  const firstName = name.split(" ").slice(0, -1).join(" ");

  return `<div><div style="font-family: &quot;Open Sans&quot;, sans-serif; color: rgba(43, 46, 52, 1); background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgba(241, 241, 241, 1); padding: 30px 15px; height: 100%; font-size: 16px">    <table style="width: 720px; max-width: 100%; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgba(255, 255, 255, 1); border-radius: 12px; padding: 15px; margin: 0 auto" width="720"><tbody><tr><td style="text-align: center; padding: 15px 0; border-bottom: 1px solid rgba(230, 231, 232, 1)" align="center"> <img style="max-width: 100%; height: auto; max-height: 100px"></td></tr><tr><td style="padding-top: 10px"> <table style="text-align: center; width: 100%; border-spacing: 0" width="100%" align="center"> <tbody><tr> <td style="padding-bottom: 10px"> <h4 style="margin: 0">Hello ${firstName}!</h4></td></tr><tr> <td style="padding-bottom: 10px">Please click on "Reset Password" to create a new password.</td></tr><tr> <td style="padding-bottom: 10px"><a href="${APP_URL}/resetPassword/${token}" style="text-decoration: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: purple; font-size: 16px; border-radius: 50px; padding: 7px 30px; display: inline-block; color: rgba(255, 255, 255, 1)">Reset Password</a></td></tr></tbody></table><table style="width: 100%; text-align: center; font-size: 11px; color: rgba(170, 170, 170, 1); border-top: 1px solid rgba(230, 231, 232, 1); margin-top: 10px; border-spacing: 0" width="100%" align="center"><tbody><tr> <td style="padding-top: 10px; padding-bottom: 0">Copyright 2022 Tp-Chat</td></tr></tbody></table></td></tr></tbody></table></div></div>`;
};

module.exports = {
  sendMail,
  sendTokenToMail,
};


