import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {User} from './user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User =
    {
      name: 'Name',
      lastName: 'LastName',
      position: 'Developer',
      salary: 1500,
      address: 'Scrl str.,19',
      phone: '+375(25)739-01-08',
      status: 'New',
      email: 'name@gmail.com',
      skills: ['Skill1', 'Skill2', 'Skill3'],
      experiences: [
        {
          period: 'Apr 2017 - Now',
          position: 'Developer',
          location: 'London, UK',
          company: 'BSUIR',
          description: 'allaal lalal alalaaalala lalalalalal alalalal lslalalalalalalal'
        },
        {
          period: 'Apr 2017 - Now',
          position: 'Developer',
          location: 'London, UK',
          company: 'BSUIR',
          description: 'allaal lalal alalaaalala lalalalalal alalalal'
        },
        {
          period: 'Apr 2017 - Now',
          position: 'Developer',
          location: 'London, UK',
          company: 'BSUIR',
          description: 'allaal lalal alalaaalala lalalalalal alalalal'
        }
      ]
    };

  isEdit: boolean = false;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  changeMode() {
    this.isEdit = !this.isEdit;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
