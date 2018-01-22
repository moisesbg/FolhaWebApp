/*jshint esversion: 6 */

import swal from 'sweetalert2';

export default class CargoListController {

    constructor(CargoService, Notification) {
        this.filterValue = '';
        this.cargos = [];
        this._service = CargoService;
        this._notify = Notification;
        this.load();
    }

    load() {
        this._service.findAll(this.filterValue)
          .then(data => {
              this.cargos = data;
          })
          .catch(error => {
              console.log(error);
          });
    }

    excluir(id) {
        swal({
            title: 'Remover cargo',
            text: 'Deseja realmente remover o cargo?',
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
            this.load()
            this._notify.success('Cargo excluído com sucesso');
        }).catch(erro => {
            this._notify({message: erro.message || 'Problemas ao excluir o cargo'}, erro.type || 'error');
        }); 
    }
}

CargoListController.$inject = ['CargoService', 'Notification'];
