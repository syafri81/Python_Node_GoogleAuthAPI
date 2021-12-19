const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const app = express();

const {PythonShell} =require('python-shell');

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/icon', express.static(__dirname + 'public/icon'))

//google mail api
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const SendmailTransport = require('nodemailer/lib/sendmail-transport')

const CLIENT_ID = '886802330105-935gofouvvko06ft42rroh8v8jbgikoo.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04-okcj3bti7VCgYIARAAGAQSNwF-L9IrurUvSMkoZbXVdajY-44tDDOFqHRgngPNonwG3m6igW6Sz627cyEkLzPaMG2vcizqQLI'
const emailService = "syafriadibu@gmail.com"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendMail(email)
{
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: emailService,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        var tokenValue = generateToken()
        var htmlValue = "<h3>Welcome to PyApp System.</h3><br>Please use below token to access the system.<br><b>" + tokenValue + "</b>"

        //var email = "syafriadi@tdcx.com"
        const mailOptions = {
            from: 'syafriadi <syafriadibu@gmail.com>',
            //to: 'bucharisyafriadi@gmail.com',
            to: email,
            subject: 'Token to use',
            //text: 'Test email using google API',
            html: htmlValue,
        }

        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        return error
    }
}

//sendMail().then(result => console.log('Email sent...', result))
//.catch(error => console.log(error.message))
////end google mail api

function generateToken()
{
   //return "123456"
   return Math.floor(100000 + Math.random() * 900000)
}

var arrError = []

app.post("/gettoken", (req, res) => {
  var email = req.query.email

  //console.log("gettoken. Email: " + email)
  sendMail(email).then(result => console.log('Email sent...', result))
   .catch(error => console.log(error.message))

  arrError = []
  arrError.push("Token has been sent to your email.")
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(arrError))
})

app.get("/", (req, res) => {
  //res.send("<h1>Welcome to EJS world!</h1>");
  res.render("index"); // index refers to index.ejs
})

//app.post("/login", (req, res) => {
//  const { name, password } = req.body

//  if (name === "admin" && password === "admin") {
//    res.render("home", {
//      username: name,
//    })
//  } else {
//    res.render("failure")
//  }
//})

app.post("/login", (req, res) => {
  var email = req.query.email
  var tokenEmail = req.query.tokenemail

  console.log("login. Email: " + email);
  console.log("login. tokenEmail: " + tokenEmail);
  arrError = []

  if (email == '')
    arrError.push("Email is required.")
  if (tokenEmail == '')
    arrError.push("token is required.")
  if (arrError.length > 0)
  {    
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(arrError))
  }

  res.setHeader('Content-Type', 'application/json')
  if (email === emailService && tokenEmail == 123456) {
    console.log("here")
    //res.redirect("/home")
    //res.render("home", {
    //  username: email,
    //})
    arrError.push("Successfully login.")
  } else {
    //res.render("failure")
    arrError.push("Wrong email address")
    arrError.push("Wrong token")
  }
  res.end(JSON.stringify(arrError))
})

app.get("/home", (req, res) => {
  //res.send("<h1>Welcome to EJS world!</h1>");
  res.render("home"); // index refers to index.ejs
})
app.get("/page2", (req, res) => {
  //res.send("<h1>Welcome to EJS world!</h1>");
  res.render("page2"); // index refers to index.ejs
})

app.get("/signup", (req, res) => {
  //res.send("<h1>Welcome to EJS world!</h1>");
  res.render("signupform"); // index refers to index.ejs
})

app.post("/signup", (req, res) => {
  //console.log("submit signup")
  //console.log("Email:" + req.query.email);
  //console.log("Password:" + req.query.password);

    var email = req.query.email;
    var password = req.query.password;

    ////submit form code
    //const { email, password } = req.body
    //console.log("Email:" + email);
    //console.log("Password:" + password);
    ////end submit form

    ///var checkEmail = existEmail(email)
    ////console.log("checkEmail: " + checkEmail)

    //Here are the option object in which arguments can be passed for the python_test.js.
    let options = {
      mode: 'text',
      pythonOptions: ['-u'], // get print results in real-time
        ////scriptPath: 'path/to/my/scripts', //If you are having python_test.py script in same folder, then it's optional.
      //args: [email, password]
      args: [email]
  };

  PythonShell.run('signup.py', options, function (err, result){
        if (err) throw err;
        //// result is an array consisting of messages collected
        ////during execution of script.

        //console.log('result: ', result.toString());
        //console.log('Email from db: ', result.Email.toString());

        //if (result.toString().includes(email))
        //  console.log("match")

        var obj = JSON.parse(result)
        console.log("Email: " + obj.Email)

        //res.send(result.toString())
        //res.redirect("/page2")

        arrError = []
        arrError.push(obj.Email)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(arrError))
  });     
})

app.listen(3100, () => {
  console.log("server started on port 3100")
});
