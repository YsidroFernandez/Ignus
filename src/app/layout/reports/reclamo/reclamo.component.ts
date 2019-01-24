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
    selector: 'app-reclamo',
    templateUrl: './reclamo.component.html',
    styleUrls: ['./reclamo.component.scss'],
    animations: [routerTransition()]

})
export class ReclamoComponent implements OnInit {
    selectedValue: string = "";
   
    // defaultValue = this.values[0];
    tipos = [ { value: "1", name: "Barra" }];
    values = ['circular', 'barra', 'lineal'];
    public view = false;
    public chart: any;
    logoURL: string = ""
    agencia: any;
    imagen: any;
    agencias: any;
    contacto: any = {
        id: '',
        name: ''
    };
    contactos: any = [];
    asunto: any = {
        id: '',
        name: ''
    };
    asuntos: any = [];
    estatu: any = {
        id: 'A'
    };
    estatus: any = [{
        id: 'A',
        status: 'Atendida'
    },{
        id: 'E',
        status: 'Por responder'
    },{
        id: 'B',
        status: 'Borrada'
    }];
    fechaI: any;
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
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', "Junio","Agosto","Septimbre","Octubre","Noviembre","Diciembre"]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Porcentaje de Reclamos'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Respecto al Servicio',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Atencion al cliente',
            data: [2, 2, 3, 2, 1]
        },{
            name: 'Graficas y Contenido',
            data: [2, 2, 3, 2, 1]
        },{
            name: 'Aplicacion Movil',
            data: [2, 2, 3, 2, 1]
        },{
            name: 'Promociones y Ofertas',
            data: [3, 4, 4, 2, 5]
        }]

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
          var imgWidth = 208;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;

          const contentDataURL = canvas.toDataURL('image/png')
          var position = 0;
          doc.addImage(contentDataURL, 'PNG', 0, 55, imgWidth, imgHeight)
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
 
          doc.save("Reporte-Solicitudes.pdf") 
        });
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
        this.getAllContact();
        this.getAllSubject();
        this.getLogo();
        this.allAgency();
    }

   
    getAllContact(){
        this.globalService.getModel("/api/typeContact")
          .then((result) => {
            console.log(result);
            this.contactos = result['data'];
            console.log(this.contactos);
          }, (err) => {
            console.log(err);
          });
      }
      getAllSubject(){
        this.globalService.getModel("/api/subject")
          .then((result) => {
            console.log(result);
            this.asuntos = result['data'];
            console.log(this.asuntos);
          }, (err) => {
            console.log(err);
          });
      }

      getTypeContactNameById(){
        if(this.query.typeContact)
            return this.contactos.filter(item=>item.id==this.query.typeContact)[0].name
        else
            return ""
    }

    getEstatusNameById(){
        if(this.query.status)
            return this.estatus.filter(item=>item.id==this.query.status)[0].status
        else
            return ""
    }

    add() {
        this.chart.addPoint(Math.floor(Math.random() * 10));
    }

    buscar() {

        this.view = true;
        this.query = {
            typeContact: this.contacto.id,
            status: this.estatu.id,
            start: this.fechaI ? moment(this.fechaI).format('DD/MM/YYYY') : "",
            end: this.fechaF ? moment(this.fechaF).format('DD/MM/YYYY') : ""
        }
        const stringified = querystring.stringify(this.query)
        console.log(stringified);
        this.globalService.getModel("/api/report/request?"+stringified)
        .then((result) => {
            let dataAPI = result['data'];
            this.chartDefaultConfiguration = {...this.chartDefaultConfiguration}
            console.log(this.chartDefaultConfiguration)
            this.chart = new Chart(this.chartDefaultConfiguration);
        }, (err) => {
            console.log(err);
        });
    }
}


