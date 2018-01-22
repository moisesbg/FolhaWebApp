/*jshint esversion: 6 */

import swal from 'sweetalert2';

export default class DepartamentoListController {

    constructor(DepartamentoService, Notification) {
        this.filterValue = '';
        this.departamentos = [];
        this._service = DepartamentoService;
        this._notify = Notification;
        this.load();
    }

    load() {
        this._service.findAll(this.filterValue)
          .then(data => {
              this.departamentos = data;
          })
          .catch(error => {
              console.log(error);
          });
    }

    excluir(id) {
        swal({
            title: 'Remover departamento',
            text: 'Deseja realmente remover o departamento?',
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then(resp => {
            return resp.value ? 
              this._service.remove(id) :
              Promise.reject({type: 'warning', message: 'Exclusão cancelada.'});
        }).then(response => {
            this.load();
            this._notify.success('Departamento excluído com sucesso');
        }).catch(erro => {
            this._notify({message: erro.message || 'Problemas ao excluir o departamento'}, erro.type || 'error');
        });
    }
}

DepartamentoListController.$inject = ['DepartamentoService', 'Notification'];
