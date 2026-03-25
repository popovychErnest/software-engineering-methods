import { ball_data } from "../../ball/ball.config.js";
import { info_current_movement_type } from "../../info_window/info.js";

export function uniformly_accelerated_rectilinear(
  init_x,
  init_y,
  speed,
  acceleration,
  angle,
) {
  ball_data.animation_moving = true;
  ball_data.movement_type = "uniformly accelerated rectilinear";
  info_current_movement_type(ball_data.movement_type);

  ball_data.initial_speed = speed;
  ball_data.direction_angle = angle;
  ball_data.speed_acceleration = acceleration;

  ball_data.x = init_x;
  ball_data.y = init_y;

  const angle_radians = (angle * Math.PI) / 180;



  ball_data.fly_time = null;

    ball_data.max_altitude = ball_data.y;


    ball_data.trajectory_length = 0;
    ball_data.fly_distance = 0;

        ball_data.hitted_wall = false;

  ball_data.speedX = ball_data.initial_speed * Math.cos(angle_radians);
  ball_data.speedY = ball_data.initial_speed * Math.sin(angle_radians);

  ball_data.last_time = performance.now();
}
