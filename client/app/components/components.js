'use strict';

import Main from './main/main';
//inject:import.main
import MainAbout from './main/about/about.js';
import MainArticles from './main/articles/articles.js';
import MainContact from './main/contact/contact.js';
import MainDemographics from './main/demographics/demographics.js';
import MainHome from './main/home/home.js';
import MainIndicator from './main/indicator/indicator.js';
import MainLogin from './main/login/login.js';
import MainPublication from './main/publication/publication.js';
import MainSitemap from './main/sitemap/sitemap.js';
//endinject

import Admin from './admin/admin';
//inject:import.admin
import AdminAboutUs from './admin/aboutUs/aboutUs.js';
import AdminBanner from './admin/banner/banner.js';
import AdminContact from './admin/contact/contact.js';
import AdminDemography from './admin/demography/demography.js';
import AdminFiles from './admin/files/files.js';
import AdminIndicators from './admin/indicators/indicators.js';
import AdminLandingPage from './admin/landingPage/landingPage.js';
import AdminPartners from './admin/partners/partners.js';
import AdminPhotos from './admin/photos/photos.js';
import AdminPrimaryArticles from './admin/primaryArticles/primaryArticles.js';
import AdminPublications from './admin/publications/publications.js';
import AdminSlider from './admin/slider/slider.js';
//endinject

export default angular.module('app.components', [
  Main.name,
  //inject:ngmodule.main
  MainAbout.name,
  MainArticles.name,
  MainContact.name,
  MainDemographics.name,
  MainHome.name,
  MainIndicator.name,
  MainLogin.name,
  MainPublication.name,
  MainSitemap.name,
  //endinject

  Admin.name,
  //inject:ngmodule.admin
  AdminAboutUs.name,
  AdminBanner.name,
  AdminContact.name,
  AdminDemography.name,
  AdminFiles.name,
  AdminIndicators.name,
  AdminLandingPage.name,
  AdminPartners.name,
  AdminPhotos.name,
  AdminPrimaryArticles.name,
  AdminPublications.name,
  AdminSlider.name,
  //endinject
]);
