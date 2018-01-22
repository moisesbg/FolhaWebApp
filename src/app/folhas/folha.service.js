/*jshint esversion: 6 */

export default class FolhaService {
  
  constructor($http) {
    this._http = $http;
    this._url = 'http://localhost:8080/FolhaWeb-web/api/folhas';
  }

  calcular(competencia, dataPagamento) {
    return this._http.get(`${this._url}/calcular/${competencia}`, { params : {dataPagamento } });
  }

  remove(competencia) {
    return this._http.delete(`${this._url}/${competencia}`);
  }

}

FolhaService.$inject = ['$http'];