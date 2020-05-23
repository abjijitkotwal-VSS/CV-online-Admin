import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';
@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent implements OnInit {

  constructor(private layout: LayoutService) { }

  ngOnInit() {
  }

}
