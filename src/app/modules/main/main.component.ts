import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from "../../servies/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  authService = inject(AuthService);
}
