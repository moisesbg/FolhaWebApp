/*jshint esversion: 6 */
import moment from 'moment';

export default class FuncionarioFormController {

    constructor($stateParams, $state, FuncionarioService, CargoService, DepartamentoService, Notification) {
        
        this.funcionario = {};
        this.cargos = [];
        this.departamentos = [];
        this.title = 'Adicionando funcionario';
        this._service = FuncionarioService;
        this._cargoService = CargoService;
        this._departamentoService = DepartamentoService;
        if ($stateParams.id) {
            this.title = 'Editando funcionario';
            this._service.findById($stateParams.id)
                .then(data => {
                    data.dataAdmissao = moment(data.dataAdmissao).toDate();
                    data.dataNascimento = moment(data.dataNascimento).toDate();
                    data.dataCtps = moment(data.dataCtps).toDate();
                    this.funcionario = data;
                });
        }
        this._state = $state;
        this._notify = Notification;
        
        this.carregarCargos();

        this.carregarDepartamentos();
    }

    //carregar cargos
    carregarCargos() {
        this._cargoService.findAll()
        .then(data => {
            this.cargos = data;
        })
        .catch(error => {
            console.log(error);
        });
    }

    //carregar departamentos
    carregarDepartamentos() {
        this._departamentoService.findAll()
        .then(data => {
            this.departamentos = data;
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    save() {
        this._service.save(this.funcionario)
        .then(resp => {
            this._notify.success('Funcionario salvo com sucesso');
            this._state.go('funcionario.list');
        }).catch(erro => {
            this._notify.error('Erro ao salvar o funcionario');
        });
    }
}

FuncionarioFormController.$inject = ['$stateParams', '$state', 'FuncionarioService', 'CargoService', 
                                        'DepartamentoService','Notification'];