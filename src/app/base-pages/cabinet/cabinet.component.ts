import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {User} from '../../service/user/user';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css'],
  providers: [UserService]
})
export class CabinetComponent implements OnInit {

  isEdit: boolean = false;

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  };

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUserInfo();
  }

  changeMode(): void {
    this.isEdit = !this.isEdit;
  }

  getUserInfo() {
    this.userService.getUserInformation().subscribe(
      (data: User) => this.user = data
    );
  }

  updateUserInfo() {
    this.userService.updateUserInformation(this.user).subscribe(
      data => this.changeMode()
    )
  }

  setRole(role: string) {
    this.user.role = role;
  }
}
