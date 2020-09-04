const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const sgMail = require('@sendgrid/mail')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')));

app.post('/send', function (req, res) {

  const { firstName, lastName, role, otherRole, phoneNumber, group, date, signature } = req.body
  const { highTemperature, soreThroat, uncontrolledCough, diarrheaVomitingAbdominalPain, headachesMuscleaches, lossTasteSmell } = req.body.symptoms
  const { covidContact, exposureCovidArea, communityTransmission } = req.body.exposures
  const status = highTemperature || soreThroat || uncontrolledCough || diarrheaVomitingAbdominalPain || headachesMuscleaches || lossTasteSmell || covidContact || exposureCovidArea || communityTransmission ? 'NOT CLEAR' : 'CLEAR'


  

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'rcs.covid.daily@gmail.com',
      from: 'rcs.covid.daily@gmail.com',
      subject: `${group} / ${date} / ${firstName} ${lastName} / ${status}`,
      text:
        `
        GROUP: ${group} \r
        DATE: ${date} \r
        NAME: ${firstName} ${lastName} \r
        ROLE: ${role === 'other'? otherRole : role} \r
        STATUS: ${status} \r
        TELEPHONE NUMBER: ${phoneNumber}
        \r\n
        High Temperature: ${highTemperature} \r
        Sore Throat: ${soreThroat} \r
        Uncontrolled Cough: ${uncontrolledCough} \r
        Diarrhea, vomiting, or abdominal pain: ${diarrheaVomitingAbdominalPain} \r
        Severe Headache: ${headachesMuscleaches} \r
        Loss of Taste or Smell: ${lossTasteSmell} \r
        \r\n
        Close Contact with Confirmed Case of COVID-19: ${covidContact} \r
        Traveled or Lived in the area with a large number of COVID-19 cases: ${exposureCovidArea} \r
        Live in areas of high community transmission: ${communityTransmission} \r
        \r\n
        SIGNATURE: ${signature}
        
        `,
      // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail.send(msg);
    return res.send('sending');
  } catch (e) {
    return res.send(e.getMessage())
  }


});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
