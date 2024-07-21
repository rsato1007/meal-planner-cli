#!/usr/bin/env node
// import "./cli/main.js";

import Meal from "./models/Meal";
import MealService from "./services/MealService.js";
let s = new MealService(new Meal());

