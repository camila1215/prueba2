import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {  Observable  } from 'rxjs';
import * as jsPDF from 'jspdf';

interface pleche{
  leche: any;
  nombre_vaca: string;
  numero_vaca: string;
  FO: Date;
  jornada1:number;
  jornada2:number;
  encargado1:string;
  encargado2:string;
  cantidad:number;
  total_leche: number;
}

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})




export class PdfPage implements OnInit {
 todoCollection: AngularFirestoreCollection<pleche>
 ganaderia: Observable<pleche[]>

  constructor(private asf: AngularFirestore) { }
 


  ionViewDidEnter(){
    this.todoCollection = this.asf.collection('pleche');
    this.ganaderia = this.todoCollection.valueChanges();

  }
  ngOnInit() {
  }
  descargar(){
    var id= document.getElementById("results");
    var pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'landscape'
    });
    pdf.text("Informe de producción lechera", 300, 50);
    pdf.fromHTML(id, 70, 100);
    pdf.save("Informe");
  }
}
