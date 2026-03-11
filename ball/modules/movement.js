import {
  current_ball_coordinates,
  info_message,
} from "../../info_window/info.js";
import { ball_data } from "../ball.config.js";
import { update_speed } from "./update_speed.js";

const coor_inputs = document.querySelectorAll(
  ".control .coordinate_inputs input",
);

export function movement(main, ball, dt) {
  if (ball_data.movement_type == "uniformly accelerated rectilinear") {
    ball_data.speedX += 2;
    ball_data.speedY += -2;
  }

  const ground = 700 - ball.clientHeight;

  if (
    ball_data.x >= ground ||
    ball_data.y <= 0 ||
    ball_data.y >= ground ||
    ball_data.x <= 0
  ) {
    info_message("Replace the ball!");
    ball_data.speedX = 1;
    ball_data.speedY = -1;
    // start_scene_button.textContent = "Start uniform rectilinear";

    // coor_inputs.forEach((item) => (item.disabled = false));

    ball_data.movement_type = "";
    ball_data.animation_moving = false;

    const main = document.querySelector(".main-container");
    main.style.transform = "scale(1)";

    return;
  }

  ball_data.x += ball_data.speedX * dt;
  ball_data.y += ball_data.speedY * dt;
  // coor_inputs[0].value = ball_data.x;
  // coor_inputs[1].value = ball_data.y;


   current_ball_coordinates(ball, main);
  update_speed(ball_data); 
}
