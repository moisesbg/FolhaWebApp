/*jshint esversion: 6 */

export default class DepartamentoFormController {

    constructor($stateParams, $state, DepartamentoService, Notification) {
        this.departamento = {}
        this.title = 'Adicionando departamento';
        this._service = DepartamentoService;
        if ($stateParams.id) {
            this.title = 'Editando departamento';
            this._service.findById($stateParams.id)
                .then(data => {
                    this.departamento = data;
                });
        }
        this._state = $state;
        this._notify = Notification;
    }

    save() {
        this._service.save(this.departamento)
            .then(resp => {
                this._notify.success('Departamento salvo com sucesso.');
                this._state.go('departamento.list');
            }).catch(erro => {
                this._notify.error('Erro ao salvar o departamento.');
            });
    }
}

DepartamentoFormController.$inject = ['$stateParams', '$state', 'DepartamentoService', 'Notification'];
