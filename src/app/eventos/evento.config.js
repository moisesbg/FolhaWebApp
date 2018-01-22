/*jshint esversion: 6 */

import EventoListController from './evento-list.controller';
import EventoFormController from './evento-form.controller';
import EventoService from './evento.service';

export const eventoConfig = (modulo) => {

  modulo.service('EventoService', EventoService);
  
  return ['$stateProvider', '$urlRouterProvider', 
   ($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('evento', {
        template: require('@views/default.html'),
        url: '/eventos',
        onEnter: ['$state', function($state) {
          $state.go('evento.list');
        }]
      })
      .state('evento.list', {
        template: require('@views/eventos/evento-list.html'),
        url: '/list',
        controller: EventoListController,
        controllerAs: 'vm'
      })
      .state('evento.new', {
        template: require('@views/eventos/evento-form.html'),
        url: '/new',
        controller: EventoFormController,
        controllerAs: 'vm'
      })
      .state('evento.edit', {
        template: require('@views/eventos/evento-form.html'),
        url: '/{id}',
        controller: EventoFormController,
        controllerAs: 'vm'
      });
  }];
};
