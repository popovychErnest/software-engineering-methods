import { state } from "../ball/ball.config.js";
import { current_ball_coordinates } from "../info_window/info.js";
import { smooth_fade } from "../ui/ui.js";
import { parabolic_motion } from "./run/parabolic_motion.js";
import { uniform_rectilinear } from "./run/uniform_rectilinear.js";
import { uniformly_accelerated_rectilinear } from "./run/uniformly_accelerated_rectilinear.js";
import { balls_data } from "../ball/ball.config.js";
  const main = document.querySelector(".main-container");

const run_uniform_rectiliniar_button = document.querySelector(
  ".uniform_rectilinear",
);
const run_uniformly_accelerated_rectilinear_button = document.querySelector(
  ".uniformy_accelerated_rectilinear",
);
const run_parabolic_motion_button = document.querySelector(".parabolic_motion");


const ball = document.querySelector(".ball");

// get coordinates
const [x_input, y_input] = document.querySelectorAll(
  ".coordinate-inputs input",
);

// get speed
const speed_input = document.querySelector(".control .speed-input");
const speed_acceleration_input = document.querySelector(
    ".speed-acceleration-input",
);

const angle_input = document.querySelector(".control .angle-input");
angle_input.addEventListener("input", (e) => {
  state.active_ball.direction_angle = parseInt(e.target.value) ?? 0;
  // state.active_ball.
})


const gravity_input = document.querySelector(".gravity-input");

const reset_ball_button = document.querySelector(".control .reset-ball");


reset_ball_button.addEventListener("click", () => {
    state.active_ball.x = 100;
    state.active_ball.y = 600;

  state.active_ball.direction_angle = 45;
  state.active_ball.dom_shadow_element.querySelector(".angle-line").style.transform = `rotate(${360-(parseInt(state.active_ball.direction_angle)-90)}deg)`

  smooth_fade();

  x_input.value = state.active_ball.x;
  y_input.value = state.active_ball.y;

  angle_input.value = state.active_ball.direction_angle;

  state.active_ball.dom_element.style.left = `${state.active_ball.x}px`;
  state.active_ball.dom_element.style.top = `${state.active_ball.y}px`;

  current_ball_coordinates(state.active_ball.dom_element, main);

  state.active_ball.dom_shadow_element.style.left = `${state.active_ball.x}px`;
  state.active_ball.dom_shadow_element.style.top = `${state.active_ball.y}px`;

  state.active_ball.dom_shadow_element.querySelector(".angle-line").style.transform = `rotate(45deg)`;

  state.active_ball.animation_moving = false;
  state.active_ball.last_time = performance.now();
});


run_uniform_rectiliniar_button.addEventListener("click", () => {
  smooth_fade();

  const x = parseInt(x_input.value) || state.active_ball.x;
  const y = parseInt(y_input.value) || state.active_ball.y;
  const speed = Number.isNaN(parseInt(speed_input.value))
    ? state.active_ball.initial_speed
    : parseInt(speed_input.value);

  uniform_rectilinear(x, y, speed);
});

// run uniformly accelerated rectilinear
run_uniformly_accelerated_rectilinear_button.addEventListener("click", () => {
    smooth_fade();

  const x = parseInt(x_input.value) || state.active_ball.x;
  const y = parseInt(y_input.value) || state.active_ball.y;
  const speed = Number.isNaN(parseInt(speed_input.value))
    ? state.active_ball.initial_speed
    : parseInt(speed_input.value);
  const angle = Number.isNaN(parseInt(angle_input.value))
    ? state.active_ball.direction_angle
    : parseInt(angle_input.value);
  const acceleration_speed = Number.isNaN(
    parseInt(speed_acceleration_input.value),
  )
    ? state.active_ball.speed_acceleration
    : parseInt(speed_acceleration_input.value * 100);
  uniformly_accelerated_rectilinear(x, y, speed, acceleration_speed, angle);
});

run_parabolic_motion_button.addEventListener("click", () => {
     smooth_fade();


  const x = parseInt(x_input.value) || state.active_ball.x;
  const y = parseInt(y_input.value) || state.active_ball.y;
  const speed = Number.isNaN(parseInt(speed_input.value))
    ? state.active_ball.initial_speed
    : parseInt(speed_input.value);
  const angle = Number.isNaN(parseInt(angle_input.value))
    ? state.active_ball.direction_angle
    : parseInt(angle_input.value);
  const gravity = Number.isNaN(parseInt(gravity_input.value))
    ? state.active_ball.gravity
    : parseInt(gravity_input.value * 10);
  parabolic_motion( speed, angle, gravity, state.active_ball, x, y);
});