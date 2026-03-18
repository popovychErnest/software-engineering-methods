import {
  current_ball_coordinates,
  info_message,
} from "../../info_window/info.js";
import { ball_data } from "../ball.config.js";
import { gravity } from "./gravity.js";
import { update_speed } from "./update_speed.js";
// import { update_speed } from "./update_speed.js";

const coor_inputs = document.querySelectorAll(
  ".control .coordinate_inputs input",
);

export function movement(main, ball, dt, angle) {
  if (ball_data.movement_type == "uniformly accelerated rectilinear") {
    ball_data.speedX += ball_data.speed_acceleration * Math.cos(angle);
    ball_data.speedY += ball_data.speed_acceleration * Math.sin(angle);
  }
  if (ball_data.movement_type == "uniform rectilinear") {
    ball_data.speedX = ball_data.initial_speed * Math.cos(angle);
    ball_data.speedY = ball_data.initial_speed * Math.sin(angle);
  }
   if (ball_data.movement_type == "parabolic motion") {
    ball_data.speedY -= (ball_data.gravity * 10) * dt;
  }
  
  const ground = main.offsetHeight - ball.offsetHeight;
    if (
      ball_data.x >= ground ||
      ball_data.y <= 0 ||
      ball_data.y >= ground ||
      ball_data.x <= 0
    ) {
      info_message("Replace the ball!");
      // start_scene_button.textContent = "Start uniform rectilinear";
      ball_data.speedX = 0;
      ball_data.speedY = 0;
  
  
      // coor_inputs.forEach((item) => (item.disabled = false));
  
      // ball_data
      ball_data.movement_type = "";
      ball_data.animation_moving = false;
  
      const main = document.querySelector(".main-container");
      main.style.transform = "scale(1)";
   
      return;
    }


  ball_data.x += ball_data.speedX * dt;
  ball_data.y -= ball_data.speedY * dt;
  // coor_inputs[0].value = ball_data.x;
  // coor_inputs[1].value = ball_data.y;

  current_ball_coordinates(ball, main);
  update_speed();
  // if (ball_data.movement_type == "drop") {
  //   gravity(ball, main);
  // }
}
