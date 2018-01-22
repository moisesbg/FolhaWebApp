/*jshint esversion: 6 */

export default class ConsultaFolhaService {
  
  constructor($http) {
    this._http = $http;
    this._url = 'http://localhost:8080/FolhaWeb-web/api/folhas';
  }

  consultarFolha(competencia, funcionarioId) {
    return this._http.get(`${this._url}/${competencia}/funcionario/${funcionarioId}`)
      .then(response => response.data);
  }
}

ConsultaFolhaService.$inject = ['$http'];