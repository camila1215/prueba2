import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from './../../servicios/crud.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'
import { storage } from 'firebase';

@Component({
  selector: 'app-prosimac',
  templateUrl: './prosimac.page.html',
  styleUrls: ['./prosimac.page.scss'],
})
export class ProsimacPage implements OnInit {
  prosima: any;
  nombre_vaca: string;
  numero_vaca: number;
  peso: number;
  raza: String;
  FN: Date;
  idpadre: string;
  idmadre: string;
  idtoro: string;
  cantidad_hijos: number;
  fecha_prenez: Date;

  constructor(private crudService: CrudService,
    public alertCtrl: AlertController,
    private router: Router,
    private storage: Storage) { }

  ngOnInit() {
    this.storage.get('uid').then((uid) => {
      this.crudService.read_prosima(uid).subscribe(data => {
        this.prosima = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            nombre_vaca: e.payload.doc.data()['nombre_vaca'],
            numero_vaca: e.payload.doc.data()['numero_vaca'],
            etapa: e.payload.doc.data()['etapa'],
            raza: e.payload.doc.data()['raza'],
            peso: e.payload.doc.data()['peso'],
            FN: e.payload.doc.data()['FN'],
            idpadre: e.payload.doc.data()['idpadre'],
            idmadre: e.payload.doc.data()['idmadre'],
            idtoro: e.payload.doc.data()['idtoro'],
            fecha_prenez: e.payload.doc.data()['fecha_prenez'],
            cantidad_hijos: e.payload.doc.data()['cantidad_hijos'],
          };
        })
        console.log(this.prosima);
      });
    })
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
            this.crudService.delete_prosima(rowID).then(() => {
              this.router.navigateByUrl('prosimac');
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
    record.Editidmadre = record.idmadre;
    record.Editidpadre = record.idpadre;
    record.Editidtoro = record.idtoro;
    record.Editfecha_prenez = record.fecha_prenez;
    record.Editcantidad_hijos = record.cantidad_hijos;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['nombre_vaca'] = recordRow.Editnombre_vaca;
    record['numero_vaca'] = recordRow.Editnumero_vaca;
    record['peso'] = recordRow.Editpeso;
    record['raza'] = recordRow.Editraza;
    record['idpadre'] = recordRow.Editidpadre;
    record['idmadre'] = recordRow.Editidmadre;
    record['idtoro'] = recordRow.Editidtoro;
    record['fecha_prenez'] = recordRow.Editfecha_prenez;
    record['cantidad_hijos'] = recordRow.Editcantidad_hijos;
    this.crudService.update_prosima(recordRow.id, record);
    recordRow.isEdit = false;
  }




}

