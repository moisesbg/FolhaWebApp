/*jshint esversion: 6 */

import AbstractCrudService from "../abstract.crud.service";

export default class CargoService extends AbstractCrudService {

  constructor($http) {
    super($http, 'http://localhost:8080/FolhaWeb-web/api/cargos');
  }

}

CargoService.$inject = ['$http'];
