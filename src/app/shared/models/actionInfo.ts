import { NgForm } from '@angular/forms';

export interface ActionInfo {
  actionType: string,
  itemType: string,
  itemId: string,
  form: NgForm,
  goalId?: string
}
