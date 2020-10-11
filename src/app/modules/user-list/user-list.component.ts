import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/_service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  user: User[];
  loading = false;
  submited = false;
  returnUrl: string;
  dataSource: any;
  error: any;
  _data: any;

  displayedColumns: string[] = [
    'uid',
    'ufName',
    'ulname',
    'gender',
    'age',
    'username',
    'email',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/users';
  }

  getUsers() {
    this.authenticationService.getUsers().subscribe((response) => {
      console.log(response);
      this.dataSource = new MatTableDataSource<User>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  getRecord(row: any) {}
}
