import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-state',
  templateUrl: './main-state.component.html',
  styleUrls: ['./main-state.component.scss']
})
export class MainStateComponent implements OnInit {
  continentControl = new FormControl();

  constructor() { }

  ngOnInit() {
  }

}
