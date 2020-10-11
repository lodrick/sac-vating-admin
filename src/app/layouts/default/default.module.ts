import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { DashboardService } from 'src/app/modules/dashboard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from 'src/app/modules/user-list/user-list.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    HomeComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DashboardService],
})
export class DefaultModule {}
