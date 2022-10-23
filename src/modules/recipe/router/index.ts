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
    component: () => import(/* webpackChunkName: "RecipeCreate" */ "@/modules/recipe/views/RecipeCreate.vue"),
      children: [
        {
          path: "ingredi",
          name: "RecipeCreateIngredient",
          component: () => import(/* webpackChunkName: "RecipeCreateIngredient" */ "@/modules/recipe/components/createTabs/Ingredient.vue"),
        },
        {
          path: "basics",
          name: "RecipeCreateBasics",
          component: () => import(/* webpackChunkName: "RecipeCreateBasics" */ "@/modules/recipe/components/createTabs/Basics.vue"),
        },
        {
          path: "summary",
          name: "RecipeCreateSummary",
          component: () => import(/* webpackChunkName: "RecipeCreateSummary" */ "@/modules/recipe/components/createTabs/Summary.vue"),
        },
      ],
  },
];
