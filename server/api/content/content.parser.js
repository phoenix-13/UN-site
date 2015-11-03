'use strict';

module.exports = {
  parseFeatured,
  parseSlide,
  parsePartner,
  parseContacts,
  parseBanner,
  parseAbout,
};

function parseFeatured(featured) {
  var res = [];
  for (let item of featured) {
    let current = { title: biling(item.title), link: item.link };
    res.push(current);
  }
  return res;
}

function parseSlide(slide) {
  return {
    title: biling(slide.title),
    image: slide.image,
    link: slide.link
  };
}

function parsePartner(partner) {
  return {
    name: biling(partner.name),
    image: partner.image,
    link: partner.link
  };
}

function parseContacts(contacts) {
  return {
    address: biling(contacts.address),
    coordinates:  {
      latitude: contacts.latitude,
      longitude:contacts.longitude
    },
    phones: contacts.phones,
    fax: contacts.fax,
    mail: contacts.mail
  };
}

function parseBanner(banner) {
  return {
    image: banner.image,
    link: banner.link
  };
}

function parseAbout(about) {
  return biling(about);
}

function biling(value) {
  return {
    geo: value.geo,
    eng: value.eng
  };
}
