import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [routerTransition()],
})
export class TransactionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
