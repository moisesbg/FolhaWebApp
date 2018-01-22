/*jshint esversion: 6 */

import swal from 'sweetalert2';
import moment from 'moment';

export default class ConsultaFolhaListController {

    constructor(ConsultaFolhaService, Notification) {
        this._service = ConsultaFolhaService;
        this._notify = Notification;
        this.folha = {};
        this.competencia = {};
        this.funcionarioId = 0;
        this.totalProvento = 0;
        this.totalDesconto = 0;
        this.liquido = 0;
        
    }

    consultar() {
        this.folha = {};
        this.totalProvento = 0;
        this.totalDesconto = 0;
        this.liquido = 0;
        this._service.consultarFolha(this.formatarData(this.competencia), this.funcionarioId)
          .then(data => {
              data.funcionario.dataAdmissao = moment(data.funcionario.dataAdmissao).toDate();
              data.dataPagamento = moment(data.dataPagamento).toDate();
              this.folha = data;
              this.calcularTotais();
          })
          .catch(error => {
              console.log(error);
          });
    }

    formatarData(data) {
        return moment(data).format("YYYY-MM-DD");
    }

    calcularTotais() {
        for(var item of this.folha.itensFolha) {
            if(item.evento.tipoEvento == 'PROVENTO') {
                this.totalProvento += item.valorCalculado;
                this.liquido += item.valorCalculado;
            } else {
                this.totalDesconto += item.valorCalculado;
                this.liquido -= item.valorCalculado;
            }
        }
    }
}

ConsultaFolhaListController.$inject = ['ConsultaFolhaService', 'Notification'];