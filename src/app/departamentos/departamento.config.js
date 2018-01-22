/*jshint esversion: 6 */

import DepartamentoListController from './departamento-list.controller';
import DepartamentoFormController from './departamento-form.controller';
import DepartamentoService from './departamento.service';

export const departamentoConfig = (modulo) => {

  modulo.service('DepartamentoService', DepartamentoService);
  
  return ['$stateProvider', '$urlRouterProvider', 
   ($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('departamento', {
        template: require('@views/default.html'),
        url: '/departamentos',
        onEnter: ['$state', function($state) {
          $state.go('departamento.list');
        }]
      })
      .state('departamento.list', {
        template: require('@views/departamentos/departamento-list.html'),
        url: '/list',
        controller: DepartamentoListController,
        controllerAs: 'vm'
      })
      .state('departamento.new', {
        template: require('@views/departamentos/departamento-form.html'),
        url: '/new',
        controller: DepartamentoFormController,
        controllerAs: 'vm'
      })
      .state('departamento.edit', {
        template: require('@views/departamentos/departamento-form.html'),
        url: '/{id}',
        controller: DepartamentoFormController,
        controllerAs: 'vm'
      });
  }];
};
