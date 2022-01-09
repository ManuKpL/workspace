import { EmptyAction } from '../Action';

type CreateEmptyAction = <T extends string>(type: T) => () => EmptyAction<T>;
export const createEmptyAction: CreateEmptyAction = (type) => () => ({ type });
