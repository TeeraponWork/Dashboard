import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  username = '';
  password = '';

  constructor(private router: Router) {}

  login(){
    if(this.username === 'Testcrc' && this.password === 'P@ssw0rd'){
      localStorage.setItem('token', 'true');
      this.router.navigate(['/app/dashboard']);
    }
    else{
      alert('ไม่ถูกต้อง');
    }
  }
}
