/*jshint esversion: 6 */

import swal from 'sweetalert2';
import moment from 'moment';

export default class FuncionarioListController {

    constructor(FuncionarioService, Notification) {
        this.filterValue = '';
        this._service = FuncionarioService;
        this._notify = Notification;
        this.load();
        
    }

    load() {
        this.funcionarios = [];
        this._service.findAll(this.filterValue)
        .then(data => {
            for(var func of data) {
                func.dataAdmissao = moment(func.dataAdmissao).toDate();
                func.dataCtps = moment(func.dataCtps).toDate();
                func.dataNascimento = moment(func.dataNascimento).toDate();
                this.funcionarios.push(func);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    formatarData(data) {
        return moment(data).format("DD/MM/YYYY");
    }

    excluir(id) {
        swal({
            title: 'Remover funcionario',
            text: 'Deseja realmente remover o funcionario?',
            type: 'warning',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then(resp => {
            return resp.value ? 
              this._service.remove(id) :
              Promise.reject({type: 'warning', message: 'Exclusão cancelada'});
        }).then(response => {
            this.load()
            this._notify.success('Funcionário excluído com sucesso');
        }).catch(erro => {
            this._notify({message: erro.message || 'Problemas ao excluir o funcionário'}, erro.type || 'error');
        }); 
    }
}

FuncionarioListController.$inject = ['FuncionarioService', 'Notification'];