import { ball_speed_info } from "../../info_window/info.js";
import {state } from "../ball.config.js";

export function update_speed() {
  let currentTime = performance.now();

  // delta time
  const dt = (currentTime - state.active_ball.last_time) / 1000;

  // get distance
  const distanceX = state.active_ball.x - state.active_ball.last_position.x;
  const distanceY = state.active_ball.y - state.active_ball.last_position.y;

// Pythagoras formula of speed vector
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  state.active_ball.trajectory_length += distance;
  if (!state.active_ball.hitted_wall) {
    state.active_ball.fly_distance += distance;

  }

  // calculate speed
  const speed = distance / dt;

  if (state.active_ball.movement_type == "uniformly accelerated rectilinear" && speed <= 5) {
    state.active_ball.speedX = 0;
    state.active_ball.speedY = 0;
    state.active_ball.animation_moving = false;
  }

  // update last time and position
  state.active_ball.last_time = currentTime;
  state.active_ball.last_position = {x:state.active_ball.x, y:state.active_ball.y};

    ball_speed_info(speed);
  }