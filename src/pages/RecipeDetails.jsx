import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Clock, Users, ChefHat } from 'lucide-react';
import { getRecipeDetails } from '../services/api';

const RecipeDetails = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error } = useQuery(['recipe', id], () =>
    getRecipeDetails(id)
  );

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading recipe details. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {recipe && (
        <div className="space-y-6">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          
          <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
          
          <div className="flex space-x-6 text-gray-600">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{recipe.readyInMinutes} minutes</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-2">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Instructions</h2>
            <div className="space-y-4">
              {recipe.analyzedInstructions[0]?.steps.map((step) => (
                <div key={step.number} className="flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                    {step.number}
                  </div>
                  <p className="flex-1">{step.step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
