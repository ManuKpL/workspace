import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule],
  exports: [UsersComponent],
})
export class UsersModule {}
