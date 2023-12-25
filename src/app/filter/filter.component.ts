import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { DynamicModalService } from '../dynamic-modal-service.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  private closedDataSubjectf = new Subject<any>();
  closedData$: Observable<any> = this.closedDataSubjectf.asObservable();
  selectedMatchTypes:  string[] =['matches','trainings','tryouts'] ;
  selectedHomeAway: string[] = ['home','away'];
  selectedCompetition: string[] =['checkbox1','checkbox2','checkbox3'];
  //childClosedData:any|null={selectedMatchTypes:this.selectedMatchTypes,selectedHomeAway:this.selectedHomeAway,selectedCompetition:this.selectedCompetition}
  currentSelected:any|null={selectedMatchTypes:['trainings'] ,selectedHomeAway:['home'],selectedCompetition:['checkbox2','checkbox3']}
  
  constructor(//using the @Optional decorator to tell Angular to use the MatBottomSheetRef if available and fallback to MatDialogRef otherwise.its allowing the injector to inject null if the dependency is not found. 
    @Optional() private bottomSheetRef: MatBottomSheetRef<FilterComponent>,
    @Optional() private dialogRef: MatDialogRef<FilterComponent>,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public pData: any,
    @Optional() @Inject(MAT_DIALOG_DATA) public pData2: any,
    private dynamicModalService: DynamicModalService,

    ){console.log('filter constructor get data:',pData,pData2)}

  ngOnInit() {
    console.log(this.currentSelected)
    //detect click on backdrop of modal to close
    if (this.bottomSheetRef) {
      this.bottomSheetRef.backdropClick().subscribe(() => {
        this.close();
      });    
    } else if (this.dialogRef) {
      this.dialogRef.backdropClick().subscribe(() => {
        this.close();
      });
    }
    console.log('Backdrop clicked! in filter');
  }
      
  
  close() {//send child data to service
    this.currentSelected={selectedMatchTypes:this.selectedMatchTypes,selectedHomeAway:this.selectedHomeAway,selectedCompetition:this.selectedCompetition};
    if (this.bottomSheetRef) {
      this.dynamicModalService.getDtaFromChildComp(this.currentSelected);
      this.bottomSheetRef.dismiss();
    } else if (this.dialogRef) {
      this.dialogRef.close(this.currentSelected);
    }
  }


  isSelectedBefore(from:string,value:string){ 
    if(from==='matchType'){
      return this.selectedMatchTypes.includes(value);
    }
    if(from==='homeAway'){
      return this.selectedHomeAway.includes(value);
    }
    if(from==='competition'){
      return this.selectedCompetition.includes(value);
    }
    return false;
  }


  toggleCheckbox(from:string,value: string): void {
    if(from==='matchType'){
      if (this.isSelectedBefore('matchType',value)) {
        this.selectedMatchTypes=this.selectedMatchTypes.filter(e=>e !==value);
      } else {
        this.selectedMatchTypes.push(value);
      }
    }
    if(from==='homeAway'){
      if (this.isSelectedBefore('homeAway',value)) {
        this.selectedHomeAway=this.selectedHomeAway.filter(e=>e !==value);
      } else {
        this.selectedHomeAway.push(value);
      }
    }
    if(from==='competition'){
      if (this.isSelectedBefore('competition',value)) {
        this.selectedCompetition=this.selectedCompetition.filter(e=>e !==value);
      } else {
        this.selectedCompetition.push(value);
      }
      console.log(this.selectedMatchTypes);
      console.log(this.selectedHomeAway);
      console.log(this.selectedCompetition);
  }
  

}
checkOrNot(from:string,value:string){ 
  if(from==='matchType' && this.currentSelected.selectedMatchTypes.includes(value)){
    return true
  }
  if(from==='homeAway' && this.currentSelected.selectedHomeAway.includes(value)){
    return true;
  }
  if(from==='competition' && this.currentSelected.selectedCompetition.includes(value)){
    return true;
  }
  return false;
}

}