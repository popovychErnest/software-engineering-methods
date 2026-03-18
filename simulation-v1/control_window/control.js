import { ball_data } from "../ball/ball.config.js";
import { uniform_rectilinear } from "./run/uniform_rectilinear.js";
import { uniformly_accelerated_rectilinear } from "./run/uniformly_accelerated_rectilinear.js";



const run_uniform_rectiliniar_button = document.querySelector(".uniform_rectilinear");
const run_uniformly_accelerated_rectilinear_button = document.querySelector(".uniformy_accelerated_rectilinear");


// get coordinates
const [x_input, y_input] = document.querySelectorAll(".coordinate-inputs input");


// get speed
const speed_input = document.querySelector(".speed-input");
const speed_acceleration_input = document.querySelector(".speed-acceleration-input");

const angle_input = document.querySelector(".angle-input");


console.log("speed x: ", parseInt(speed_input.value) != NaN ? parseInt(speed_input.value) : 10);

run_uniform_rectiliniar_button.addEventListener("click", () => {

     const x = (parseInt(x_input.value) || ball_data.x);
    const y = (parseInt(y_input.value) || ball_data.y);
    const speed = Number.isNaN(parseInt(speed_input.value)) ? ball_data.initial_speed : parseInt(speed_input.value); 

    uniform_rectilinear(x, y, speed);
})

// run uniformly accelerated rectilinear
run_uniformly_accelerated_rectilinear_button.addEventListener("click", () => {
    const x = (parseInt(x_input.value) || ball_data.x);
    const y = (parseInt(y_input.value) || ball_data.y);
    const speed = Number.isNaN(parseInt(speed_input.value)) ? ball_data.initial_speed : parseInt(speed_input.value); 
    const angle = Number.isNaN(parseInt(angle_input.value)) ? ball_data.direction_angle : parseInt(angle_input.value);
    const acceleration_speed  = Number.isNaN(parseInt(speed_acceleration_input.value)) ? ball_data.speed_acceleration : parseInt(speed_acceleration_input.value);
     uniformly_accelerated_rectilinear(x, y, speed,acceleration_speed, angle);
})

