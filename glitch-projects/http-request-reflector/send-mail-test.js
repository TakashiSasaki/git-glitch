const sendmail = require('sendmail')();

sendmail({
    from: 'test@glitch.com',
    to: 'takashi.sasaki.mg@ehime-u.ac.jp',
    subject: 'メールのタイトルです',
    text: 'メールの本文です。この例はテキストです。html形式でもOK。',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});
