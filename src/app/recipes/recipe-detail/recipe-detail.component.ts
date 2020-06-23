import * as RecipesActions from "../store/recipe.actions";
import * as fromApp from "../../store/app.reducer";

import { ActivatedRoute, Params, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { map, switchMap } from "rxjs/operators";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => {
          console.log("heey");
          return +params["id"];
        }),
        switchMap((id) => {
          console.log(id);
          this.id = id;
          return this.store.select("recipes");
        }),
        map((recipeState) => {
          console.log(recipeState.recipes);
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe) => {
        console.log(recipe);
        this.recipe = recipe;
      });
    // this.recipe = this.recipeService.getRecipe(this.id);
    //   this.store
    //     .select("recipes")
    //     .pipe(
    //       map((recipeState) => {
    //         return recipeState.recipes.find((recipe, index) => {
    //           return index == this.id;
    //         });
    //       })
    //     )
    //     .subscribe((recipe) => {
    //       this.recipe = recipe;
    //     });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(["/recipes"]);
  }
}
