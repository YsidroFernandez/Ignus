import { Component, OnInit } from '@angular/core';
import { GlobalsProvider } from '../../../shared';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-noestructurado',
  templateUrl: './noestructurado.component.html',
  styleUrls: ['./noestructurado.component.scss'],
  animations: [routerTransition()],
  providers: [GlobalsProvider]
  
})
export class NoestructuradoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
