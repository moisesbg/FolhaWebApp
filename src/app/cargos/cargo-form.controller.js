/*jshint esversion: 6 */

export default class CargoFormController {

    constructor($stateParams, $state, CargoService, Notification) {
        this.cargo = {};
        this.title = 'Adicionando cargo';
        this._service = CargoService;
        if ($stateParams.id) {
            this.title = 'Editando cargo';
            this._service.findById($stateParams.id)
                .then(data => {
                    this.cargo = data;
                });
        }
        this._state = $state;
        this._notify = Notification;
    }

    save() {
        this._service.save(this.cargo)
            .then(resp => {
                this._notify.success('Cargo salvo com sucesso.');
                this._state.go('cargo.list');
            }).catch(erro => {
                this._notify.error('Erro ao salvar o cargo');
            });
    }
}

CargoFormController.$inject = ['$stateParams', '$state', 'CargoService', 'Notification'];
