import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsersStateService } from './state/users-state.service';

@Component({
  selector: 'manukpl-users',
  template: `
    <div>
      <p>users works!</p>
      <button (click)="loadUsers()">Load</button>
      <p *ngIf="isLoading$ | async">Loading...</p>
      <p *ngIf="error$ | async">Error!</p>
      <pre>{{ users$ | async | json }}</pre>
      <button (click)="showFirstUser()">{{ doShow ? 'hide' : 'show' }}</button>
      <pre *ngIf="doShow">{{ firstUser$ | async | json }}</pre>
    </div>
  `,
  styles: [],
})
export class UsersComponent {
  public readonly isLoading$ = this.usersState.isLoading$;
  public readonly users$ = this.usersState.users$;
  public readonly error$ = this.usersState.error$;
  public readonly firstUser$ = this.usersState.users$.pipe(
    map((users) => users[0] ?? null)
  );
  public doShow = false;

  constructor(private readonly usersState: UsersStateService) {}

  public loadUsers(): void {
    this.usersState.fetchUsers();
  }

  public showFirstUser(): void {
    this.doShow = !this.doShow;
  }
}
