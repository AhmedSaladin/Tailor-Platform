const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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',
}
}));


// in the function where i want to message
transporter.sendMail({
    to: email ,
    from: 'Tailor@Tailor_shop.com',
    subject: "Don't replay to this",
    html: '<h1>Thank you for choosing us</h1>'
})