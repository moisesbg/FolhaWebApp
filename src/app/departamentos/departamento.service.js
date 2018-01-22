/*jshint esversion: 6 */

import AbstractCrudService from "../abstract.crud.service";

export default class DepartamentoService extends AbstractCrudService {

  constructor($http) {
    super($http, 'http://localhost:8080/FolhaWeb-web/api/departamentos');
  }

}

DepartamentoService.$inject = ['$http'];
