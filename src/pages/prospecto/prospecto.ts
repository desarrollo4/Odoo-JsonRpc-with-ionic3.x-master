import { HomePage } from './../home/home';
import { OdooJsonRpc } from '../../services/odoojsonrpc';
import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController, NavParams, LoadingController, Platform, ToastController, AlertController, Searchbar  } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { Base64 } from '@ionic-native/base64';
@Component({
    selector: 'page-prospecto',
    templateUrl: 'prospecto.html',
})
export class ProspectoPage {

  @ViewChild('searchbarp') Vsearchbar : Searchbar;

  base64: any;
    //Div a habilitar segun categoria del producto
    public div_cctv: boolean;
    public div_eps: boolean;
    public div_cae: boolean;
    public div_els: boolean;
    public div_alarmas: boolean;
    public div_incendios: boolean;

    //Nombre de las zonas
    public nombreHabitacionCCTV: Array<any> = [];
    public nombreHabitacionCAE: Array<any> = [];
    public nombreHabitacionAlarmas: Array<any> = [];
    public nombreHabitacionIncendios: Array<any> = [];

    //tipo pared o muro
    public tipoParedHabitacionCCTV: Array<any> = [];
    public tipoPuertaHabitacionCAE: Array<any> = [];
    public tipoPuertaHabitacionAlarma: Array<any> = [];
    public tipoParedHabitacionAlarma: Array<any> = [];
    public tipoParedHabitacionIncendio: Array<any> = [];

    //Zonas
    public habitacionesCCTV: any;
    public habitacionesCAE: any;
    public habitacionesAlarmas: any;
    public habitacionesIncendios: any;

    //Lista de nombres
    public listaHabitacionesCCTV: Array<number> = [];
    public listaHabitacionesCAE: Array<number> = [];
    public listaHabitacionesAlarmas: Array<number> = [];
    public listaHabitacionesIncendios: Array<number> = [];

    public pestanias: string = "prospecto";
    public tipoGama: string = "baja";

    public camarasCCTV: Array<any> = [];
    public aproMtsCCTV: Array<any> = [];
    public altMtsCCTV: Array<any> = [];
    public picturesCCTV: Array<any> = [];
    public adjuntosCCTV: Array<any> = []
    public obserZonaCCTV: Array<any> = [];

    public alarmasHabitacion: Array<any> = []
    public aproMtsAlarmas: Array<any> = [];
    public altMtsAlarmas: Array<any> = [];
    public picturesAlarmas: Array<any> = [];
    public adjuntosAlarmas: Array<any> = []
    public obserZonaAlarmas: Array<any> = [];

    public sensoresIncendio: Array<any> = []
    public aproMtsIncendio: Array<any> = [];
    public altMtsIncendio: Array<any> = [];
    public picturesIncendio: Array<any> = [];
    public adjuntosIncendio: Array<any> = []
    public obserZonaIncendio: Array<any> = [];

    public oportunity_id: any;
    public list_necesidades: any;
    public necCliente: any;
    public toolbar: boolean;

    public entradaHabitacionCAE: Array<any> = [];
    public salidaHabitacionCAE: Array<any> = [];
    public cantAccesosHabitacion: any;
    public adjuntosCAE: Array<any> = []
    public obserZonaCAE: Array<any> = [];

    public list_items: Array<any> = [];
    public list_items_carrito: Array<any> = [];
    public porcentajeUtilidad: Array<any> = []
    public subTotal: number = 0;
    public total: number = 0;

    //otros datos de procpecto
      //Alarmas
    public lugarImplementacionAlarmas:any;
    public sisMonitoreo:any;
    public canalUnidadCentralProcesoAlarmas:any;
    public sistemaMonitoreoAlarmas:any;

      //equipo liviano
      public cantDineroAl:any;
      public lugarInstEquipo:any;
      public tipoEquipo:any;
      public teOtro:any;
      public elementosNecesariosInstalacion:any;
      public eniOtro:any;
      public colorBlindaje:any;
      public cbOtro:any;
      public frente:any;
      public fondo:any;
      public alto:any;

      public   prospecto_id:any;

    //cctv
      public lugarImplementacion:any;
      public sistemaMonitoreo:any;
      public canalUnidadCentralProceso:any;
      public productosCotizacion: Array<any> = [];
      public is_sistemaMonitoreoCCTV:any;
      public sistemaMonitoreoCCTV:any;

    //equipo pesado
      public desaBlindaje:any;
      public tipoAlmacenar:any;
      public taOtro:any;
      public lugarImplementacionEPS:any;
      public nivelBlindaje:any;

      //INCENDIO

      public lugarImplementacionINC:any;
      public sistemaMonitoreoINC:any;
      public canalUnidadCentralProcesoINC:any;
      public ismonitorigINC:any;

      public nombreHabitacionIncendios_:any;
      public sensoresIncendio_:any;
      public tipoParedHabitacionIncendioT:any;
      public aproMtsIncendio_:any;
      public altMtsIncendio_:any;
      public obserZonaIncendio_:any;

      public imageURL:any;

    //cotizacion
      order_line:any;
      attachment:any;
      id_area:any;

      public sections: any = {
        first : 'first',
        second: 'second',
        three : 'three',
        selectedSection: ''
     };

     allData = []; //Store all data from provider
     filterData = [];//Store filtered data
     searchTerm: string = '';

    constructor(public alertCtrl: AlertController, public fbase64: Base64, public navCtrl: NavController, public navParams: NavParams, private odooRpc: OdooJsonRpc, public loadingCtrl: LoadingController, platform: Platform, public toastCtrl: ToastController, private camera: Camera, private sanitizer: DomSanitizer, private fileChooser: FileChooser, private file: File) {
        this.oportunity_id = navParams.get("id");


    }


    Alert(Title, msg) {
      var btnsearch = document.getElementById('btnsearchp');
      btnsearch.style.display = "block";
      let alert = this.alertCtrl.create({
        title: Title,
        message: msg,
        buttons: [
          {
            text: 'Ok',
            handler: () => {

              console.log('ok clicked');
              //this.navCtrl.setRoot(HomePage);
              this.pestanias  = 'catalogo';
            }
          }
        ]
      });
      alert.present();
    }



    ionViewDidEnter() {

    }
    ionViewDidLoad() {
      console.log(this.oportunity_id);
      this.get_necesidad_cliente();
    }
    setFilter() {
      console.log(this.list_items);
      this.filterData = this.list_items.filter((item) => {
        return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    }

    search() {
      var title     = document.getElementById('titlep');
      var searchbar = document.getElementById('searchbarp');
      var closebar  = document.getElementById('closebarp');
      var btnsearch = document.getElementById('btnsearchp');

      title.style.display = "none";
      searchbar.style.display = "block";
      btnsearch.style.display = "none";
      closebar.style.display = "block";
      this.Vsearchbar.setFocus();


    }

    closebar() {
      var title     = document.getElementById('titlep');
      var searchbar = document.getElementById('searchbarp');
      var closebar  = document.getElementById('closebarp');
      var btnsearch = document.getElementById('btnsearchp');

      searchbar.nodeValue = '';
      this.Vsearchbar.clearInput(null);
      this.allData = this.list_items;
      this.filterData = this.allData;

      searchbar.style.display = "none";
      this.searchTerm = '';
      btnsearch.style.display = "block";
      title.style.display = "block";
      closebar.style.display = "none";
    }


    private get_necesidad_cliente() {
        let loading = this.loadingCtrl.create({
            content: "Por Favor Espere..."
        });
        loading.present();
        let table = "product.category"
        this.odooRpc.searchRead(table, [], [], 0, 0, "").then((tags: any) => {
            let json = JSON.parse(tags._body);
            if (!json.error) {
                this.list_necesidades = json["result"].records;
                loading.dismiss();
            }
        });
    }
    public habilitarHabitacionesCCTV(zonas) {
        this.habitacionesCCTV = zonas;
        this.listaHabitacionesCCTV = [];
        let arrayName: any;
        for (let i = 1; i <= this.habitacionesCCTV; i++) {
            arrayName = { id: i };
            this.picturesCCTV[i] = []
            this.listaHabitacionesCCTV.push(arrayName);
        }
    }
    public habilitarHabitacionesCAE(zonas) {
        this.habitacionesCAE = zonas;
        this.listaHabitacionesCAE = [];
        let arrayName: any;
        for (let i = 1; i <= this.habitacionesCAE; i++) {
            arrayName = { id: i };
            this.listaHabitacionesCAE.push(arrayName);
        }
    }
    public habilitarHabitacionesAlarmas(zonas) {
        this.habitacionesAlarmas = zonas;
        this.listaHabitacionesAlarmas = [];
        let arrayName: any;
        for (let i = 1; i <= this.habitacionesAlarmas; i++) {
            arrayName = { id: i };
            this.picturesAlarmas[i] = []
            this.listaHabitacionesAlarmas.push(arrayName);
        }
    }
    public habilitarHabitacionesIncendios(zonas) {
        this.habitacionesIncendios = zonas;
        this.listaHabitacionesIncendios = [];
        let arrayName: any;
        for (let i = 1; i <= this.habitacionesIncendios; i++) {
            arrayName = { id: i };
            this.picturesIncendio[i] = []
            this.listaHabitacionesIncendios.push(arrayName);
        }
    }
    public habilita_formulario(necesidad) {
        this.toolbar = true;
        this.div_els = false;
        this.div_cctv = false;
        this.div_eps = false;
        this.toolbar = false;
        this.div_alarmas = false;
        this.div_incendios = false;
        this.div_cae = false;
        if (necesidad.length > 0) {
            for (let nec of necesidad) {
                switch (nec) {
                    //cctv
                    case "7":
                        this.div_cctv = true;
                        this.div_els = false;
                        this.div_eps = false;
                        this.toolbar = false;
                        this.div_alarmas = false;
                        this.div_incendios = false;
                        this.div_cae = false;
                        this.get_productos(nec);
                        break;
                    //eps
                    case "8":
                        this.div_eps = true;
                        this.div_els = false;
                        this.div_cctv = false;
                        this.toolbar = false;
                        this.div_alarmas = false;
                        this.div_incendios = false;
                        this.div_cae = false;
                        this.get_productos(nec);
                        break;
                    //cae
                    case "5":
                        this.div_cae = true;
                        this.div_els = false;
                        this.div_cctv = false;
                        this.div_eps = false;
                        this.toolbar = false;
                        this.div_alarmas = false;
                        this.div_incendios = false;
                        this.get_productos(nec);
                        break;
                    //Equipo liviano
                    case "9":
                        this.div_els = true;
                        this.div_cctv = false;
                        this.div_eps = false;
                        this.toolbar = false;
                        this.div_alarmas = false;
                        this.div_incendios = false;
                        this.div_cae = false;
                        this.get_productos(nec);
                        break;
                    //Alarmas
                    case "4":
                        this.div_alarmas = true;
                        this.div_els = false;
                        this.div_cctv = false;
                        this.div_eps = false;
                        this.toolbar = false;
                        this.div_incendios = false;
                        this.div_cae = false;
                        this.get_productos(nec);
                        break;
                    //Incendios
                    case "6":
                        this.div_incendios = true;
                        this.div_els = false;
                        this.div_cctv = false;
                        this.div_eps = false;
                        this.toolbar = false;
                        this.div_alarmas = false;
                        this.div_cae = false;
                        this.get_productos(nec);
                        break;
                    default:
                        this.div_els = false;
                        this.div_cctv = false;
                        this.div_eps = false;
                        this.toolbar = false;
                        this.div_alarmas = false;
                        this.div_incendios = false;
                        this.div_cae = false;
                        this.list_items = [];
                        break;

                }
            }
        } else {
            this.div_els = false;
            this.div_cctv = false;
            this.div_eps = false;
            this.toolbar = false;
            this.div_alarmas = false;
            this.div_incendios = false;
            this.list_items = [];
        }
    }
    private take_pictures(carProd, picturezona) {
        const options: CameraOptions = {
            // quality: 70,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000,
            quality: 80
        }
        this.camera.getPicture(options).then((imageData) => {
            switch (carProd) {
                case 'cctv':
                    this.picturesCCTV[picturezona].push(imageData);
                    this.imageURL = imageData;
                    console.log(this.picturesCCTV);
                    break;
                case 'alarma':
                    this.picturesAlarmas[picturezona].push(imageData);
                    this.imageURL = imageData;

                    break;
                case 'incendio':
                    this.picturesIncendio[picturezona].push(imageData);
                    this.imageURL = imageData;

                    break;
                default:
                    break;
            }
        }, (err) => {
            console.error(err);
        });
    }
    private cambiaPestania() {
        this.pestanias = 'cotizacion'
    }
    private get_productos(nec) {

        let loading = this.loadingCtrl.create({
            content: "Por Favor Espere..."
        });
        loading.present();
        // let domain = (nec != "") ? [['categ_id', '=', +nec], ['qty_available', '>', 0]] : [['qty_available', '>', 0]]
        this.list_items = [];
        let domain = (nec != "") ? [['categ_id', '=', +nec]] : [];
        let table = "product.template";
        this.odooRpc.searchRead(table, domain, [], 0, 0, "").then((items: any) => {
          let json = JSON.parse(items._body);
          if (!json.error && json["result"].records != []) {
              for (let i of json["result"].records) {
                  this.list_items.push(i);
              }
              loading.dismiss();
              this.allData = this.list_items;
              this.filterData = this.allData;

          }
      }).catch((err: any) => {
        console.log("error de catalogo"+err);
      })


    }
    public sanitize(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    public agregaCarrito(item) {
        this.list_items_carrito.push(item)
        this.cambiaUtilidad();
        this.presentToast();
       // console.log(this.list_items_carrito);
    }
    public cambiaUtilidad() {
        this.subTotal = 0;
        this.total = 0;
        for (let itc of this.list_items_carrito) {
            if (this.porcentajeUtilidad[itc.id] !== undefined) {
                this.subTotal += (itc.list_price + (itc.list_price * this.porcentajeUtilidad[itc.id] / 100));
            } else {
                this.subTotal += itc.list_price;
            }
        }
        this.total = (this.subTotal + (this.subTotal * 19 / 100));
    }
    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Elemento Agregado',
        duration: 2000,
        position: 'top'
      });
      console.log(this.list_items_carrito);
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }
    public adjuntar_archivo($event, tipo): void {
        this.readThis($event.target, tipo);
    }
    readThis(inputValue: any, tipo: String): void {
        var file = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.base64 = myReader.result;
            switch (tipo) {
                case 'cctv':
                    this.adjuntosCCTV.push(this.base64);
                    break;
                case 'cae':
                    this.adjuntosCAE.push(this.base64);
                    break;
                case 'alarma':
                    this.adjuntosAlarmas.push(this.base64);
                    break;
                case 'incendio':
                    this.adjuntosIncendio.push(this.base64);
                    break;

                default:
                    console.log('PARAMETRO PARA ADJUNTAR ARCHIVO NO ESTA DEFINIDO');
                    break;
            }
/*             this.base64 = this.base64.replace("data:image/jpeg;base64,", "");
            this.base64 = this.base64.replace("data:image/jpg;base64,", "");
            this.base64 = this.base64.replace("data:image/png;base64,", "");
            this.base64 = this.base64.replace("data:application/pdf;base64,", ""); */

            //console.log(this.base64);
        }
        myReader.readAsDataURL(file);
    }
    public habilitarSensor(camaraZona) {
        console.log(camaraZona)
    }

    public saveProspecto(){
      let  ArrayProspectus  = {};
      let  ArrayAreas       = {};

      let  modelProspectus = "crm.prospectus";
      let  modelAreas      = "crm.areas";
      let  modeAttactment  = "muk_dms.file";

      //quitr las comillas


        if(this.div_alarmas == true){

          //se parsea  el array de sismonitoring de string a integer
          var newmonitoring = [];
          for (let k = 0; k <= this.sisMonitoreo.length; k++) {
            if( !isNaN(this.sisMonitoreo[k]) ){
              newmonitoring.push(parseInt(this.sisMonitoreo[k]));
            }
          }


          ArrayProspectus = {
            lead_id               : this.oportunity_id,
            customer_need_id      : this.necCliente,
            area_protect          : this.habitacionesAlarmas,
            place_implementation  : this.lugarImplementacionAlarmas,
            channel_ucp           : this.canalUnidadCentralProcesoAlarmas,
            is_monitor_system     : this.sistemaMonitoreoAlarmas,
            attc_file             : this.base64,
            monitor_system_ids    : [[ 6,0 , [newmonitoring]] ]
          }

          //guarda prospecto
           this.odooRpc.createRecord(modelProspectus, ArrayProspectus).then((res: any) => {
            console.log(res);
            let json = JSON.parse(res._body);
            if (!json.error) {
                this.prospecto_id = json.result;

                //alert("Sucssess !! id=>" + json.result );
/*
                console.log(this.picturesAlarmas.length);
                console.log(this.picturesAlarmas[1]); */
                //guarda AREAS
                console.log(ArrayProspectus);
                for (let i = 0; i <= this.listaHabitacionesAlarmas.length; i++) {
                  if(this.nombreHabitacionAlarmas[i] != undefined){

                    ArrayAreas = {
                      prospectus_id :  this.prospecto_id,
                      name          :  this.nombreHabitacionAlarmas[i],
                      sensors_total :  this.alarmasHabitacion[i],
                      wall_type     :  this.tipoParedHabitacionAlarma[i],
                      door_type     :  this.tipoPuertaHabitacionAlarma[i],
                      proximity     :  this.aproMtsAlarmas[i],
                      max_height    :  this.altMtsAlarmas[i],
                      description   :  this.obserZonaAlarmas[i],
                      photo         :  this.imageURL
                    };

                    this.odooRpc.createRecord(modelAreas, ArrayAreas).then((res: any) => {
                      console.log(res);
                      let json = JSON.parse(res._body);
                      if (!json.error) {
                        this.id_area = json.result;
                         // alert("Areas Sucssess !! id=>" +  this.id_area );

                      }
                      }).catch((err: any) => {
                        alert("error guardando info alarmas" + err);
                      })
                      if(this.listaHabitacionesAlarmas.length = i){
                        this.Alert('All Service', 'Se guardó correctamente');
                      }
/*                      console.log("div_alarmas");
                        console.log(ArrayAreas); */

                  }
                }


            }
          }).catch((err: any) => {
            alert(err);
          })


        }

        if( this.div_cctv == true){

          var newmonitoringcctv = [];
          for (let k = 0; k <= this.sistemaMonitoreoCCTV.length; k++) {
            if( !isNaN(this.sistemaMonitoreoCCTV[k]) ){
              newmonitoringcctv.push(parseInt(this.sistemaMonitoreoCCTV[k]));
            }
          }


          ArrayProspectus = {
            lead_id               : this.oportunity_id,
            customer_need_id      : this.necCliente,
            area_protect          : this.habitacionesCCTV,
            place_implementation  : this.lugarImplementacion,
            monitor_system_ids    : [[ 6,0 , [newmonitoringcctv]] ],
            channel_ucp           : this.canalUnidadCentralProceso,
            attc_file             : this.base64,
            is_monitor_system     : this.is_sistemaMonitoreoCCTV
          }
          console.log("ArrayProspectus");
          console.log(ArrayProspectus);
          this.odooRpc.createRecord(modelProspectus, ArrayProspectus).then((res: any) => {
            console.log(res);
            let json = JSON.parse(res._body);

            if (!json.error) {
                this.prospecto_id = json.result;
               // alert("CCTV PROPECTUS Sucssess !! id=>" + json );

                //guarda AREAS
                for (let i = 0; i <= this.listaHabitacionesCCTV.length; i++) {

                  if(this.nombreHabitacionCCTV[i] != undefined){

                    ArrayAreas = {
                      prospectus_id : this.prospecto_id,
                      name          : this.nombreHabitacionCCTV[i],
                      wall_type     : this.tipoParedHabitacionCCTV[i],
                      sensors_total : this.camarasCCTV[i],
                      proximity     : this.aproMtsCCTV[i],
                      max_height    : this.altMtsCCTV[i],
                      description   : this.obserZonaCCTV[i],
                      photo         : this.imageURL

                    }

                    this.odooRpc.createRecord(modelAreas, ArrayAreas).then((res: any) => {
                      console.log(res);
                      let json = JSON.parse(res._body);
                      if (!json.error) {
                        //  alert("CCTV Areas Sucssess !! id=>" + json );


                      }
                      }).catch((err: any) => {
                        alert("error guardando areas de cctv" + err);
                      })

/*                     console.log("CCTV ArrayAreas");
                    console.log(ArrayAreas); */
                  }
                  if(this.listaHabitacionesCCTV.length = i){
                    this.Alert('All Service', 'Se guardó correctamente');
                  }
                }


            }
          }).catch((err: any) => {
            alert("error guardando info cctv" + err);
          })



        }

        if( this.div_cae == true){

          //console.log(this.entradaHabitacionCAE[1]);
         // console.log(this.salidaHabitacionCAE[1]);
          ArrayProspectus = {
            lead_id               : this.oportunity_id,
            customer_need_id      : this.necCliente,
            area_protect          : this.habitacionesCAE,
            qty_access            : this.cantAccesosHabitacion,
            attc_file             : this.base64
          }
          console.log("ArrayProspectus");
          console.log(ArrayProspectus);


          this.odooRpc.createRecord(modelProspectus, ArrayProspectus).then((res: any) => {
            let json = JSON.parse(res._body);
            if (!json.error) {
              this.prospecto_id = json.result;
              //alert("CAE PROPECTUS Sucssess !! id=>" + json );


                //guarda AREAS
                for (let i = 0; i <= this.listaHabitacionesCAE.length; i++) {

                  if(this.nombreHabitacionCAE[i] != undefined){
                    var entradaCAE =  [];
                    var salidaCAE  =  [];
                    for (let q = 0; q < this.entradaHabitacionCAE[1].length; q++) {
                      if( !isNaN(this.entradaHabitacionCAE[1][q])){
                        entradaCAE.push(parseInt(this.entradaHabitacionCAE[1][q]));
                      }
                    }

                    for (let q = 0; q < this.salidaHabitacionCAE[1].length; q++) {
                      if( !isNaN(this.salidaHabitacionCAE[1][q])){
                        salidaCAE.push(parseInt(this.salidaHabitacionCAE[1][q]));
                      }
                    }
                    console.log(entradaCAE);
                    console.log(salidaCAE);


                    ArrayAreas = {
                      prospectus_id         : this.prospecto_id,
                      name                  : this.nombreHabitacionCAE[i],
                      door_type             : this.tipoPuertaHabitacionCAE[i],
                      entry_room_ids        : [[ 6,0 , [entradaCAE] ]],
                      exit_room_ids         : [[ 6,0 , [salidaCAE]  ]],
                      description           : this.obserZonaCAE[i],
                      photo                 : this.imageURL
                    }

                    this.odooRpc.createRecord(modelAreas, ArrayAreas).then((res: any) => {
                      console.log(res);
                      let json = JSON.parse(res._body);
                      if (!json.error) {
                         // alert("CAE Areas Sucssess !! id=>" + json );
                      }
                      }).catch((err: any) => {
                        alert(err);
                      })
                  }

                  if(this.listaHabitacionesCAE.length = i){
                    this.Alert('All Service', 'Se guardó correctamente');
                  }

                }
/*                 console.log("CAE ArrayAreas");
                console.log(ArrayAreas); */


            }

            this.Alert('All Service', 'Se guardó correctamente');

          }).catch((err: any) => {
            alert(err);
          })
        }

        if( this.div_els == true){
        //  console.log(this.tipoEquipo);
          var newEquipo = [];
          for (let k = 0; k < this.tipoEquipo.length; k++) {
            if( !isNaN(this.tipoEquipo[k])){
              newEquipo.push(parseInt(this.tipoEquipo[k]));
            }
          }
          console.log(newEquipo);


          var newElemNeed = [];
          for (let j = 0; j < this.elementosNecesariosInstalacion.length; j++) {
            if( !isNaN(this.elementosNecesariosInstalacion[j])){
              newElemNeed.push(parseInt(this.elementosNecesariosInstalacion[j]));
            }
          }
          console.log(newElemNeed);

          ArrayProspectus = {
            customer_need_id      : this.necCliente,
            lead_id               : this.oportunity_id,
            amount_money          : this.cantDineroAl,
            place_implementation  : this.lugarInstEquipo,
            equipment_type_ids    : [[ 6,0 , [newEquipo] ]],
            other_et              : this.teOtro,
            necessary_el_ids      : [[ 6,0 , [newElemNeed] ]],
            other_ne              : this.eniOtro,
            color                 : this.colorBlindaje,
            other_color           : this.cbOtro,
            front                 : this.frente,
            fund                  : this.fondo,
            high                  : this.alto,
            attc_file             : this.base64
          }

            if (this.cantDineroAl != ''  ) {

              console.log(ArrayProspectus);

              this.odooRpc.createRecord(modelProspectus, ArrayProspectus).then((res: any) => {
                let json = JSON.parse(res._body);
                if (!json.error) {
                  this.prospecto_id = json.result;
                  //alert("Equipo liviano Prospectus Sucssess !! id=>" + json );

                    this.Alert('All Service', 'Se guardó correctamente');

                  }
              }).catch((err: any) => {
                alert(err);
              })

            }
        }

        if (this.div_eps == true) {

          var newTipoAlmacenar = [];
          for (let j = 0; j < this.tipoAlmacenar.length; j++) {
            if( !isNaN(this.tipoAlmacenar[j])){
              newTipoAlmacenar.push(parseInt(this.tipoAlmacenar[j]));
            }
          }

          var newElemNeedP = [];
          for (let k = 0; k < this.elementosNecesariosInstalacion.length; k++) {
            if( !isNaN(this.elementosNecesariosInstalacion[k])){
              newElemNeedP.push(parseInt(this.elementosNecesariosInstalacion[k]));
            }
          }

          ArrayProspectus = {
            customer_need_id      : this.necCliente,
            lead_id               : this.oportunity_id,
            value_type_ids        : [[ 6,0 , [newTipoAlmacenar] ]],
            place_implementation  : this.lugarImplementacionEPS,
            necessary_el_ids      : [[ 6,0 , [newElemNeedP] ]],
            other_ne              : this.eniOtro,
            blind_level           : this.nivelBlindaje,
            color                 : this.colorBlindaje,
            other_color           : this.cbOtro,
            other_vt              : this.taOtro,
            front                 : this.frente,
            fund                  : this.fondo,
            high                  : this.alto,
            attc_file             : this.base64
          }
          console.log(ArrayProspectus);
          this.odooRpc.createRecord(modelProspectus, ArrayProspectus).then((res: any) => {
            let json = JSON.parse(res._body);
            console.log(json);
            if (!json.error) {
            //  alert("Equipo Pesado Prospectus Sucssess !! id=>" + json );
            this.Alert('All Service', 'Se guardó correctamente');

            }
          }).catch((err: any) => {
            alert(err);
          })

        }

        if (this.div_incendios == true) {

          var newmonitoringINC = [];
          for (let k = 0; k <= this.sistemaMonitoreoINC.length; k++) {
            if( !isNaN(this.sistemaMonitoreoINC[k]) ){
              newmonitoringINC.push(parseInt(this.sistemaMonitoreoINC[k]));
            }
          }


          ArrayProspectus = {
            customer_need_id      : this.necCliente,
            lead_id               : this.oportunity_id,
            area_protect          : this.habitacionesIncendios,
            place_implementation  : this.lugarImplementacionINC,
            monitor_system_ids    : [[ 6,0 , [newmonitoringINC]] ],
            channel_ucp           : this.canalUnidadCentralProcesoINC,
            is_monitor_system     : this.ismonitorigINC,
            attc_file             : this.base64

          }

          console.log("ArrayProspectus");
          console.log(ArrayProspectus);

          this.odooRpc.createRecord(modelProspectus, ArrayProspectus).then((res: any) => {
            let json = JSON.parse(res._body);
            if (!json.error) {
              this.prospecto_id =  json.result;

            alert("succesess !! ");

               //guarda AREAS
               for (let i = 0; i <= this.listaHabitacionesIncendios.length; i++) {
                if(this.nombreHabitacionIncendios[i] != undefined){

                  ArrayAreas = {
                    prospectus_id :  this.prospecto_id,
                    name          :  this.nombreHabitacionIncendios[i],
                    sensors_total :  this.sensoresIncendio[i],
                    wall_type     :  this.tipoParedHabitacionIncendio[i],
                    proximity     :  this.aproMtsIncendio[i],
                    max_height    :  this.altMtsIncendio[i],
                    description   :  this.obserZonaIncendio[i],
                    photo         :  this.imageURL
                  };
                  console.log("ArrayAreas Incendios");
                  console.log(ArrayAreas);

                  this.odooRpc.createRecord(modelAreas, ArrayAreas).then((res: any) => {
                    console.log(res);
                    let json = JSON.parse(res._body);
                    if (!json.error) {
                     //   alert("Areas Incendios Sucssess !! id=>" + json );
                    }
                    }).catch((err: any) => {
                      alert("error insertar area incendio prospecto " +err);
                    })

                    if(this.listaHabitacionesIncendios.length = i ){
                      this.Alert('All Service', 'Se guardó correctamente');
                    }
                  //console.log("Incendios");
                  //console.log(ArrayAreas);

                }
              }

            }
          }).catch((err: any) => {
            alert("error insertar prospecto incendio prospecto " + err);
          })

        }
/*       this.odooRpc.createRecord(model, params).then((res: any) => {
        let json = JSON.parse(res._body);
        if (!json.error) {
          this.utils.presentToast("Oportunidad Creada Correctamente", 3000, false, 'top');
          this.navCtrl.pop();
        }
      }).catch((err: any) => {
        alert(err);
      })
 */

    }

    public saveCotizacion(){
      let modelCotizacion = "sale.order";

      let modelProducto   = "sale.order.line"
      var utilidad = [];

      let ArrayCotizacion = {
        opportunity_id        : this.oportunity_id,
        city_id               : 2,
        pricelist_id          : 1,   /* Lista de precios por defecto */
        partner_id            : 10, /* id cliente */
        partner_invoice_id    : 10, /* id cliente*/
        partner_shipping_id   : 10, /* id cliente  */
        business_sequence_id  : 2,  /* allservice */
        currency_id           : 9  /*  COP  */
      }


      this.odooRpc.createRecord(modelCotizacion, ArrayCotizacion).then((res: any) => {
        let json = JSON.parse(res._body);
        if (!json.error) {

          this.order_line = json.result;
          //alert("success!! cotizacion =>" + this.order_line);

          for (let k = 0; k <= this.porcentajeUtilidad.length; k++) {
            if( !isNaN(this.porcentajeUtilidad[k]) ){
              utilidad.push(parseInt(this.porcentajeUtilidad[k]));
            }
          }

          for (let i = 0; i < this.list_items_carrito.length; i++) {

            let ArrayProductos = {
              order_id          : this.order_line,
              product_id        : this.list_items_carrito[i].id,
              profit_percentage : utilidad[i]
            }
          console.log(ArrayProductos);
          this.odooRpc.createRecord(modelProducto, ArrayProductos).then((res: any) => {
            let json = JSON.parse(res._body);
            if (!json.error) {
              let id = json.result;
             // alert("success Productos" + id);


            }
          }).catch((err: any) => {
            alert("error guardando productos" + err);
          })
          if(this.list_items_carrito.length = i ){
            this.Alert('All Service', 'Se guardó correctamente');
          }

          }



        }
      }).catch((err: any) => {
        alert(err);
      })




    }


}
