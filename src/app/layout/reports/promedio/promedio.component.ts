import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Chart,Highcharts } from 'angular-highcharts';
import * as moment from 'moment';
import * as datepicker from 'ngx-bootstrap/datepicker';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import { GlobalService } from '../../../providers/global.service';
import * as querystring from 'querystring';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
 


@Component({
    selector: 'app-promedio',
    templateUrl: './promedio.component.html',
    styleUrls: ['./promedio.component.scss'],
    animations: [routerTransition()]

})
export class PromedioComponent implements OnInit {
    selectedValue: string = "";
   
    // defaultValue = this.values[0];
    tipos = [ { value: "1", name: "Barra" }];
    values = ['circular', 'barra', 'lineal'];
    tipos: any = [{ id: 1, name: "circular" }, { id: 2, name: "barra" }, { id: 3, name: "lineal" }];
    public view = false;
    public chart: any;
    propiedad: any = {
        id: '',
        name: ''
    };
    servicio: any= {
        id: 1,
        name: ''
    };
    servicios: any = [];
    propiedades: any = [];
    public solicitud: any = {
        employeeId: '',
        wishDate: '',
        turn: '',
        typeProperty: '',
        TypeServiceId: '',
        TypeRequestId: 3,
        state: '',
        municipality: '',
        parish: '',
        ubication: '',
        description: '',
        typeSpecifications: [],
    };
    state: any;
    fechaI: any;
    states: any;
    municipalities: any;
    parishes: any;
    fechaF: any;
    query: any = {}
    chartDefaultConfiguration: any = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Servicios mas Solicitados por Mes '
        },
                 
        
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.Color && Highcharts.Color) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },               
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.Color && Highcharts.Color) || 'white'
                }
            }
        },

       
  
    };
    constructor(private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
        var doc = new jspdf('p', 'pt');
        this.selectedValue = "0";
        let now = moment().format();
        console.log('hello world', this.tipos);
    }
    downloadImagePDF(){
        var doc = new jspdf()
        var data = document.getElementById('content');  
        html2canvas(data).then(canvas => {  
          // Few necessary setting options  
          var imgWidth = 208;   
          var pageHeight = 295;    
          var imgHeight = canvas.height * imgWidth / canvas.width;  
          var heightLeft = imgHeight;  
      
          const contentDataURL = canvas.toDataURL('image/png')  
          //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
          var position = 0;  
          //pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
          doc.addImage(contentDataURL, 'PNG', 0, 40, imgWidth, imgHeight) 
          doc.setFontSize(30)
          doc.text(55, 25, 'Reportes Estadisticos')
          var img = new Image();
          img.src = "./../../assets/images/ignus3.png"
          doc.addImage(img, 'PNG', 0,3,30,30)
          doc.addImage(img, 'PNG', 180,3,30,30)
          doc.save("Reporte.pdf")
        });  
    
          }

    ngOnInit() {
      this.allStates();
        this.getTypeProperty();
    }

    allStates() {
        this.globalService.getModel(`/api/state/`).then((result) => {
            if (result['status']) {
                this.states = [];
                this.states = result['data'];
            }
        }, (err) => {
            console.log(err);
        });
    }

    llService(){
      this.globalService.getModel("/api/typeService")
        .then((result) => {
          console.log(result);
          this.servicios = result['data'];
          console.log(this.servicios);
        }, (err) => {
          console.log(err);
        });
    }

    loadmunicipality(state) {
        this.municipalities = [];
        this.parishes = [];

        this.globalService.getModel(`/api/state/municipality/${state}`).then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.municipalities = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

    }

    loadparish(municipality) {
        this.globalService.getModel(`/api/municipality/parish/${municipality}`).then((result) => {
            if (result['status']) {
                //Para que actualice la lista una vez que es creado el recaudo
                this.parishes = result['data'];
            }
        }, (err) => {
            console.log(err);
        });

    }

      getTypeProperty(){
      this.globalService.getModel("/api/typeProperty")
        .then((result) => {
          console.log(result);
          this.propiedades = result['data'];
          console.log(this.propiedades);
        }, (err) => {
          console.log(err);
        });
    }

        getTypePropertyNameById(){
        if(this.query.property)
            return this.propiedades.filter(item=>item.id==this.query.property)[0].name
        else
            return ""
    }

        getStateNameById(){
        if(this.query.state)
            return this.states.filter(item=>item.id==this.query.state)[0].name
        else
            return ""
    }

        getMunicipalityNameById(){
        if(this.query.municipality)
            return this.municipalities.filter(item=>item.id==this.query.municipality)[0].name
        else
            return ""
    }

        getParishNameById(){
        if(this.query.parish)
            return this.parishes.filter(item=>item.id==this.query.parish)[0].name
        else
            return ""
    }


    add() {
        this.chart.addPoint(Math.floor(Math.random() * 10));
    }

    allReporte(){
        const stringified = querystring.stringify({start: moment(this.fechaI).format('YYYY/MM/DD'), end: moment(this.fechaF).format('YYYY/MM/DD') })
        console.log(stringified);
        this.globalService.getModel("/api/report/request?")
        .then((result) => {
            this.state = result['data'];
        }, (err) => {
            console.log(err);
        });
    }

    buscar() {

        this.view = true;
        this.query = {
            state: this.solicitud.state,
            municipality: this.solicitud.municipality,
            property: this.propiedad.id,
            parish: this.solicitud.parish,
            start: this.fechaI ? moment(this.fechaI).format('DD/MM/YYYY') : "",
            end: this.fechaF ? moment(this.fechaF).format('dd/MM/YYYY') : ""
        }
        const stringified = querystring.stringify(this.query)
        console.log(stringified);
        this.globalService.getModel("/api/report/service?"+stringified)
        .then((result) => {
            let dataAPI = result['data'];
            this.chartDefaultConfiguration = {...this.chartDefaultConfiguration, ...dataAPI}
            console.log(this.chartDefaultConfiguration),
            this.chart = new Chart(this.chartDefaultConfiguration);
        }, (err) => {
            console.log(err);
        });
    }
}



