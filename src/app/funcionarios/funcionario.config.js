/*jshint esversion: 6 */

import FuncionarioListController from './funcionario-list.controller';
import FuncionarioFormController from './funcionario-form.controller';
import FuncionarioService from './funcionario.service';

export const funcionarioConfig = (modulo) => {

  modulo.service('FuncionarioService', FuncionarioService);
  
  return ['$stateProvider', '$urlRouterProvider', 
   ($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('funcionario', {
        template: require('@views/default.html'),
        url: '/funcionarios',
        onEnter: ['$state', function($state) {
          $state.go('funcionario.list');
        }]
      })
      .state('funcionario.list', {
        template: require('@views/funcionarios/funcionario-list.html'),
        url: '/list',
        controller: FuncionarioListController,
        controllerAs: 'vm'
      })
      .state('funcionario.new', {
        template: require('@views/funcionarios/funcionario-form.html'),
        url: '/new',
        controller: FuncionarioFormController,
        controllerAs: 'vm'
      })
      .state('funcionario.edit', {
        template: require('@views/funcionarios/funcionario-form.html'),
        url: '/{id}',
        controller: FuncionarioFormController,
        controllerAs: 'vm'
      });
  }];
};
