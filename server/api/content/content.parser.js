'use strict';

module.exports = {
  parseFeatured,
  parseSlide,
  parseBanner,
  parsePartner,
  parseContacts,
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

function parseBanner(banner) {
  return {
    title: biling(banner.title),
    image: banner.image,
    link: banner.link
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
      latitude: contacts.coordinates.latitude,
      longitude:contacts.coordinates.longitude
    },
    phones: contacts.phones,
    fax: contacts.fax,
    mail: contacts.mail
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
