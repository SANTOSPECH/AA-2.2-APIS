// Configuración
const API_KEY = 'd5822d578755444f9e689c25c9b5b1c7';
const BASE_URL = 'https://api.spoonacular.com';

// Cliente API
class SpoonacularClient {
  constructor(apiKey = API_KEY) {
    this.apiKey = apiKey;
  }

  // Método genérico para hacer requests
  async makeRequest(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.search = new URLSearchParams({
      ...params,
      apiKey: this.apiKey
    });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return null;
    }
  }

  // Buscar recetas por query
  async searchRecipes(query, number = 10) {
    return this.makeRequest('/recipes/complexSearch', {
      query,
      number,
      addRecipeInformation: true
    });
  }

  // Obtener información detallada de una receta
  async getRecipeDetails(id, includeNutrition = false) {
    return this.makeRequest(`/recipes/${id}/information`, {
      includeNutrition
    });
  }

  // Obtener recetas aleatorias
  async getRandomRecipes(number = 5) {
    return this.makeRequest('/recipes/random', {
      number
    });
  }

  // Buscar recetas por ingredientes
  async searchByIngredients(ingredients, number = 5) {
    return this.makeRequest('/recipes/findByIngredients', {
      ingredients: ingredients.join(','),
      number,
      ignorePantry: true,
      ranking: 1
    });
  }

  // Convertir medidas
  async convertUnits(ingredientName, sourceUnit, targetUnit, sourceAmount) {
    return this.makeRequest('/recipes/convert', {
      ingredientName,
      sourceUnit,
      targetUnit,
      sourceAmount
    });
  }
}

// Ejemplos de uso
const spoonacular = new SpoonacularClient();

// 1. Buscar recetas
spoonacular.searchRecipes('pasta', 3)
  .then(data => {
    console.log('Recetas de pasta:', data.results);
    if (data.results && data.results.length > 0) {
      // 2. Obtener detalles de la primera receta
      return spoonacular.getRecipeDetails(data.results[0].id);
    }
    return null;
  })
  .then(recipeDetails => {
    if (recipeDetails) {
      console.log('Detalles de la primera receta:', {
        title: recipeDetails.title,
        readyInMinutes: recipeDetails.readyInMinutes,
        servings: recipeDetails.servings
      });
    }
  })
  .catch(error => console.error('Error:', error));

// 3. Recetas aleatorias
spoonacular.getRandomRecipes(2)
  .then(data => console.log('Recetas aleatorias:', data.recipes))
  .catch(error => console.error('Error:', error));

// 4. Buscar por ingredientes
spoonacular.searchByIngredients(['apple', 'flour', 'sugar'], 3)
  .then(data => console.log('Recetas por ingredientes:', data))
  .catch(error => console.error('Error:', error));

// 5. Conversión de unidades
spoonacular.convertUnits('flour', 'grams', 'cups', 200)
  .then(data => console.log('Conversión:', data))
  .catch(error => console.error('Error:', error));