// dialog-bottom-sheet.service.ts

import {  Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicModalService {
  
  // Create a Subject to handle closed data to be sent to parent
  private dataForParentSubject = new Subject<any>();
  // Expose an observable for the parent component to subscribe to
  dataForParent$: Observable<any> = this.dataForParentSubject.asObservable();
  dataFromComp: any;

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private breakpointObserver: BreakpointObserver
  ) {}

  getDtaFromChildComp(childClosedData: any){
    console.log(childClosedData)
    this.dataFromComp=childClosedData
  }


  openComponent( component: any, data?: any) {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {//Handset: Represents small screens, typically mobile phones till 599px btmsheet/600 be bala dialog
      return this.openBottomSheet(component, data);  // Open as Bottom Sheet on mobile
    } else {
      return this.openDialog(component, data); // Open as Dialog on larger screens
    }
  }

  private openBottomSheet( component: any, data?: any ){
    console.log('gt data from paret in service:',data)
    const config: MatBottomSheetConfig = {
      panelClass: 'bottom-sheet',
    };
    const bottomSheetRef: MatBottomSheetRef= this.bottomSheet.open( component, { ...config, data } );
    
    // Listen for afterDismissed event to receive closed data
    bottomSheetRef.afterDismissed().subscribe((childClosedData: any) => {
      // Emit the closed data to the observable
      this.dataForParentSubject.next(childClosedData+this.dataFromComp);
    });

  }
  


  private openDialog( component: any, data?: any ) {
    const config: MatDialogConfig = {
      width: '500px',
      height: '564px',
      backdropClass:'backdropClass'
    };

    const dialogRef: MatDialogRef<any> = this.dialog.open( component,{ ...config, data } );
    
     // Listen for afterClosed event to receive closed data
     dialogRef.afterClosed().subscribe((childClosedData: any) => {
      // Emit the closed data to the observable
      this.dataForParentSubject.next(childClosedData);
    });
  }



}
