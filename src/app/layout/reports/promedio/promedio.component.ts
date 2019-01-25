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
    public view = false;
    public chart: any;
    logoURL: string = ""
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
        state: {
            id: '',
            name: ''
        },
        municipality: {
            id: '',
            name: ''
        },
        parish: {
            id: '',
            name: ''
        },
        ubication: '',
        description: '',
        typeSpecifications: [],
    };
    state: any;
    fechaI: any;
    states: any;
    imagen: any;
    agencia: any;
    agencias: any;
    municipalities: any 
    parishes: any;
    fechaF: any;
    query: any = {}
    chartDefaultConfiguration: any = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: []
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
    convertImgToBase64URL(url, callback){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d'), dataURL;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL("image/png");
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    }

    downloadImagePDF(){
        this.convertImgToBase64URL(this.logoURL, (base64Img) =>{
            this.imagen = base64Img; // myBase64 is the base64 string
            var doc = new jspdf()
        var data = document.getElementById('content');
        html2canvas(data).then(canvas => {
          // Few necessary setting options
          var imgWidth = 185;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;

          const contentDataURL = canvas.toDataURL('image/png')
          var position = 0;
          doc.addImage(contentDataURL, 'PNG', 10, 55, imgWidth, imgHeight)
          doc.setFontSize(10)
          doc.text(78, 25, this.agencias.name+" "+this.agencias.rif)
          doc.setFontSize(10)
          let middleUbication = this.agencias.ubication.lastIndexOf(' ',this.agencias.ubication.length/2)
          doc.text(70, 30, this.agencias.ubication.substr(0,middleUbication))
          doc.text(71, 35, this.agencias.ubication.substr(middleUbication+1,this.agencias.ubication.length))
          doc.setFontSize(10)
          doc.text(84, 40, this.agencias.phoneNumber+ " / " +this.agencias.phoneNumber2)
          doc.addImage(this.imagen, 'PNG', 10,8,20,20)
          doc.addImage(this.imagen, 'PNG', 180,8,20,20)
 
          doc.save("Reporte-Mas-Solicitados.pdf") 
        });
        });


          }

          getLogo(){
            this.globalService.getModel("/api/agency/logo")
            .then((result) => {
                console.log(result);
                this.logoURL = result['data']['url'];
            }, (err) => {
                console.log(err);
            });
        }

    ngOnInit() {
      this.allStates();
        this.getTypeProperty();
        this.getLogo();
        this.allAgency();
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

    allAgency(){
        this.globalService.getModel("/api/agency")
        .then((result) => {
            console.log(result);
            this.agencias = result['data'];
            console.log(this.agencias);
        }, (err) => {
            console.log(err);
        });
    }

    allService(){
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
        const value = this.states.filter(item=>item.id==this.query.state)[0]
        return value ? value.name : ""
    }

        getMunicipalityNameById(){
        const value = this.municipalities.filter(item=>item.id==this.query.municipality)[0]
        return value ? value.name : ""
    }

        getParishNameById(){
        const value = this.parishes.filter(item=>item.id==this.query.parish)[0]
        return value ? value.name : ""
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
            start: this.fechaI ? moment(this.fechaI).format('YYYY/MM/DD') : "",
            end: this.fechaF ? moment(this.fechaF).format('YYYY/MM/DD') : ""
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



