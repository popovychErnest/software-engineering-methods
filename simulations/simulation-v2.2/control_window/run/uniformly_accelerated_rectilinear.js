import { state } from "../../ball/ball.config.js";
import { info_current_movement_type } from "../../info_window/info.js";

export function uniformly_accelerated_rectilinear(
  
  speed,
  acceleration,
  angle,
  init_x,
  init_y,
) {
  state.active_ball.animation_moving = true;
  state.active_ball.movement_type = "uniformly accelerated rectilinear";
  info_current_movement_type(state.active_ball.movement_type);

  state.active_ball.initial_speed = speed;
  state.active_ball.direction_angle = angle;
  state.active_ball.speed_acceleration = acceleration;

  state.active_ball.dom_shadow_element.querySelector(".angle-line").style.transform = `rotate(${360-(parseInt(state.active_ball.direction_angle)-90)}deg)`

  state.active_ball.x = init_x;
  state.active_ball.y = init_y;
 
  const angle_radians = (angle * Math.PI) / 180;

  state.active_ball.fly_time = null;

  state.active_ball.max_altitude = state.active_ball.y;

  state.active_ball.trajectory_length = 0;
  state.active_ball.fly_distance = 0;

  state.active_ball.hitted_wall = false;

  state.active_ball.speedX = state.active_ball.initial_speed * Math.cos(angle_radians);
  state.active_ball.speedY = state.active_ball.initial_speed * Math.sin(angle_radians);

  state.active_ball.last_time = performance.now();
}
