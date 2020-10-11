import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Candidate } from 'src/app/models/candidate';
//import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
//import { BehaviorSubject, Observable } from 'rxjs';
//import { compileComponentFromMetadata } from '@angular/compiler';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/*const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];*/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  candidates: Candidate[];
  loading = false;
  submited = false;
  returnUrl: string;
  dataSource: any;
  error: any;
  _data: any;

  bigChart = [];
  cards = [];
  pieChart = [];
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['cId', 'name', 'partyName', 'count'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  ELEMENT_DATA: Candidate[];

  //dataSource = new MatTableDataSource<Candidate>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    /*if(this.authenticationService.currentUserValue){
      this.router.navigate(['/home'])
    }*/
  }

  ngOnInit(): void {
    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();

    this.getCandidates();
    //console.log('EMENT_DATA: ' + this.candidates);
    //this.ELEMENT_DATA = this.candidates;
    //this.ELEMENT_DATA = this.getCandidates();

    //console.log('this.ELEMENT_DATA: ' + JSON.stringify(this.res));

    //this.dataSource = new MatTableDataSource<Observable<Candidate>>(this.ELEMENT_DATA);
    //this.dataSource = new MatTableDataSource<Candidate>(this.res);
    //console.log(this.dataSource);
    //this.dataSource.paginator = this.paginator;

    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  getCandidates() {
    //let res;
    this.authenticationService.getCandidates().subscribe((response) => {
      //console.log(JSON.stringify('Res: ' + JSON.stringify(response)));

      //this.res = response;
      console.log('diy');
      console.log(response);
      this.dataSource = new MatTableDataSource<Candidate>(response);
      console.log(this.dataSource);

      this.dataSource.paginator = this.paginator;
      //res = response;
      //return response;
    });
    //return this.res;
  }

  deleteCadidate(candidate) {
    this.authenticationService.createCandidate(candidate).subscribe(
      (response) => {
        this.candidates.slice(this.candidates.indexOf(candidate), 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createCandidate(candidate: Candidate) {
    this.authenticationService.createCandidate(candidate).subscribe(
      (response) => {
        this.candidates.slice(this.candidates.indexOf(candidate), 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
