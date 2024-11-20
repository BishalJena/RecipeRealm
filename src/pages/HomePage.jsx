import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { searchRecipes } from '../services/api';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { data, isLoading, error } = useQuery(
    ['recipes', debouncedSearch],
    () => searchRecipes(debouncedSearch),
    {
      enabled: debouncedSearch.length > 0,
    }
  );

  const handleSearch = () => {
    setDebouncedSearch(searchTerm);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Discover Delicious Recipes
        </h1>
        <p className="text-gray-600">
          Search through thousands of recipes to find your next favorite meal
        </p>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
      />

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          Error loading recipes. Please try again.
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.results.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
