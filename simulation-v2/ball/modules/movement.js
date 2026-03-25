import {
  current_ball_coordinates,
  info_message,
  parabolic_info_message,
} from "../../info_window/info.js";
import { smooth_fade } from "../../ui/ui.js";
import { ball_data } from "../ball.config.js";
import { update_speed } from "./update_speed.js";
// import { update_speed } from "./update_speed.js";

const ui_container = document.querySelector(".ui");
const tail = document.querySelector(".ui .tail");

const [x_input, y_input] = document.querySelectorAll(
  ".coordinate-inputs input",
);

export function movement(main, ball, dt, angle) {
  const ground = main.offsetHeight - ball.offsetHeight;
  const wall = main.offsetWidth - ball.offsetWidth;

  ball_data.trail_timer += dt;

    const el = document.createElement("div");
    el.className = "ball-trail";
    el.style.background = "gray";
    el.style.position = "absolute";
    el.style.left = `${ball_data.x + ball.offsetHeight/2}px`;
    el.style.top = `${ball_data.y + ball.offsetWidth /2}px`;
    el.style.borderRadius = "10rem";
    el.style.width = "4px";
    el.style.aspectRatio = "1/1";
    tail.appendChild(el);

    if(tail.querySelectorAll(".ball-trail").length > 150) {
    tail.firstChild.remove();
    }

  if (ball_data.movement_type == "uniformly accelerated rectilinear") {
    ball_data.speedX += ball_data.speed_acceleration * Math.cos(angle) * dt;
    ball_data.speedY += ball_data.speed_acceleration * Math.sin(angle) * dt;
  }
  if (ball_data.movement_type == "uniform rectilinear") {
    ball_data.speedX = ball_data.initial_speed * Math.cos(angle);
    ball_data.speedY = ball_data.initial_speed * Math.sin(angle);

    if (ball_data.x == 0 || ball_data.y == 0) {
      ball_data.speedX = 0;
      ball_data.speedY = 0;
      ball_data.animation_moving = false;
    }
  }

  if (ball_data.movement_type == "parabolic motion") {
    ball_data.speedY -= ball_data.gravity * 10 * dt;
    // ball_data.speedX *= 0.998;

    if (ball_data.max_altitude > ball_data.y) {
      ball_data.max_altitude = ball_data.y;
    }
   
    if (ball_data.y >= ground) {
      if (ball_data.fly_time == null) {
      ball_data.fly_end_time = performance.now();
        ball_data.fly_time = (ball_data.fly_end_time - ball_data.fly_start_time) / 1000;
      }
      
      ball_data.speedY -= ball_data.gravity * -20 * dt;
      ball_data.speedX *= 0.98;


      if (
        Math.abs(ball_data.speedY) < ball_data.gravity / 7 &&
        Math.abs(ball_data.speedX) < ball_data.gravity / 7
      ) {
        ball_data.speedX = 0;
        ball_data.speedY = 0;
        update_speed();
        ball_data.animation_moving = false;

        ball_data.max_altitude = y_input.value - ball_data.max_altitude;
        parabolic_info_message([`Max altitude: ${ball_data.max_altitude.toFixed(2)} px`, `Fly time: ${ball_data.fly_time.toFixed(2)} s`,`Trajectory distance: ${(ball_data.trajectory_length - ball.offsetHeight).toFixed(2)} px`, `Fight range: ${(ball_data.fly_distance).toFixed(2)} px` ] );

        smooth_fade();
        return;
      
      }
    }

    if (ball_data.x <= 0) {
      ball_data.x = 0;
      ball_data.speedX *= -0.9;
      ball_data.hitted_wall = true;
    }
    if (ball_data.x >= wall) {
      ball_data.x = wall;
      ball_data.speedX *= -0.9;
      ball_data.hitted_wall = true;

    }
    if (ball_data.y <= 0) {
      ball_data.y = 0;
      ball_data.speedY *= -1;
      ball_data.hitted_wall = true;

    }
    if (ball_data.y >= ground) {
      ball_data.y = ground;
      ball_data.speedY *= -0.9;
      ball_data.hitted_wall = true;
    }
  }
  ball_data.x += ball_data.speedX * dt;
  ball_data.y -= ball_data.speedY * dt;
  current_ball_coordinates(ball, main);
  update_speed();
  if (
    (ball_data.x >= ground ||
      ball_data.y <= 0 ||
      ball_data.y >= ground ||
      ball_data.x <= 0) &&
    ball_data.movement_type !== "parabolic motion"
  ) {
    ball_data.speedX = 0;
    ball_data.speedY = 0;

    ball_data.movement_type = "";
    ball_data.animation_moving = false;

    const main = document.querySelector(".main-container");
    main.style.transform = "scale(1)";

    info_message("Replace the ball!");
    current_ball_coordinates(ball, main);
    update_speed();

    return;
  }
}