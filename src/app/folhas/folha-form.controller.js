/*jshint esversion: 6 */

import swal from 'sweetalert2';
import moment from 'moment';

export default class FolhaFormController {

    constructor($stateParams, $state, FolhaService, Notification) {
        this._service = FolhaService;
        this._state = $state;
        this._notify = Notification;
        this.competencia = {};
        this.dataPagamento = {};
    }

    calcular() {
        this._service.calcular(this.formatarData(this.competencia), this.formatarData(this.dataPagamento))
            .then(resp => {
                this._notify.success('Cálculo de folha executado com sucesso');
                this._state.go('folha.list');
            }).catch(erro => {
                this._notify.error('Erro ao executar o cálculo de folha');
            });
    }

    excluir() {
        swal({
            title: 'Excluir folhas de pagamento',
            text: 'Deseja realmente exlcuir as folhas de pagamento da competência?',
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then(resp => {
            return resp.value ? 
              this._service.remove(this.competencia) :
              Promise.reject({type: 'warning', message: 'Exclusão cancelada.'});
        }).then(response => {
            this.load()
            this._notify.success('Folhas de pagamento excluídas com sucesso');
        }).catch(erro => {
            this._notify({message: erro.message || 'Problemas ao excluir as folhas de pagamento'}, erro.type || 'error');
        }); 
    }

    formatarData(data) {
        return moment(data).format("YYYY-MM-DD");
    }
}

FolhaFormController.$inject = ['$stateParams', '$state', 'FolhaService', 'Notification'];