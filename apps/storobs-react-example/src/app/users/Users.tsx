import { useObservableState } from 'observable-hooks';
import { FC } from 'react';
import { UsersStateService } from './state/users-state.service';

const state = new UsersStateService();

const Users: FC = () => {
  const error = useObservableState(state.error$, null);
  const users = useObservableState(state.users$, []);
  const selectedUser = useObservableState(state.selectedUser$, null);
  const isLoading = useObservableState(state.isLoading$, false);

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
