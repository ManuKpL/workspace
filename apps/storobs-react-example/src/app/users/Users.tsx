import { FC, useEffect, useState } from 'react';
import { map, Subscription } from 'rxjs';
import { UsersStateService } from './state/users-state.service';
import { User } from './User';

const state = new UsersStateService();

const Users: FC = () => {
  const [error, setError] = useState<unknown>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const subscription = new Subscription();
    subscription.add(state.isLoading$.subscribe(setIsLoading));
    subscription.add(state.error$.subscribe(setError));
    subscription.add(state.users$.subscribe(setUsers));
    subscription.add(state.selectedUser$.subscribe(setSelectedUser));
    return () => subscription.unsubscribe();
  }, []);

  const handleLoadUsers = () => {
    state.fetchUsers();
  };
  const handleSelectUser = (userId: string) => () => {
    state.selectUser(userId);
  };

  return (
    <div>
      <p>users works!</p>
      <button onClick={handleLoadUsers}>Load</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {users.map((user) => (
        <pre
          key={user.id}
          style={{ cursor: 'pointer' }}
          onClick={handleSelectUser(user.id)}
        >
          {JSON.stringify(user, null, 2)}
        </pre>
      ))}
      {selectedUser && (
        <div>
          <p>Selected user:</p>
          <pre>{JSON.stringify(selectedUser, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Users;
