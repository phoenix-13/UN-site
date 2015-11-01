'use strict';

module.exports = {
  parseContacts: parseContacts
};

function parseContacts(contacts) {
  return {
    address: contacts.address,
    coordinates:  {
      latitude: contacts.latitude,
      longitude:contacts.longitude
    },
    phones: contacts.phones,
    fax: contacts.fax,
    mail: contacts.mail
  };
}
