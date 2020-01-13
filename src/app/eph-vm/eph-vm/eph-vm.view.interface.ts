import { Observable, Subject } from 'rxjs';
import { PaginatorBaseModel } from './eph-vm.base-model.interface';

export interface PaginatorView {
  // All UI-Events or component EventBindings
  selectPageAction$: Subject<number>;
  selectNumberAction$: Subject<number>;
  searchKeysInput$: Subject<Event>;
  continents$: Observable<string[]>;
  // Optional: The base model as observable
  baseModel$: Observable<PaginatorBaseModel>;
  // Optional: Derivations as observable
  updateContinentsInPage$: Observable<string[]>;
  pagesAvailable$: Observable<number>;
}
