import {
  current_ball_coordinates,
  info_message,
  parabolic_info_message,
} from "../../info_window/info.js";
import { smooth_fade } from "../../ui/ui.js";
// import {  } from "../ball.config.js";
import { update_speed } from "./update_speed.js";
// import { update_speed } from "./update_speed.js";
import { balls_data } from "../ball.config.js";
import { tail_reflection } from "../../ui/tail.js";



export function movement(main, ball_dom, ball, dt, angle) {
  const ground = main.offsetHeight - ball_dom.offsetHeight;
  const wall = main.offsetWidth - ball_dom.offsetWidth;

  if (ball.movement_type == "uniformly accelerated rectilinear") {
    ball.speedX += ball.speed_acceleration * Math.cos(angle) * dt;
    ball.speedY += ball.speed_acceleration * Math.sin(angle) * dt;
  }
  if (ball.movement_type == "uniform rectilinear") {
    ball.speedX = ball.initial_speed * Math.cos(angle);
    ball.speedY = ball.initial_speed * Math.sin(angle);

    if (ball.x == 0 || ball.y == 0) {
      ball.speedX = 0;
      ball.speedY = 0;
      ball.animation_moving = false;
    }
  }

  if (ball.movement_type == "parabolic motion") {
    ball.speedY -= ball.gravity * 10 * dt;
    // ball.speedX *= 0.998;

    if (ball.max_altitude > ball.y) {
      ball.max_altitude = ball.y;
    }

    if (ball.y >= ground) {
      if (ball.fly_time == null) {
        ball.fly_end_time = performance.now();
        ball.fly_time = (ball.fly_end_time - ball.fly_start_time) / 1000;
      }

      ball.speedY -= ball.gravity * -20 * dt;
      ball.speedX *= 0.98;

      const is_on_ground = ball.y >= ground - 0.5;

      if (
        is_on_ground &&
        Math.abs(ball.speedY) < ball.gravity / 7 &&
        Math.abs(ball.speedX) < ball.gravity / 7
      ) {
        ball.speedX = 0;
        ball.speedY = 0;

        if (balls_data.length <= 1) {
          update_speed();
        }

        ball.animation_moving = false;

        const shadow_rect = ball.dom_shadow_element.getBoundingClientRect();

        ball.max_altitude = (shadow_rect.top - main.getBoundingClientRect().top) - ball.max_altitude;
        if (balls_data.length <= 1) {
          parabolic_info_message([
            `Max altitude: ${ball.max_altitude.toFixed(2)} px`,
            `Fly time: ${ball.fly_time.toFixed(2)} s`,
            `Trajectory distance: ${(ball.trajectory_length - ball_dom.offsetHeight).toFixed(2)} px`,
            `Fight range: ${ball.fly_distance.toFixed(2)} px`,
          ]);
        }
        smooth_fade();
        return;
      }
    }




// trail


    // tail_reflection()S


    if (ball.x <= 0) {
      ball.x = 0;
      ball.speedX *= -0.9;
      ball.hitted_wall = true;
    }
    if (ball.x >= wall) {
      ball.x = wall;
      ball.speedX *= -0.9;
      ball.hitted_wall = true;
    }
    if (ball.y <= 0) {
      ball.y = 0;
      ball.speedY *= -1;
      ball.hitted_wall = true;
    }
    if (ball.y >= ground) {
      ball.y = ground;
      ball.speedY *= -0.9;
      ball.hitted_wall = true;
    }
  }
  ball.x += ball.speedX * dt;
  ball.y -= ball.speedY * dt;
  current_ball_coordinates(ball_dom, main);

  if (balls_data.length <= 1) {
    update_speed();
  }

  if (
    (ball.x >= ground || ball.y <= 0 || ball.y >= ground || ball.x <= 0) &&
    ball.movement_type !== "parabolic motion"
  ) {
    ball.speedX = 0;
    ball.speedY = 0;

    ball.movement_type = "";
    ball.animation_moving = false;

    const main = document.querySelector(".main-container");
    main.style.transform = "scale(1)";

    info_message("Replace the ball!");
    current_ball_coordinates(ball_dom, main);
    update_speed();

    return;
  }
}
