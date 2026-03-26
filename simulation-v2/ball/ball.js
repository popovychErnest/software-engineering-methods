import { ball_data } from "./ball.config.js";
import { movement } from "./modules/movement.js";

// import { update_position } from "./modules/update_position.js";
import { update_speed } from "./modules/update_speed.js";

const ball = document.querySelector(".main-container .ball");
const main = document.querySelector(".main-container");

const [x_input, y_input] = document.querySelectorAll(
  ".coordinate-inputs input",
);

const simulationLoop = () => {

  if (ball_data.animation_moving) {
    const currentTime = performance.now();
      if (ball_data.x == 0 && ball_data.y == 0) 
      {
        ball_data.x = x_input.value;
      ball_data.y = y_input.value;
      }

    const dt = (currentTime - ball_data.last_time) / 1000;
    const angle = ball_data.direction_angle * Math.PI / 180;

    movement(main, ball, dt, angle);
    ball.style.left = (ball_data.x) + "px";
    ball.style.top = (ball_data.y) + "px";
  }

  // update
  requestAnimationFrame(simulationLoop);
};
simulationLoop();
