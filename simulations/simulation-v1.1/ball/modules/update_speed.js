import { ball_speed_info } from "../../info_window/info.js";
import { ball_data } from "../ball.config.js";

export function update_speed() {
  let currentTime = performance.now();

  // delta time
  const dt = (currentTime - ball_data.lastTime) / 1000;
  // console.log("DELTA TIME   ====>> ", dt);

 

  // get distance
  const distanceX = ball_data.x - ball_data.lastPosition.x;
  const distanceY = ball_data.y - ball_data.lastPosition.y;

  

// Pythagoras formula of speed vector
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // console.log("DISTANCE ====>> ", distance);

// calculate speed
  const speed = distance / dt;

//   console.log(currentTime);
//   console.log(ball_data.lastTime);
 

  // update last time and position
  ball_data.lastTime = currentTime;
  ball_data.lastPosition = {x:ball_data.x, y:ball_data.y};

  ball_speed_info(speed);
}


// ball_data.speedX = distanceX / dt;
  // ball_data.speedY = distanceY / dt;
