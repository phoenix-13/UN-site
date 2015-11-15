'use strict';

import Main from './main/main';
//inject:import.main
import mainabout from './main/about/about';
import mainarticles from './main/articles/articles';
import maincontact from './main/contact/contact';
import maindemographics from './main/demographics/demographics';
import mainhome from './main/home/home';
import mainindicator from './main/indicator/indicator';
import mainindicators from './main/indicators/indicators';
import mainlogin from './main/login/login';
import mainpublication from './main/publication/publication';
import mainpublications from './main/publications/publications';
import mainsearch from './main/search/search';
import mainsitemap from './main/sitemap/sitemap';
//endinject

import Admin from './admin/admin';
//inject:import.admin
import adminaboutUs from './admin/aboutUs/aboutUs';
import adminbanner from './admin/banner/banner';
import admincontact from './admin/contact/contact';
import admindemography from './admin/demography/demography';
import adminindicators from './admin/indicators/indicators';
import adminlandingPage from './admin/landingPage/landingPage';
import adminpartners from './admin/partners/partners';
import adminphotos from './admin/photos/photos';
import adminprimaryArticles from './admin/primaryArticles/primaryArticles';
import adminpublications from './admin/publications/publications';
import adminslider from './admin/slider/slider';
//endinject

export default angular.module('app.components', [
  Main.name,
  //inject:ngmodule.main
  mainabout.name,
  mainarticles.name,
  maincontact.name,
  maindemographics.name,
  mainhome.name,
  mainindicator.name,
  mainindicators.name,
  mainlogin.name,
  mainpublication.name,
  mainpublications.name,
  mainsearch.name,
  mainsitemap.name,
  //endinject

  Admin.name,
  //inject:ngmodule.admin
  adminaboutUs.name,
  adminbanner.name,
  admincontact.name,
  admindemography.name,
  adminindicators.name,
  adminlandingPage.name,
  adminpartners.name,
  adminphotos.name,
  adminprimaryArticles.name,
  adminpublications.name,
  adminslider.name,
  //endinject
]);
