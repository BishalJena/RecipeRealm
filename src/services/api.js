const API_KEY = '6b8f8939507742c09db7bbfbcea0bdca';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchRecipes = async (query) => {
  const params = new URLSearchParams({
    apiKey: API_KEY,
    query,
    number: 12,
  });

  const response = await fetch(`${BASE_URL}/complexSearch?${params}&addRecipeInformation=true`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
};

export const getRecipeDetails = async (id) => {
  const params = new URLSearchParams({
    apiKey: API_KEY,
  });

  const response = await fetch(`${BASE_URL}/${id}/information?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }
  return response.json();
};
