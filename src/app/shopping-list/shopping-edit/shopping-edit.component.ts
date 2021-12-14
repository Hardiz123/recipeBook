import { Subscription } from 'rxjs';
import { Ingredient } from './../../shared/ingredient-model';
import { ShoppingListService } from './../shopping-list.service';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef! : ElementRef;
  // @ViewChild('amountInput') amountInputRef! : ElementRef;
  @ViewChild('f') slForm! : NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex! : number;
  editedItem!: Ingredient;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((index:number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredient(index)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef?.nativeElement.value;
    // const ingAmount = this.amountInputRef?.nativeElement.value;
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
