import { AlertComponent } from "./shared/alert/alert.component";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthEffects } from "./auth/store/auth.effects";
import { AuthModule } from "./auth/auth.module";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "./core.module";
import { EffectsModule } from "@ngrx/effects";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RecipeEffects } from "./recipes/store/recipe.effects";
import { RecipesModule } from "./recipes/recipes.module";
import { SharedModule } from "./shared/shared.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { appReducer } from "./store/app.reducer";
import { environment } from "src/environments/environment";

const firebaseConfig = {
  apiKey: "AIzaSyAF65caiao_hN9snRvBA5JLjqpLlHaQ8UQ",
  authDomain: "ngrx-f25ad.firebaseapp.com",
  databaseURL: "https://ngrx-f25ad.firebaseio.com",
  projectId: "ngrx-f25ad",
  storageBucket: "ngrx-f25ad.appspot.com",
  messagingSenderId: "771867281760",
  appId: "1:771867281760:web:06b135aa3525fbc461f605",
  measurementId: "G-YWGMV5NY4Q",
};

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, //
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthModule,
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    // StoreRouterConnectingModule.forRoot(),
  ],

  bootstrap: [AppComponent],
  entryComponents: [AlertComponent],
})
export class AppModule {}
