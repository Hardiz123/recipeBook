import { RecipeService } from './recipes.service';
// import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // selectedRecipe!: Recipe;

  // constructor(private recipeService: RecipeService) { }
  constructor(private dataStorageSerive: DataStorageService) {}

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe(
    // (recipe:Recipe) => {
    //   this.selectedRecipe = recipe;
    // });
    this.dataStorageSerive.fetchRecipes().subscribe();
  }

}
