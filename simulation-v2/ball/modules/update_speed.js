import { ball_speed_info } from "../../info_window/info.js";
import { ball_data } from "../ball.config.js";

export function update_speed() {
  let currentTime = performance.now();

  // delta time
  const dt = (currentTime - ball_data.last_time) / 1000;

  // get distance
  const distanceX = ball_data.x - ball_data.last_position.x;
  const distanceY = ball_data.y - ball_data.last_position.y;

// Pythagoras formula of speed vector
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  ball_data.trajectory_length += distance;
  if (!ball_data.hitted_wall) {
    ball_data.fly_distance += distance;

    console.log("FLY DISTANCE: ", ball_data.fly_distance)
  }

// calculate speed
  const speed = distance / dt;

  // update last time and position
  ball_data.last_time = currentTime;
  ball_data.last_position = {x:ball_data.x, y:ball_data.y};

    ball_speed_info(speed);
  }