import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from './../../servicios/crud.service';
import {  Observable  } from 'rxjs';
import {  AlertController  } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 
import { Storage } from '@ionic/storage'


@Component({
  selector: 'app-vacac',
  templateUrl: './vacac.page.html',
  styleUrls: ['./vacac.page.scss'],
})
export class VacacPage implements OnInit {
  vaca: any;
  nombre_vaca: string;
  numero_vaca: number;
  peso: number;
  estado: string;
  raza: String;
  FN: Date;
  cantidad_hijos: number;
 

  constructor( private crudService: CrudService, 
    public alertCtrl: AlertController,  
    private router: Router,
    private storage: Storage ) { }

  ngOnInit() {
    this.storage.get('uid').then((uid) => {
      this.crudService.read_vaca(uid).subscribe(data => {
        this.vaca = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            nombre_vaca: e.payload.doc.data()['nombre_vaca'],
            numero_vaca: e.payload.doc.data()['numero_vaca'],
            raza: e.payload.doc.data()['raza'],
            peso: e.payload.doc.data()['peso'],
            FN: e.payload.doc.data()['FN'],
            estado: e.payload.doc.data()['estado'],
            cantidad_hijos: e.payload.doc.data()['cantidad_hijos'],
    };
      })
      console.log(this.vaca);
    });
  });
  }

  async RemoveRecord(rowID) {
    const alert = await this.alertCtrl.create({
      message: 'Esta seguro de eliminar este registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: blah => {
            console.log('Confirmar cancelación: blah');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.crudService.delete_vaca(rowID).then(() => {
              this.router.navigateByUrl('vacac');
            });
          },
        },
      ],
    });
  
    await alert.present();
  }
    
  EditRecord(record) {
    record.isEdit = true;
    record.Editnombre_vaca = record.nombre_vaca;
    record.Editnumero_vaca = record.numero_vaca;
    record.Editpeso = record.peso;
    record.Editraza = record.raza;
    record.Editestado = record.etapa;
    record.Editcantidad_hijos = record.cantidad_hijos;
  }
 
  UpdateRecord( recordRow ) {
    let record = {};
    record['nombre_vaca'] = recordRow.Editnombre_vaca;
    record['numero_vaca'] = recordRow.Editnumero_vaca;
    record['peso'] = recordRow.Editpeso;
    record['raza'] = recordRow.Editraza;
    record['estado'] = recordRow.Editestado;
    record['cantidad_hijos'] = recordRow.Editcantidad_hijos;
    this.crudService.update_vaca(recordRow.id, record);
    recordRow.isEdit = false;
  }
}

