import { Component, signal } from '@angular/core';
import { ContentHeader } from '../../../widgets/content-header/content-header';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { USERS } from '../../../mock-data/users.mock';
import { User } from '../../../interfaces/user.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [ContentHeader, NgxDatatableModule, DatePipe],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  title = 'USERS'
  users = signal<User[]>([]);
  columnMode = ColumnMode;

  ngOnInit(){
    console.log('ngoninit users');
    this.users.set(USERS);
  }

  onPageChange(event: any){
    console.log(event);
  }

  onSortChange(event: any){
    console.log(event);
  }
}
