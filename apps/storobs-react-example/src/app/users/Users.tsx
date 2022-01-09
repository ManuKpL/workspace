import { FC, useEffect, useState } from 'react';
import { map, Subscription } from 'rxjs';
import { UsersStateService } from './state/users-state.service';
import { User } from './User';

const state = new UsersStateService();

const Users: FC = () => {
  const [showFirstUser, setShowFirstUser] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [firstUser, setFistUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const subscription = new Subscription();
    subscription.add(state.isLoading$.subscribe(setIsLoading));
    subscription.add(state.error$.subscribe(setError));
    subscription.add(state.users$.subscribe(setUsers));
    subscription.add(state.users$.pipe(map((users) => users[0] ?? null)).subscribe(setFistUser));
    return subscription.unsubscribe;
  }, []);

  const handleLoadUsers = () => {
    state.fetchUsers();
  };
  const handleShowFirstUser = () => setShowFirstUser((value) => !value);

  return (
    <div>
      <p>users works!</p>
      <button onClick={handleLoadUsers}>Load</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <button onClick={handleShowFirstUser}>{showFirstUser ? 'hide' : 'show'}</button>
      {showFirstUser && <pre>{JSON.stringify(firstUser, null, 2)}</pre>}
    </div>
  );
};

export default Users;
