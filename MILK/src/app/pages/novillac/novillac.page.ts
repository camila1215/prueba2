import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from './../../servicios/crud.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-novillac',
  templateUrl: './novillac.page.html',
  styleUrls: ['./novillac.page.scss'],
})
export class NovillacPage implements OnInit {
  novilla: any;
  nombre_vaca: string;
  numero_vaca: number;
  raza: String;
  peso: number;
  FN: Date;
  idpadre: string;
  idmadre: string;

  constructor(private crudService: CrudService,
    public alertCtrl: AlertController,
    private router: Router,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    this.storage.get('uid').then((uid) => {
      this.crudService.read_novilla(uid).subscribe(data => {

        this.novilla = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            nombre_vaca: e.payload.doc.data()['nombre_vaca'],
            numero_vaca: e.payload.doc.data()['numero_vaca'],
            raza: e.payload.doc.data()['raza'],
            peso: e.payload.doc.data()['peso'],
            FN: e.payload.doc.data()['FN'],
            idpadre: e.payload.doc.data()['idpadre'],
            idmadre: e.payload.doc.data()['idmadre'],
          };
        })
        console.log(this.novilla);

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
            this.crudService.delete_novilla(rowID).then(() => {
              this.router.navigateByUrl('novillac');
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
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['nombre_vaca'] = recordRow.Editnombre_vaca;
    record['numero_vaca'] = recordRow.Editnumero_vaca;
    record['peso'] = recordRow.Editpeso;
    record['raza'] = recordRow.Editraza;
    record['idpadre'] = recordRow.Editidpadre;
    record['idmadre'] = recordRow.Editidmadre;
    this.crudService.update_novilla(recordRow.id, record);
    recordRow.isEdit = false;
  }
 



}


