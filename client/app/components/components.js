'use strict';

import Main from './main/main';
//inject:import.main
import about from './main/about/about';
import home from './main/home/home';
//endinject

import Admin from './admin/admin';
//inject:import.admin
import aboutUs from './admin/aboutUs/aboutUs';
import addIndicator from './admin/addIndicator/addIndicator';
import contact from './admin/contact/contact';
import demography from './admin/demography/demography';
import indicators from './admin/indicators/indicators';
import landingPage from './admin/landingPage/landingPage';
import partners from './admin/partners/partners';
import publications from './admin/publications/publications';
import users from './admin/users/users';
//endinject

export default angular.module('app.components', [
  Main.name,
  //inject:ngmodule.main
  about.name,
  home.name,
  //endinject

  Admin.name,
  //inject:ngmodule.admin
  aboutUs.name,
  addIndicator.name,
  contact.name,
  demography.name,
  indicators.name,
  landingPage.name,
  partners.name,
  publications.name,
  users.name,
  //endinject
]);
