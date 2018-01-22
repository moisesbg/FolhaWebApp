/*jshint esversion: 6 */

export default class EventoFormController {

    constructor($stateParams, $state, EventoService, Notification) {
        this.evento = {};
        this.title = 'Adicionando evento';
        this._service = EventoService;
        if ($stateParams.id) {
            this.title = 'Editando evento';
            this._service.findById($stateParams.id)
                .then(data => {
                    this.evento = data;
                });
        }
        this._state = $state;
        this._notify = Notification;
    }

    save() {
        this._service.save(this.evento)
            .then(resp => {
                this._notify.success('Evento salvo com sucesso.');
                this._state.go('evento.list');
            }).catch(erro => {
                this._notify.error('Erro ao salvar o evento');
            });
    }
}

EventoFormController.$inject = ['$stateParams', '$state', 'EventoService', 'Notification'];
