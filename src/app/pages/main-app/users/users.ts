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
  temp = signal<User[]>([]);
  users = signal<User[]>([]);
  columnMode = ColumnMode;
  loadingIndicator = signal<boolean>(false);

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


}
