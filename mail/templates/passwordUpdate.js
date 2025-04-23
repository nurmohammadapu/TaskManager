exports.passwordUpdated = (name, email) => {
    return `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Password Update Confirmation</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
              .highlight {
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="message">Password Successfully Updated</div>
              <div class="body">
                  <p>Hi ${name},</p>
                  <p>This is a confirmation that the password associated with your account (<span class="highlight">${email}</span>) has been successfully updated.</p>
                  <p>If this change was not made by you, please reset your password immediately and contact support.</p>
              </div>
              <div class="support">
                  If you need help or have any concerns, reach out to us. We're always here to assist you.
              </div>
          </div>
      </body>
      </html>`;
  };
  
exports.resetPasswordToken = (email, name, token) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Reset Request</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
                color: #0066cc;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="message">Password Reset Request</div>
            <div class="body">
                <p>Hi ${name},</p>
                <p>We received a request to reset the password for your account (<span class="highlight">${email}</span>).</p>
                <p>Please use the following link to reset your password:</p>
                <p><a href="http://localhost:5000/update-password/${token}" class="highlight">Reset Password</a></p>
                <p>This link will expire in 1 hour.</p>
                <p>If you did not request this password reset, please ignore this email. Your password will not be changed.</p>
            </div>
            <div class="support">
                If you need help or have any concerns, reach out to us. We're always here to assist you.
            </div>
        </div>
    </body>
    
    </html>`;
};
