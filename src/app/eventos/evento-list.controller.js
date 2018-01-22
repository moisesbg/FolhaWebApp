/*jshint esversion: 6 */

import swal from 'sweetalert2';

export default class EventoListController {

    constructor(EventoService, Notification) {
        this.filterValue = '';
        this.eventos = [];
        this._service = EventoService;
        this._notify = Notification;
        this.load();
    }

    load() {
        this._service.findAll(this.filterValue)
          .then(data => {
              this.eventos = data;
          })
          .catch(error => {
              console.log(error);
          });
    }

    excluir(id) {
        swal({
            title: 'Remover evento',
            text: 'Deseja realmente remover o evento?',
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
            this._notify.success('Evento excluído com sucesso');
        }).catch(erro => {
            this._notify({message: erro.message || 'Problemas ao excluir o evento'}, erro.type || 'error');
        }); 
    }
}

EventoListController.$inject = ['EventoService', 'Notification'];
