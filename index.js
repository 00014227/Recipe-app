const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
 
  res.render('index', { recipes });
});

app.get('/recipe/:id', (req, res) => {
  const id = req.params.id;
  const recipe = recipes.find(recipe => recipe.id === id);
  res.render('recipe', { recipe });
 
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const name = req.body.name.trim();
  const ingredients = req.body.ingredients.trim();
  const instructions = req.body.instructions.trim();

  if (!name || !ingredients || !instructions) {
    res.render('add', { error: 'Please fill in all required fields.' });
    return;
  }

  const recipe = {
    id: Date.now().toString(),
    name: name,
    ingredients: ingredients,
    instructions: instructions,
    mealType: req.body.mealType,
    dietaryRestrictions: req.body.dietaryRestrictions
  };

  recipes.push(recipe);
  console.log(recipes)
  res.redirect('/');
});



app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const recipe = recipes.find(recipe => recipe.id === id);
  res.render('edit', { recipe });
});

app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const recipe = recipes.find(recipe => recipe.id === id);

  recipe.name = req.body.name;
  recipe.ingredients = req.body.ingredients;
  recipe.instructions = req.body.instructions;
  recipe.mealType = req.body.mealType;
  recipe.dietaryRestrictions = req.body.dietaryRestrictions;

  res.redirect(`/recipe/${id}`);
});

app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  const index = recipes.findIndex(recipe => recipe.id === id);
  if (index !== -1) {
    recipes.splice(index, 1);
  }

  res.redirect('/');
});



app.post('/search', (req, res) => {
  const query = req.body.query.toLowerCase()
  const results = recipes.filter(recipe => {
    return recipe.ingredients.includes(query) || recipe.mealType === query;
  });
  console.log(results);
  const mealType = req.body.mealType;
const dietaryRestrictions = req.body.dietaryRestrictions;

let filteredRecipes = recipes.filter(recipe => {
const nameMatch = recipe.name.toLowerCase().includes(query);
const ingredientsMatch = recipe.ingredients.toLowerCase().includes(query);
const mealTypeMatch = !mealType || recipe.mealType === mealType;
const dietaryRestrictionsMatch = !dietaryRestrictions || recipe.dietaryRestrictions === dietaryRestrictions;});

res.render('index', { recipes: filteredRecipes });
});

const recipes = require('./recipes.json');

app.listen(3000, () => {
console.log('Server listening on port 3000');
});