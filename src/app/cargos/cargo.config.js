/*jshint esversion: 6 */

import CargoListController from './cargo-list.controller';
import CargoFormController from './cargo-form.controller';
import CargoService from './cargo.service';

export const cargoConfig = (modulo) => {

  modulo.service('CargoService', CargoService);
  
  return ['$stateProvider', '$urlRouterProvider', 
   ($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('cargo', {
        template: require('@views/default.html'),
        url: '/cargos',
        onEnter: ['$state', function($state) {
          $state.go('cargo.list');
        }]
      })
      .state('cargo.list', {
        template: require('@views/cargos/cargo-list.html'),
        url: '/list',
        controller: CargoListController,
        controllerAs: 'vm'
      })
      .state('cargo.new', {
        template: require('@views/cargos/cargo-form.html'),
        url: '/new',
        controller: CargoFormController,
        controllerAs: 'vm'
      })
      .state('cargo.edit', {
        template: require('@views/cargos/cargo-form.html'),
        url: '/{id}',
        controller: CargoFormController,
        controllerAs: 'vm'
      });
  }];
};
