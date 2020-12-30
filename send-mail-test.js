const sendmail = require('sendmail')();

sendmail({
    from: 'test@example.com',
    to: 'test@glitch.me',
    subject: 'メールのタイトルです',
    text: 'メールの本文です。この例はテキストです。html形式でもOK。',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});
