import { ball_data } from "../ball/ball.config.js";
import { uniform_rectilinear } from "./run/uniform_rectilinear.js";
import { uniformly_accelerated_rectilinear } from "./run/uniformly_accelerated_rectilinear.js";



const run_unform_rectiliniar_button = document.querySelector(".uniform_rectilinear");
const run_uniformly_accelerated_rectilinear_button = document.querySelector(".uniformy_accelerated_rectilinear");


// run uniform rectilinear
const [x_input, y_input] = document.querySelectorAll(".coordinate-inputs input");

console.log("x input: =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",x_input.value.length);
run_unform_rectiliniar_button.addEventListener("click", () => uniform_rectilinear(parseInt(x_input.value) || ball_data.x, parseInt(y_input.value) || ball_data.y));

// run uniformly accelerated rectilinear
run_uniformly_accelerated_rectilinear_button.addEventListener("click", () =>  uniformly_accelerated_rectilinear(parseInt(x_input.value) || ball_data.x, parseInt(y_input.value) || ball_data.y))

 