const sendmail = require('sendmail')();

sendmail({
    from: 'takashi316@gmail.com',
    to: 'takashi316@gmail.com',
    subject: 'メールのタイトルです',
    text: 'メールの本文です。この例はテキストです。html形式でもOK。',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});
