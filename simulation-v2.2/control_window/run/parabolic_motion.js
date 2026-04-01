import { state } from "../../ball/ball.config.js";
import { info_current_movement_type } from "../../info_window/info.js";

export function parabolic_motion( speed, angle, gravity, ball, init_x = null, init_y = null) {
  if (init_x && init_y) {
    ball.x = init_x;
    ball.y = init_y;
  }
  if (!ball) return

    ball.dom_element.style.top = ball.y + "px";
    ball.dom_element.style.left = ball.x + "px"

  ball.animation_moving = true;
  ball.movement_type = "parabolic motion";
  info_current_movement_type(ball.movement_type);

  const angle_radians = (angle * Math.PI) / 180;

  ball.initial_speed = speed;
  ball.direction_angle = angle;
  ball.gravity = gravity;


  ball.fly_start_time = performance.now();
  ball.fly_time = null;

  ball.max_altitude = ball.y;

  
ball.dom_shadow_element.querySelector(".angle-line").style.transform  = `rotate(${360 - (angle - 90)}deg)`;

  ball.trajectory_length = 0;
  ball.fly_distance = 0;

  ball.hitted_wall = false;

  ball.last_position = { x: ball.x, y: ball.y };

  ball.speedX = ball.initial_speed * Math.cos(angle_radians);
  ball.speedY = ball.initial_speed * Math.sin(angle_radians);

  ball.last_time = performance.now();
}
