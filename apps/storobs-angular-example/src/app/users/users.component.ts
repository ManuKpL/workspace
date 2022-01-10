import { Component } from '@angular/core';
import { UsersStateService } from './state/users-state.service';

@Component({
  selector: 'manukpl-users',
  template: `
    <div>
      <p>users works!</p>
      <button (click)="loadUsers()">Load</button>
      <p *ngIf="isLoading$ | async">Loading...</p>
      <p *ngIf="error$ | async">Error!</p>
      <pre *ngFor="let user of users$ | async" (click)="selectUser(user.id)">{{
        user | json
      }}</pre>
      <div *ngIf="selectedUser$ | async as user">
        <p>Selected user:</p>
        <pre>{{ user | json }}</pre>
      </div>
    </div>
  `,
  styles: ['div > pre { cursor: pointer; }'],
})
export class UsersComponent {
  public readonly isLoading$ = this.usersState.isLoading$;
  public readonly users$ = this.usersState.users$;
  public readonly error$ = this.usersState.error$;
  public readonly selectedUser$ = this.usersState.selectedUser$;

  constructor(private readonly usersState: UsersStateService) {}

  public loadUsers(): void {
    this.usersState.fetchUsers();
  }

  public selectUser(userId: string) {
    this.usersState.selectUser(userId);
  }
}
