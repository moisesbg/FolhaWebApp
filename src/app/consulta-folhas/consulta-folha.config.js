/*jshint esversion: 6 */

import ConsultaFolhaListController from './consulta-folha-list.controller';
import ConsultaFolhaService from './consulta-folha.service';

export const consultaFolhaConfig = (modulo) => {

  modulo.service('ConsultaFolhaService', ConsultaFolhaService);
  
  return ['$stateProvider', '$urlRouterProvider', 
   ($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('consulta-folha', {
        template: require('@views/default.html'),
        url: '/consulta-folhas',
        onEnter: ['$state', function($state) {
          $state.go('consulta-folha.list');
        }]
      })
      .state('consulta-folha.list', {
        template: require('@views/consulta-folhas/consulta-folha-list.html'),
        url: '/list',
        controller: ConsultaFolhaListController,
        controllerAs: 'vm'
      });
  }];
};
