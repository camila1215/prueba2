import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { CrudService } from "../../servicios/crud.service";
import { MenuController } from '@ionic/angular';
import { Componente } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  info: any;
  email: string;
  password: string;
  name: string;
  nombre_vaca: string;
  nombre_novilla: string;
  nombre_gestante: string;

  componentes: Componente[]  = []

  constructor( public authservice : AuthService, 
                private menuCtrl: MenuController,
                private crudService: CrudService ) { }
  Onlogout(){
    this.authservice.logout();
  }
  ngOnInit() {
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

}
