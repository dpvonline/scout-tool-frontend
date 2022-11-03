export default [
  {
    path: "/recipes",
    name: "RecipesMain",
    component: () => import(/* webpackChunkName: "RecipesMain" */ "@/modules/recipe/views/Main.vue")
  },
  {
    path: "/recipe/:id",
    name: "RecipeDetail",
    component: () => import(/* webpackChunkName: "RecipeDetail" */ "@/modules/recipe/views/RecipeDetail.vue"),
  },
  {
    path: '/recipe/create',
    name: 'RecipeCreate',
    redirect: { name: 'RecipeCreateIngredient'},
    component: () => import(/* webpackChunkName: "RecipeCreate" */ "@/modules/recipe/views/RecipeCreate.vue"),
      children: [
        {
          path: "ingredi",
          name: "RecipeCreateIngredient",
          component: () => import(/* webpackChunkName: "RecipeCreateIngredient" */ "@/modules/recipe/views/createRecipeTabs/Ingredient.vue"),
        },
        {
          path: "basics",
          name: "RecipeCreateBasics",
          component: () => import(/* webpackChunkName: "RecipeCreateBasics" */ "@/modules/recipe/views/createRecipeTabs/Basics.vue"),
        },
        {
          path: "summary",
          name: "RecipeCreateSummary",
          component: () => import(/* webpackChunkName: "RecipeCreateSummary" */ "@/modules/recipe/views/createRecipeTabs/Summary.vue"),
        },
      ],
  },
  {
    path: "/simulator/start",
    name: "SimulatorStart",
    component: () => import(/* webpackChunkName: "SimulatorStart" */ "@/modules/recipe/views/SimulatorStart.vue"),
  },
  {
    path: "/simulator/:id",
    name: "SimulatorMain",
    component: () => import(/* webpackChunkName: "SimulatorMain" */ "@/modules/recipe/views/SimulatorMain.vue"),
  },
];
