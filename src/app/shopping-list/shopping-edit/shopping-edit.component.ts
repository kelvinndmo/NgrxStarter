import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm, FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";

import { Ingredient } from "../../shared/ingredient.model";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list.action";
import * as fromShoppingList from "../store/shopping-list.reducer";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ShoppingForm: FormGroup;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.ShoppingForm = this.fb.group({
      name: "",
      amount: "",
    });
    this.store.select("shoppingList").subscribe((stateData) => {
      if (stateData.editedIngridientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngridient;
        this.ShoppingForm.controls["name"].setValue(this.editedItem.name);
        this.ShoppingForm.controls["amount"].setValue(this.editedItem.amount);
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.slService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.slService.getIngredient(index);
    //     this.ShoppingForm.controls["name"].setValue(this.editedItem.name);
    // this.ShoppingForm.controls["amount"].setValue(this.editedItem.amount);
    //   }
    // );
  }

  onSubmit() {
    const value: Ingredient = this.ShoppingForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);

      this.store.dispatch(
        new ShoppingListActions.UpdateIngridient(newIngredient)
      );
    } else {
      console.log(value);
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngridient(newIngredient));
    }
    this.editMode = false;
    this.ShoppingForm.reset();
  }

  onClear() {
    this.ShoppingForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngridients());
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
