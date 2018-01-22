/*jshint esversion: 6 */

import * as angular from 'angular';

import { default as uiRouter } from '@uirouter/angularjs';
import { default as uiNotification } from 'angular-ui-notification';
import { default as inputMasks } from 'angular-input-masks';
import { mainConfig } from './main/config';
import { cargoConfig } from './cargos/cargo.config';
import { departamentoConfig } from './departamentos/departamento.config';
import { funcionarioConfig } from './funcionarios/funcionario.config';
import { eventoConfig } from './eventos/evento.config';
import { folhaConfig } from './folhas/folha.config';
import { consultaFolhaConfig } from './consulta-folhas/consulta-folha.config';

require('angular-i18n/angular-locale_pt-br.js');

export const appModule = 'app';

var modulo = angular.module(appModule, [uiRouter, uiNotification, inputMasks]);

modulo.config(mainConfig(modulo))
      .config(cargoConfig(modulo))
      .config(departamentoConfig(modulo))
      .config(funcionarioConfig(modulo))
      .config(eventoConfig(modulo))
      .config(folhaConfig(modulo))
      .config(consultaFolhaConfig(modulo));
