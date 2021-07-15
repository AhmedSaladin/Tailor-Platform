const accountSid = process.env.AC55db1fa300001be2af520c065fa7c77e;
const authToken = process.env.af457622e4ed6321bf2d561d74594bfa;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Your order is finished',
     from: '+201023251617',
     to: '+15558675310'
   })
  .then(message => console.log(message.sid));
