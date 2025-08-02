import { Component, Inject, signal, TemplateRef, viewChild,inject } from '@angular/core';
import { ContentHeader } from '../../../widgets/content-header/content-header';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { USERS } from '../../../mock-data/users.mock';
import { User } from '../../../interfaces/user.interface';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { EditUser } from "./components/edit-user/edit-user";
@Component({
  selector: 'app-users',
  imports: [ContentHeader, NgxDatatableModule, DatePipe, MatButtonModule, MatIconModule, ModalModule, EditUser,EditUser],
  providers: [BsModalService],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  //@ViewChild(DatatableComponent)  // Corrected typo from VuewChild to ViewChild
  table = viewChild<DatatableComponent>(DatatableComponent);
  title = 'USERS'
  temp = signal<User[]>([]);
  users = signal<User[]>([]);
  columnMode = ColumnMode;
  loadingIndicator = signal<boolean>(false);
  modalRef = signal<BsModalRef | null>(null);
  updateItem = signal<User | null>(null);

  modalService = inject(BsModalService);

  page = signal<number>(0); // หน้าเริ่มต้น (เริ่มที่ 0)
  limit = signal<number>(10); // จำนวนรายการต่อหน้า

  setLoadingIndicator(value: boolean){
    this.loadingIndicator.set(value);
  }

  ngOnInit(){
    console.log('ngoninit users');
    this.getUsers();
  }

  async getUsers() {
  try {
    this.setLoadingIndicator(true);
    const users = USERS;
    setTimeout(() => {
      this.temp.set(users);
      this.updatePagedUsers(); // 👈 ตัดข้อมูลหน้าปัจจุบัน
      this.setLoadingIndicator(false);
    }, 3000);
  } catch (e) {
    console.error(e);
  }
}
onPageChange(event: any) {
  this.page.set(event.offset);
  this.updatePagedUsers();
}

  updatePagedUsers() {
  const all = this.temp();
  const start = this.page() * this.limit();
  const end = start + this.limit();
  const pageData = all.slice(start, end);
  this.users.set(pageData);

  this.table()!.offset = 0; // รีเซ็ต offset ของตาราง
}

onFilterChange(event: any) {
  console.log(event.target.value);
  const val = event.target.value.toLowerCase();

  const filterData = this.temp().filter(item =>{
    return item?.name.toLowerCase().indexOf(val) !== -1 ||
           item?.email.toLowerCase().indexOf(val) !== -1 ||
           item?.phone.toLowerCase().indexOf(val) !== -1 ||
           item?.address.toLowerCase().indexOf(val) !== -1 ||
           item?.gender.toLowerCase().indexOf(val) !== -1 ||
           !val;
  });
  this.users.set(filterData);
}

onSortChange(event: any) {
  // ตัวอย่าง: แสดง log ว่ากำลัง sort อะไร
  console.log('Sort event:', event);

  // ถ้าคุณใช้ external sort จริง ๆ ควรจัดเรียง temp() แล้วเรียก updatePagedUsers()
  const sort = event.sorts[0];
  if (sort) {
    const sorted = [...this.temp()].sort((a: any, b: any) => {
      const prop = sort.prop;
      const dir = sort.dir === 'asc' ? 1 : -1;
      return a[prop].localeCompare(b[prop]) * dir;
    });

    this.temp.set(sorted);
    this.updatePagedUsers(); // 👈 ต้องอัปเดตหน้า
  }
}
  exportToExcel() {
    const fields = ['id','name', 'email', 'phone', 'address'];
    const values = this.users();

    const sheetName = 'users';

    const data = this.prepareDataInExcel(values, fields);

    // const header = fields.reduce((acc, field) => {
    //   acc[field] = field.charAt(0).toUpperCase() + field.slice(1);
    //   return acc;
    // }, {} as Record<string, string>);

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { 
      header: Object.keys(data[0]), 
      // header: Object.values(header),
      // skipHeader: true,
    });

    const workBook: XLSX.WorkBook = {
      Sheets: { [sheetName]: worksheet },
      SheetNames: [sheetName]
    };

    const excelBuffer: any = XLSX.write(workBook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const file = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });

    saveAs(file, `users.xlsx`);
 }
 prepareDataInExcel(values: User[], fields: string[]) {
    const dataExport = values.map((value) => {
      const filteredRow: Record<string, any> = {};
      fields.forEach((field) => {
        if(field in value){
          filteredRow[field] = value[field as keyof User];
        }
      });
      return filteredRow;
    });

    return dataExport;
  }

  deleteItem(user: User){
    this.temp.update((users) => users.filter((usr) => usr.id !== user.id));
    this.users.update((users) => users.filter((usr) => usr.id !== user.id));
  }

  openUserFormModel(template: TemplateRef<void>, user?: User) {
    this.updateItem.set(user ?? null);
    this.modalRef.set(this.modalService.show(template));
  }
}
