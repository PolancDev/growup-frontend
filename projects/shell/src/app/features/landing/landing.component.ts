import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../../shared/toast-component/toast-component';

@Component({
    selector: 'growup-landing',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        ToastComponent
    ],
    templateUrl: './landing.component.html',
    styles: []
})
export class LandingComponent { }
