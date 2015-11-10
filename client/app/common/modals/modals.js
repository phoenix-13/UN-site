'use strict';

//inject:import
import addUserModal from './addUserModal/addUserModal';
//endinject

export default angular.module('modals', [])
  //inject:ngservice
  .service('addUserModal', addUserModal)
//endinject