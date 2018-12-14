import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { GlobalsProvider } from '../../shared';
import { GlobalService } from '../../providers/global.service';
import * as moment from 'moment';
import * as datepicker from 'ngx-bootstrap/datepicker';
@Component({
    selector: 'app-contrato',
    templateUrl: './contrato.component.html',
    styleUrls: ['./contrato.component.scss'],
    animations: [routerTransition()],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }, GlobalsProvider]
})
export class ContratoComponent implements OnInit {

    datePickerConfig: Partial<datepicker.BsDatepickerConfig>;
    public numPage: number;
    public pages = 1;
    closeResult: string;
    contratos: any;
    contrato: any;
    public clients = [];
    public employees = [];
    nuevo: any;
    showNew: Boolean = false;
    submitType: string = 'Guardar';
    selectedRow: number;

    public contract: any = {
        id: '',
        folioNumber: '',
        firmDate: '',
        elaborationDate: '',
        client: {
            id: '',
            firstName: ''
        },
        agent: {
            id:'',
            firstName: ''
        }
    }

    constructor(
        private modalService: NgbModal,
        private globals: GlobalsProvider,
        public globalService: GlobalService) {
        this.contratos = [];
        this.contrato = [];
        this.nuevo = [];
        this.datePickerConfig = Object.assign({},
            { containerClass: 'theme-dark-blue' },
            { showWeekNumbers: false },
            { dateInputFormat: 'DD/MM/YYYY' },
            { locale: 'es' });
    }

    ngOnInit() {
        this.numPage = this.globals.numPage;       
        this.allClientes();
        this.allAgentes();
        this.allContratos();
    }

    allAgentes() {
        this.globalService.getModel("/api/employee").then((result) => {
            this.employees = result['data'];
            console.log(this.employees);
        }, (err) => {
            console.log(err);
        });
    }

    allClientes() {
        this.globalService.getModel("/api/client").then((result) => {
            this.clients = result['data'];
            console.log(this.clients);
        }, (err) => {
            console.log(err);
        });
    }

    allContratos() {
        this.globalService.getModel("/api/contract").then((result) => {
                this.contratos = result['data'];
                console.log(this.contratos);
            }, (err) => {
                console.log(err);
            });
    }

    clientChanged ($event) {
        this.contract.client.id = $event;
        console.log($event);
    }

    agentChanged ($event) {
        this.contract.agent.id = $event;
    }

// aca registrar y verifica el status construyen el cuerpo del json que falta
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            if (this.submitType === 'Guardar') {
                this.nuevo = JSON.stringify({
                    folioNumber: this.contract.folioNumber,
                    firmDate:  moment(this.contract.firmDate).format('DD/MM/YYYY'),
                    elaborationDate: moment(this.contract.elaborationDate).format('DD/MM/YYYY'),
                    ClientId: this.contract.client.id,                         
                    EmployeeId: this.contract.agent.id                   
                 });
                 console.log(this.nuevo);
                this.globalService.addModel(this.nuevo, "/api/contract").then((result) => {
                    if (result['status']) {
                        this.globalService.getModel("/api/contract").then((result) => {
                            this.contratos = result['data'];
                            console.log(this.contratos);
                        }, (err) => {
                            console.log(err);
                        });
                    }

                }, (err) => {
                    console.log(err);
                });
            }
        else {
                this.globalService.updateModel(this.contrato.id, this.contrato, "/api/contract").then((result) => {
                    if (result['status']) {                  
                        this.globalService.getModel("/api/contract").then((result) => {
                            this.contratos = result['data'];
                            console.log(this.contratos);
                        }, (err) => {
                            console.log(err);
                        });
                    }

                }, (err) => {
                    console.log(err);
                });

            }         
            this.showNew = false;
        }
            , (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }   

    faEye = faEye;
    faEdit = faEdit;
    faTrash = faTrash;

    onEdit(index: number) {
        this.submitType = 'Update';
        this.selectedRow = index;
        this.contrato = Object.assign({}, this.contratos[this.selectedRow]);
        this.showNew = true;
    }

  
    onDelete(index: number) {
        console.log('eliminando');
        this.selectedRow = index;
        this.contrato = Object.assign({}, this.contratos[this.selectedRow]);
        this.showNew = true;
        
        if (confirm('¿Estas seguro de eliminar este contrato?')) {
            this.globalService.removeModel(this.contrato.id, "/api/contract").then((result) => {
                    console.log(result);
                    if (result['status']) {
                      
                        this.globalService.getModel("/api/contract").then((result) => {
                                console.log(result);
                                this.contratos = result['data'];
                            }, (err) => {
                                console.log(err);
                            });
                    }
                }, (err) => {
                    console.log(err);
                });
        }
    }

    onCancel() {
        this.showNew = false;
    }
}


