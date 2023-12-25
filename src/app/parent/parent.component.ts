import { Component, OnInit } from '@angular/core';
import { DynamicModalService } from '../dynamic-modal-service.service';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent  implements OnInit{
  constructor(
    private dynamicModalService: DynamicModalService,
    ) {
  }
  ngOnInit(): void {
   

      this.dynamicModalService.dataForParent$.subscribe((childClosedData: any) => {
        if (childClosedData !== undefined) {
          console.log('Data received on close in parent:', childClosedData);
        } else {
          console.log('Bottom sheet or dialog was closed without sending data.');
        }
      });
    }
  openFilterModal(){
    this.dynamicModalService.openComponent(FilterComponent,'data from parent');
  }


}