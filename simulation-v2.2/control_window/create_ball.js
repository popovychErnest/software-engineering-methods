import { balls_data, state } from "../ball/ball.config.js";
import { info_message, quantity_of_balls_info } from "../info_window/info.js";

const balls_container = document.querySelector(".main-container .balls");

export const generate_random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
};

export const create_ball = () => {
  if (balls_data.length >= 40) {
    info_message("Too many balls!");
    return;
  }
  const ball = document.createElement("div");
  ball.className = "ball";
  ball.style.color  = "red";
  ball.setAttribute("data-id", balls_data.length);
  ball.textContent = `#${balls_data.length}`;
  
  const shadow_ball = document.createElement("div");
  shadow_ball.className = "shadow-ball";
  shadow_ball.style.transform = "all .4s ease";
  shadow_ball.setAttribute("data-id", balls_data.length);
  
  const angle_line = document.createElement("div");
  angle_line.className = "angle-line";

  const x = generate_random(0, 600);
  const y = generate_random(0, 600);
  const angle = generate_random(0, 360);

  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;

  shadow_ball.style.left = `${x}px`;
  shadow_ball.style.top = `${y}px`;


  angle_line.style.transform = `rotate(${360 - (angle - 90)}deg)`;

  shadow_ball.appendChild(angle_line);
  balls_container.appendChild(shadow_ball);
  balls_container.appendChild(ball);

  const ball_data =  {
    dom_element: ball,
    dom_shadow_element: shadow_ball,
    
    id: balls_data.length,
    x: x,
    y: y,

    offsetX: 0,
    offsetY: 0,

    //   calculate speed
    last_position: { x: 0, y: 0 },
    last_time: performance.now(),

    initial_speed: 500,
    direction_angle: angle,

    fly_start_time: 0,
    fly_end_time: 0,
    fly_time: null,

    max_altitude: 0,

    fly_distance: 0,
    trajectory_length: 0,

    speedX: 0,
    speedY: 0,
    speed_acceleration: 200,
    gravity: 98,

    // states600
    hitted_wall: false,
    dropped: true,
    user_moving: false,
    animation_moving: false,
    movement_type: "",
  };

  balls_data.push(ball_data);
  quantity_of_balls_info(balls_data.length);

  state.active_ball = ball_data;
};