import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpRoutingModule } from './emp-routing.module';
import { EmpComponent } from './emp.component';


@NgModule({
  declarations: [EmpComponent],
  imports: [
    CommonModule,
    EmpRoutingModule
  ]
})
export class EmpModule { }
