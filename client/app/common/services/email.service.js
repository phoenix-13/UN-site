'use strict';

export default class {
  constructor($q) {
    'ngInject';
    this.$q = $q;
    this.url = 'https://mandrillapp.com/api/1.0/messages/send.json';
    this.apiKey = '1aD5T4WStNlr_3DsImx5JA';
    this.to = [{
      'email': 'gkochakidze@gmail.com',
      'name': 'gkochakidze',
      'type': 'to'
    }];
  }

  sendEmail(message) {
    console.log(message);
    return this.$q((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: this.url,
        data: {
          'key': this.apiKey,
          'message': {
            'from_email': message.from,
            'to': this.to,
            'autotext': 'true',
            'subject': `${message.person} sent new email!`,
            'html': `<p>theme: ${message.theme}</p><p>content: ${message.content}</p>`
          }
        }
      })
      .done(() => resolve())
      .fail(() => reject());
    });
  }
}