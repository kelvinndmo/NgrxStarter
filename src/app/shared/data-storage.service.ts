import * as RecipesAction from "../recipes/store/recipe.actions";
import * as fromApp from "../store/app.reducer";

import { map, tap } from "rxjs/operators";

import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { Ingredient } from "./ingredient.model";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { Store } from "@ngrx/store";

export const recipees: Recipe[] = [
  new Recipe(
    "some good",
    "such a good recipe",
    "https://upload.wikimedia.org/wikipedia/commons/4/48/Ugali_%26_Sukuma_Wiki.jpg",
    [new Ingredient("Flour", 12)]
  ),
  new Recipe(
    "some good",
    "such a good recipe",
    "https://upload.wikimedia.org/wikipedia/commons/4/48/Ugali_%26_Sukuma_Wiki.jpg",
    [new Ingredient("Flour", 12)]
  ),
  new Recipe(
    "some good",
    "such a good recipe",
    "https://upload.wikimedia.org/wikipedia/commons/4/48/Ugali_%26_Sukuma_Wiki.jpg",
    [new Ingredient("Flour", 12)]
  ),
  new Recipe(
    "some good",
    "such a good recipe",
    "https://upload.wikimedia.org/wikipedia/commons/4/48/Ugali_%26_Sukuma_Wiki.jpg",
    [new Ingredient("Flour", 12)]
  ),
  new Recipe(
    "some good",
    "such a good recipe",
    "https://upload.wikimedia.org/wikipedia/commons/4/48/Ugali_%26_Sukuma_Wiki.jpg",
    [new Ingredient("Flour", 12)]
  ),
  new Recipe(
    "some good",
    "such a good recipe",
    "https://upload.wikimedia.org/wikipedia/commons/4/48/Ugali_%26_Sukuma_Wiki.jpg",
    [new Ingredient("Flour", 12)]
  ),
];

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        "https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    console.log("heeey");
    // return this.http
    //   .get<Recipe[]>(
    //     "https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json"
    //   )
    //   .pipe(
    //     map((recipes) => {
    //       return recipes.map((recipe) => {
    //         return {
    //           ...recipe,
    //           ingredients: recipe.ingredients ? recipe.ingredients : [],
    //         };
    //       });
    //     }),
    //     tap((recipes) => {
    // thisrecipeService..setRecipes(recipes);
    // console.log(recipes);

    this.store.dispatch(new RecipesAction.SetRecipes(recipees));
    // })
    // );
  }
}
