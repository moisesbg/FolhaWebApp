/*jshint esversion: 6 */

import FolhaFormController from './folha-form.controller';
import FolhaService from './folha.service';

export const folhaConfig = (modulo) => {

  modulo.service('FolhaService', FolhaService);
  
  return ['$stateProvider', '$urlRouterProvider', 
   ($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('folha', {
        template: require('@views/default.html'),
        url: '/folhas',
        onEnter: ['$state', function($state) {
          $state.go('folha.new');
        }]
      })
      .state('folha.new', {
        template: require('@views/folhas/folha-form.html'),
        url: '/new',
        controller: FolhaFormController,
        controllerAs: 'vm'
      });
  }];
};
