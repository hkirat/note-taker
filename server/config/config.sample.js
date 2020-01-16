let config = {
    JWTsecret: process.env.JWTsecret || "<JWTsecret>", //JWT Token
    adminEmail: process.env.AdminEmail || "AdminEmail", // your email client
    emailPass: process.env.EmailPass ||"EmailPass", // your email password client
    frontendUrl: process.env.frontendUrl || "http://localhost:3000",
    smtp:"smtp.ethereal.email", // i.e 'smtp.domain.com'
    mongoUrl: process.env.mongoUrl || "mongodb://localhost:27017/notes",
    port: 3001,
    GLOBALS: {
    	NOTES_LIMIT: 10
    }
};

module.exports = config