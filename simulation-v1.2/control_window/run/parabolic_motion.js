import { ball_data } from "../../ball/ball.config.js";
import { info_current_movement_type } from "../../info_window/info.js";

export function parabolic_motion(init_x, init_y, speed, angle, gravity) {
  ball_data.animation_moving = true;
  ball_data.movement_type = "parabolic motion";
  info_current_movement_type(ball_data.movement_type);

  const angle_radians = (angle * Math.PI) / 180;

  ball_data.initial_speed = speed;
  ball_data.direction_angle = angle;
  ball_data.gravity = gravity;

  ball_data.x = init_x;
  ball_data.y = init_y;

  ball_data.fly_start_time = performance.now();
  ball_data.fly_time = null;

  ball_data.max_altitude = ball_data.y;

  ball_data.trajectory_length = 0;
  ball_data.fly_distance = 0;

  ball_data.hitted_wall = false;

  ball_data.last_position = { x: ball_data.x, y: ball_data.y };

  ball_data.speedX = ball_data.initial_speed * Math.cos(angle_radians);
  ball_data.speedY = ball_data.initial_speed * Math.sin(angle_radians);

  ball_data.last_time = performance.now();
}
