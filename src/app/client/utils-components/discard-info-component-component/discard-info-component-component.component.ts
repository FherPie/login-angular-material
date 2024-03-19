import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-discard-info-component-component',
  templateUrl: './discard-info-component-component.component.html',
  styleUrls: ['./discard-info-component-component.component.css']
})
export class DiscardInfoComponent {

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
                  private dialogRef: MatDialogRef<DiscardInfoComponent>) {} // Closing dialog window
    
    public cancel(): void { // To cancel the dialog window
    this.dialogRef.close();
    }
    
    public cancelN(): void { 
        this.dialog.closeAll();
    }
}
