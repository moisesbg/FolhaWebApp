/*jshint esversion: 6 */

import AbstractCrudService from "../abstract.crud.service";

export default class EventoService extends AbstractCrudService {

  constructor($http) {
    super($http, 'http://localhost:8080/FolhaWeb-web/api/eventos');
  }

}

EventoService.$inject = ['$http'];
