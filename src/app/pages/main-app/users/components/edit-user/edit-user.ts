import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../../interfaces/user.interface';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from 'ngx-select-ex';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule,BsDatepickerModule, NgxSelectModule,MatButtonModule,MatIconModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss'
})
export class EditUser implements OnInit {

  formData = signal<FormGroup | null>(null);
  updateItem = input<User>();

  private formBuilder = inject(FormBuilder);

  dataPickerConfig: Partial<BsDatepickerConfig> = Object.assign(
    {},
    {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY'
  });

  constructor() {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    const item = this.updateItem();

    const form = this.formBuilder.group({
      name: [item?.name ?? null, Validators.required],
      email: [item?.email ?? null, Validators.required, Validators.email],
      phone: [item?.phone ?? null, Validators.required],
      gender: [item?.gender ?? null, Validators.required],
      dob: [item?.dob ?? null, Validators.required],
      address: item?.address ?? null
  });
  this.formData.set(form);
}

onSubmit() {

}
}
