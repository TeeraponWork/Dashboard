import { Component } from '@angular/core';
import { ContentHeader } from '../../../widgets/content-header/content-header';

@Component({
  selector: 'app-users',
  imports: [ContentHeader],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  title = 'USERS'
}
