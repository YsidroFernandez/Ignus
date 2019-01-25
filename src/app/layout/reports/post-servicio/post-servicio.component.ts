import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { GlobalService } from '../../../providers/global.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as querystring from 'querystring';
import { GlobalsProvider } from '../../../shared';
import * as $ from 'jquery';
import * as datepicker from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-post-servicio',
    templateUrl: './post-servicio.component.html',
    styleUrls: ['./post-servicio.component.scss'],
    animations: [routerTransition()],

})
export class PostServicioComponent implements OnInit {
    
  datePickerConfig: Partial<datepicker.BsDatepickerConfig>;
  
  imagen: any;

  entity1: any={
    id:'',
    name:''
  };
  entity2: any={
    id:'',
    name:''
  };
  entity3: any={
    id:'',
    name:''
  };
  entity4: any={
    id:'',
    name:''
  };
  
  entities: any;
  atributes: any;
  entities2: any;
  atributes2: any;
  servicio: any= {
      id: Number,
      name: ''
  };

  status: any= [
      {
          id:1,
          name:'Aceptada'
      },
      {
          id:2,
          name:'Rechazada'
      }
  ];

 
  ngxValue: any = [];
  servicios: any = [];
  public view = false;
  public chart: any;
  fechaI: any;
  fechaF: any;
  query: any = {}
  logoURL: string = ""

  constructor(private modalService: NgbModal, public globalService: GlobalService, private coolDialogs: NgxCoolDialogsService) {
      let now = moment().format();
      var doc = new jspdf('p', 'pt');
      
  }

  ngOnInit() {
      this.loadEntities();
      this.loadEntities2();
      this.allService();
      this.getLogo(); 
  }
  public doSelectOptions = (options) => console.log(this.ngxValue, options);

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
        doc.text(78, 25, this.entities.name+" "+this.entities.rif)
        doc.setFontSize(10)
        let middleUbication = this.entities.ubication.lastIndexOf(' ',this.entities.ubication.length/2)
        doc.text(70, 30, this.entities.ubication.substr(0,middleUbication))
        doc.text(71, 35, this.entities.ubication.substr(middleUbication+1,this.entities.ubication.length))
        doc.setFontSize(10)
        doc.text(84, 40, this.entities.phoneNumber+ " / " +this.entities.phoneNumber2)
        doc.addImage(this.imagen, 'PNG', 10,8,20,20)
        doc.addImage(this.imagen, 'PNG', 180,8,20,20)

        doc.save("Reporte-Solicitudes.pdf") 
      });
      });


        }

        getLogo(){
          this.globalService.getModel("/api/agency/logo")
          .then((result) => {
              this.logoURL = result['data']['url'];
          }, (err) => {
              console.log(err);
          });
      }


      allReporte(){
          const stringified = querystring.stringify({start: moment(this.servicio.fechaI).format('YYYY/MM/DD'), end: moment(this.servicio.fechaF).format('YYYY/MM/DD'), typeS: this.servicio.id })
          console.log(stringified);
          this.globalService.getModel("/api/report/request?")
          .then((result) => {
              this.entities = result['data'];
          }, (err) => {
              console.log(err);
          });
      }


  allService(){
    this.globalService.getModel("/api/typeService")
      .then((result) => {
        this.servicios = result['data'];
      }, (err) => {
        console.log(err);
      });
  }

 
  getTypeServiceNameById(){
      if(this.query.typeS)
          return this.servicios.filter(item=>item.id==this.query.typeS)[0].name
      else
          return ""
  }


  add() {
      this.chart.addPoint(Math.floor(Math.random() * 10));
  }
  buscar() {  
      this.view = true;
      this.query = {
          typeS: this.servicio.id,
      }
      const stringified = querystring.stringify(this.query)
      console.log(stringified);
  }



  loadEntities() {
    this.globalService.getModel(`/api/agency/tables`).then(
      result => {
        if (result["status"]) {
          this.entities = result["data"];
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  loadAtributes(id) {
    this.globalService.getModel(`/api/agency/columns/${id}`).then(
      result => {
        if (result["status"]) {
          this.atributes = result["data"];
          console.log(this.atributes);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
 
  loadEntities2() {
    this.globalService.getModel(`/api/agency/tables`).then(
      result => {
        if (result["status"]) {
          this.entities2 = result["data"];
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  loadAtributes2(id) {
    this.globalService.getModel(`/api/agency/columns/${id}`).then(
      result => {
        if (result["status"]) {
          this.atributes2 = result["data"];
          console.log(this.atributes);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
 

}
