import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user/user-rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel;
  repeatPass: String = ''
  timer: any = 0;

  constructor(private userRest: UserRestService, private router: Router) {
    this.user = new UserModel('', '', '', '', '', '', '', '')
  }

  ngOnInit(): void {
  }

  async checkPassword() {
    clearTimeout(this.timer);
    this.timer = await setTimeout(() => {
      if (this.repeatPass != this.user.password) {
        Swal.fire({
          icon: 'warning',
          title: 'Las contraseñas no coinciden',
        });
        clearTimeout(this.timer);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Las contraseñas coinciden',
        });
        clearTimeout(this.timer);
      }
    }, 3000);
  }

  register() {
    this.userRest.register(this.user).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Ya puedes iniciar sesión',
        });
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }
}
