// TypeScript Version: 2.2
import { SimpleAction } from './types';

export = ActionHelper;

declare function ActionHelper(type: string): SimpleActionCreator;
declare function ActionHelper<T extends {[key: string]: any}>(type: string): ActionCreator<T>;

interface SimpleActionCreator {
  (): SimpleAction;
  type: string;
}
interface ActionCreator<T> {
  (props: T): T;
  type: string;
}
