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
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contrato',
    templateUrl: './contrato.component.html',
    styleUrls: ['./contrato.component.scss'],
    animations: [routerTransition()],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }, GlobalsProvider]
})
export class ContratoComponent implements OnInit {

    
  closeResult: string;
  modalTitle: string = 'Contrato';
  modalIcon: string = 'fa fa-plus'
  modalName: any;
  modalTemplate: any;
  new: any;
  showView:Boolean = false;
  // It maintains employes form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'create';
  disabled: boolean;
  selectedRow: number;
  searchfilter: string;
  faEdit = faEdit;
    datePickerConfig: Partial<datepicker.BsDatepickerConfig>;
    public numPage: number;
    public pages = 1;
    contracts: any;
    contract: any;
    transactions: any;
    nuevo: any;
    inmovables: any;
    selectedFile: File;

    public contrato: any = {
        transaction:'', 
    }

    constructor(
        private modalService: NgbModal,
        private globals: GlobalsProvider,
        public globalService: GlobalService,
        private coolDialogs: NgxCoolDialogsService,
        public router: Router) {
        this.contracts = [];
        this.contract = [];
        this.nuevo = [];
        this.datePickerConfig = Object.assign({},
            { containerClass: 'theme-dark-blue' },
            { showWeekNumbers: false },
            { dateInputFormat: 'DD/MM/YYYY' },
            { locale: 'es' });
    }

    ngOnInit() {
        this.numPage = this.globals.numPage;       
        this.allTransactions();
        this.allAgents();
        this.allContracts();
    }

    allAgents() {
        this.globalService.getModel("/api/typeProperty").then((result) => {
            this.inmovables = result['data'];
            console.log(this.inmovables);
        }, (err) => {
            console.log(err);
        });
    }

    allTransactions() {
      let   user= JSON.parse(localStorage.user);
        this.globalService.getModel("/api/transaction?status=H,R&userId="+user.id).then((result) => {
            this.transactions = result['data'];
            console.log(this.transactions);
        }, (err) => {
            console.log(err);
        });
    }

    allContracts() {
        this.globalService.getModel("/api/contract").then((result) => {
                this.contracts = result['data'];
                console.log(this.contracts);
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

    
    
apiAction() { //metodo para realizar una accion ya sea crear, editar
   
    const uploadData = new FormData();
    uploadData.append("myFile", this.selectedFile, this.selectedFile.name);

    //declaracion que permite enviar el nuevo json ya sea para crear o editar
    this.new = JSON.stringify({ folioNumber: this.contract.folioNumber, firmDate:  moment(this.contract.firmDate).format('DD/MM/YYYY'), elaborationDate: moment(this.contract.elaborationDate).format('DD/MM/YYYY'), TransactionId: this.contrato.transaction });  
    uploadData.append("contract", this.new);
   
    if (this.submitType === "create") {
        
        //metodo que perimite enviar por post un nuevo empleado
        this.globalService.addModel(uploadData, "/api/contract",this.globalService.getHeaderClear())
            .then((result) => {
                console.log(result);
                if (result['status']) {
                    //Para que actualice la lista una vez que es creado el empleado
                    this.allContracts();
                }

            }, (err) => {
                console.log(err);
            });
    } else {
        
        this.new = JSON.stringify({ folioNumber: this.contract.folioNumber, firmDate:  moment(this.contract.firmDate).format('DD/MM/YYYY'), elaborationDate: moment(this.contract.elaborationDate).format('DD/MM/YYYY')});  
        uploadData.append("contract", this.new);
        this.globalService.updateModel(this.contract.id, uploadData, "/api/contract", this.globalService.getHeaderClear())
            .then((result) => {
                if (result['status']) {
                    //Para que actualice la lista una vez que es editado el service
                    this.allContracts();
                }

            }, (err) => {
                console.log(err);
            });
    }
}

   //solo para abrir el modal estableciendo una accion determinada sea ver, editar, crear 
   open(content, action, index: number) {
 
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.apiAction(); //despues de cerrado el modal se ejecuta la accion de la api
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    //==============================================================================

    this.disabled=false;
    this.modalTemplate = content;
    this.modalName = action;
    this.submitType = action;    // variable que nos permite saber que accion podemos ejecutar ejemplo editar
    this.selectedRow = index;    //aca se toma el indice de el servicio seleccionado
   
    this.contract = Object.assign({}, this.contracts[this.selectedRow]);

    console.log(this.submitType);
    if (action == 'show') {//si la accion es ver, desabilita los campos del modal
        this.disabled = true;
        this.showView = false;
        this.modalIcon = "fa fa-close"

    }
    else
        if (action == 'create') {//si la accion es distinta de ver los campos del modal quedaran activados
            this.disabled = false;
            this.showView = false;
            this.modalIcon = "fa fa-plus"
        } else
            if (action == 'edit') {//si la accion es distinta de ver los campos del modal quedaran activados
                this.disabled = false;
                this.modalIcon = "fa fa-edit";
                this.showView = true;

            }

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


    onCancel() {
        this.showNew = false;
    }

   

    onSelectFile(event) {
        console.log(event); // called each time file input changes
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          this.selectedFile = event.target.files[0];
          
          reader.readAsDataURL(event.target.files[0]); // read file as data url
      
          reader.onload = event => {
            let target: any = event.target; //<-- This (any) will tell compiler to shut up!
            // this.url = target.result;
            console.log(event); // called once readAsDataURL is completed
          };
        }
      }
      
      onFileChanged(event) {
        console.log(event);
        this.selectedFile = event.target.files[0];
      }
}



