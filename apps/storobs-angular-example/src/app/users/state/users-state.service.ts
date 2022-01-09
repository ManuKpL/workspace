import { Injectable } from '@angular/core';
import { asyncMiddleware, Store } from '@manukpl/storobs';
import { UsersService } from '../users.service';
import { fetchUsers, setUser } from './actions';
import { userReducer } from './reducer';

@Injectable({
  providedIn: 'root',
})
export class UsersStateService {
  private readonly store = new Store({
    reducer: userReducer,
    middlewares: [asyncMiddleware],
    debugMode: true,
  });

  public readonly users$ = this.store.select('users');
  public readonly isLoading$ = this.store.select('isLoading');
  public readonly selectedUser$ = this.store.select('selectedUser');
  public readonly error$ = this.store.select('error');

  constructor(private readonly usersService: UsersService) {}

  public fetchUsers(): void {
    const request$ = this.usersService.fetchUsers();
    this.store.dispatch(fetchUsers(request$));
  }

  public selectUser(uid: string): void {
    this.store.dispatch(setUser(uid));
  }

  public unselectUser(): void {
    this.store.dispatch(setUser(null));
  }
}
