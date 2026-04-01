import { balls_data } from "../ball/ball.config.js";
import { create_ball, generate_random } from "./create_ball.js";
import { state } from "../ball/ball.config.js";
import { parabolic_motion } from "./run/parabolic_motion.js";
import { quantity_of_balls_info } from "../info_window/info.js";
const balls_container = document.querySelector(".main-container .balls");
const main_container = document.querySelector(".main-container");


const create_ball_button = document.querySelector(
  ".multi-control .create-ball-button",
);

// see create_ball.js
create_ball_button.addEventListener("click", create_ball);

// control all balls
const start_all_balls_button = document.querySelector(
  ".multi-control .start-all-button",
);
const stop_all_balls_button = document.querySelector(
  ".multi-control .stop-all-button",
);
const delete_all_balls_button = document.querySelector(
  ".multi-control .delete-all-balls-button",
);
const delete_active_ball_button = document.querySelector(
  ".multi-control .delete-active-ball-button",
);
const reset_balls_button = document.querySelector(
  ".multi-control .init-balls-button",
);


const random_angle_button = document.querySelector(
  ".multi-control .random-angle-button",
);

console.log(balls_data);

const speed_input = document.querySelector(".multi-control .speed-input");
const gravity_input = document.querySelector(".multi-control .gravity-input");
const angle_input = document.querySelector(".multi-control .angle-input");


angle_input.addEventListener("input", (e) => {
    balls_data.forEach(el => {
        el.direction_angle = e.target.value.trim() == "" ? generate_random(0,360) : el.direction_angle;
    el.dom_shadow_element.querySelector(".angle-line").style.transform = `rotate(${360-(parseInt(e.target.value)-90)}deg)`
    })
})


start_all_balls_button.addEventListener("click", () => {
  balls_data.forEach((el) => {
    if (el.animation_moving) return
    const angle = Number.isNaN(parseInt(angle_input.value))
      ? el.direction_angle
      : parseInt(angle_input.value);

    const speed = Number.isNaN(parseInt(speed_input.value))
      ? el.initial_speed
      : parseInt(speed_input.value);

    const gravity = Number.isNaN(parseInt(gravity_input.value))
      ? el.gravity
      : parseInt(gravity_input.value * 10);

    parabolic_motion(speed, angle, gravity, el);
  });
});

stop_all_balls_button.addEventListener("click", () => {
  balls_data.forEach((el) => {
    el.animation_moving = false;
    el.movement_type = "parabolic motion";
    el.last_time = performance.now();
  });
});

delete_all_balls_button.addEventListener("click", () => {
  balls_data.forEach((el) => {
   el.dom_element.remove();
   el.dom_shadow_element.remove();
  });

  balls_data.length = 0;
  console.log("balls_data: ", balls_data);
});

// delete selected ball
delete_active_ball_button.addEventListener("click", () => {
    const removed_ball = balls_data.shift();
    quantity_of_balls_info(balls_data.length)
  if (removed_ball) {
    removed_ball.dom_element.remove();

    setTimeout(() => {
      removed_ball.dom_shadow_element.remove();
      removed_ball.dom_shadow_element.style.opacity = "0";
    }, 100);

    setTimeout(() => {
      removed_ball.dom_shadow_element.remove();
    }, 1700);
  }
  state.active_ball = balls_data[balls_data.length-1];
});


reset_balls_button.addEventListener("click", () => {


    const main = main_container.getBoundingClientRect();
  balls_data.forEach((el) => {
    const shadow_rect = el.dom_shadow_element.getBoundingClientRect();
    console.log(`ball #${el.id}: `, shadow_rect.left, shadow_rect.top)
   el.x = shadow_rect.left - main.left;
   el.y = shadow_rect.top - main.top;

   el.dom_element.style.left = el.x + "px";
   el.dom_element.style.top = el.y + "px";
   el.animation_moving = false;
  });
});

random_angle_button.addEventListener("click", () => {
  balls_data.forEach((el) => {
    el.direction_angle = generate_random(0,360);
    el.dom_shadow_element.querySelector(".angle-line").style.transform = `rotate(${360-(parseInt(el.direction_angle)-90)}deg)`
  });
});

