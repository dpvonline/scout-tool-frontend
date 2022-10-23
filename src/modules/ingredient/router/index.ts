export default [
  {
    path: "/ingredients",
    name: "IngredientMain",
    component: () => import(/* webpackChunkName: "IngredientMain" */ "@/modules/ingredient/views/Main.vue"),
  },
  {
    path: "/ingredient/:id",
    name: "IngredientDetail",
    redirect: { name: 'IngredientNutrients', params: { id: 1}},
    component: () => import(/* webpackChunkName: "IngredientDetail" */ "@/modules/ingredient/views/IngredientDetail.vue"),
    children: [
      {
        path: "nutrients",
        name: "IngredientNutrients",
        component: () => import(/* webpackChunkName: "IngredientNutrients" */ "@/modules/ingredient/views/tabs/Nutrients.vue"),
      },
      {
        path: "portions",
        name: "IngredientPortions",
        component: () => import(/* webpackChunkName: "IngredientPortions" */ "@/modules/ingredient/views/tabs/Portions.vue"),
      },
    ],
  },
  {
    path: "/ingredient/create",
    name: "IngredientCreate",
    component: () => import(/* webpackChunkName: "IngredientCreate" */ "@/modules/ingredient/views/IngredientCreate.vue"),
  },
];
