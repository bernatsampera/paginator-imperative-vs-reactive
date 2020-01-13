import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EphVmService } from './eph-vm.service';

@Component({
  selector: 'app-eph-vm',
  templateUrl: './eph-vm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EphVmService]
})
export class EphVmComponent {
  numberOfResultsList: number[] = [1, 3, 5, 7];

  constructor(
    public vm: EphVmService
  ) {
   }
}
