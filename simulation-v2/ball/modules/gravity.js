import { current_ball_coordinates } from "../../info_window/info.js";
import { update_speed } from "./update_speed.js";
import { ball_data } from "../ball.config.js";

export function gravity( ball, main) {
  // if (ball_data.dropped == false) return;

  // gravity acceleration
  ball_data.gravitySpeed += ball_data.gravity;

  // x acceleration
  ball_data.x += ball_data.speedX;
  
  // y acceleration (plus gravity acceleration)
  ball_data.y += ball_data.speedY + ball_data.gravitySpeed;

  let ground = main.offsetHeight;

  // friction
  ball_data.speedX *= 0.99;
  ball_data.speedY *= 0.99;

  if (ball_data.y < ground - ball.clientWidth &&  ball_data.y > 0 && (ball_data.x > 0 && ball_data.x < ground - ball.clientWidth)) { 
    ball.style.left = ball_data.x + "px";
    ball.style.top = ball_data.y + "px";

    // update_speed(ball_data.x, ball_data.y);
    update_speed();

    // update ball position during drop
    current_ball_coordinates(ball, main);

    // requestAnimationFrame(update_position);
  } else {
    ball_data.gravitySpeed = 0;
    ball_data.y = ground - ball.clientWidth;
  }

  console.log("HERE!");
}
