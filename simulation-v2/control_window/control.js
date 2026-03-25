import { ball_data } from "../ball/ball.config.js";
import { current_ball_coordinates } from "../info_window/info.js";
import { smooth_fade } from "../ui/ui.js";
import { parabolic_motion } from "./run/parabolic_motion.js";
import { uniform_rectilinear } from "./run/uniform_rectilinear.js";
import { uniformly_accelerated_rectilinear } from "./run/uniformly_accelerated_rectilinear.js";

  const main = document.querySelector(".main-container");


const run_uniform_rectiliniar_button = document.querySelector(
  ".uniform_rectilinear",
);
const run_uniformly_accelerated_rectilinear_button = document.querySelector(
  ".uniformy_accelerated_rectilinear",
);
const run_parabolic_motion_button = document.querySelector(".parabolic_motion");

const ball = document.querySelector(".ball");
const shadow_ball = document.querySelector(".shadow-ball");

// get coordinates
const [x_input, y_input] = document.querySelectorAll(
  ".coordinate-inputs input",
);

// get speed
const speed_input = document.querySelector(".speed-input");
const speed_acceleration_input = document.querySelector(
    ".speed-acceleration-input",
);

const angle_input = document.querySelector(".angle-input");
const gravity_input = document.querySelector(".gravity-input");

const reset_ball_button = document.querySelector(".reset-ball");


reset_ball_button.addEventListener("click", () => {
    ball_data.x = 100;
    ball_data.y = 600;

  ball_data.direction_angle = 45;

  smooth_fade();

  x_input.value = ball_data.x;
  y_input.value = ball_data.y;

  angle_input.value = ball_data.direction_angle;

  ball.style.left = `${ball_data.x}px`;
  ball.style.top = `${ball_data.y}px`;

  current_ball_coordinates(ball, main);

  shadow_ball.style.left = `${ball_data.x}px`;
  shadow_ball.style.top = `${ball_data.y}px`;

  shadow_ball.querySelector(".angle-line").style.transform = `rotate(45deg)`;

  ball_data.animation_moving = false;
  ball_data.last_time = performance.now();
});


run_uniform_rectiliniar_button.addEventListener("click", () => {
  smooth_fade();

  const x = parseInt(x_input.value) || ball_data.x;
  const y = parseInt(y_input.value) || ball_data.y;
  const speed = Number.isNaN(parseInt(speed_input.value))
    ? ball_data.initial_speed
    : parseInt(speed_input.value);

  uniform_rectilinear(x, y, speed);
});

// run uniformly accelerated rectilinear
run_uniformly_accelerated_rectilinear_button.addEventListener("click", () => {
    smooth_fade();

  const x = parseInt(x_input.value) || ball_data.x;
  const y = parseInt(y_input.value) || ball_data.y;
  const speed = Number.isNaN(parseInt(speed_input.value))
    ? ball_data.initial_speed
    : parseInt(speed_input.value);
  const angle = Number.isNaN(parseInt(angle_input.value))
    ? ball_data.direction_angle
    : parseInt(angle_input.value);
  const acceleration_speed = Number.isNaN(
    parseInt(speed_acceleration_input.value),
  )
    ? ball_data.speed_acceleration
    : parseInt(speed_acceleration_input.value * 100);
  uniformly_accelerated_rectilinear(x, y, speed, acceleration_speed, angle);
});

run_parabolic_motion_button.addEventListener("click", () => {
     smooth_fade();


  const x = parseInt(x_input.value) || ball_data.x;
  const y = parseInt(y_input.value) || ball_data.y;
  const speed = Number.isNaN(parseInt(speed_input.value))
    ? ball_data.initial_speed
    : parseInt(speed_input.value);
  const angle = Number.isNaN(parseInt(angle_input.value))
    ? ball_data.direction_angle
    : parseInt(angle_input.value);
  const gravity = Number.isNaN(parseInt(gravity_input.value))
    ? ball_data.gravity
    : parseInt(gravity_input.value * 10);
  parabolic_motion(x, y, speed, angle, gravity);
});
