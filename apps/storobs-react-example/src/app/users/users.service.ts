import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './User';

const USERS: User[] = [
  { id: '473dd024be57335f494f730240a501cb', name: 'Ada Lovelace', email: 'ada@lovelace.com' },
  { id: '7d1f2347924f6dbfc0bfdea4c4868435', name: 'Margaret Hamilton', email: 'maggie@hamilton.com' },
];

export class UsersService {
  public fetchUsers(): Observable<User[]> {
    return of(USERS).pipe(delay(3000));
  }
}
