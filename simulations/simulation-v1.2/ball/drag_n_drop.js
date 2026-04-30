import { current_ball_coordinates, info_current_movement_type, info_message } from "../info_window/info.js";
import { update_speed } from "./modules/update_speed.js";
import { ball_data } from "./ball.config.js";
const ball = document.querySelector(".main-container .ball");
const main = document.querySelector(".main-container");



const [x_input, y_input] = document.querySelectorAll(
  ".coordinate-inputs input",
);

document.addEventListener("DOMContentLoaded", () => {
  x_input.value = 100;
  y_input.value = 600;

  ball_data.x = x_input.value;
  ball_data.y = y_input.value;


  shadow_ball.style.left = `${ball_data.x}px`;  
  shadow_ball.style.top = `${ball_data.y}px`;
  
  ball.style.left = `${ball_data.x}px`;
  ball.style.top = `${ball_data.y}px`;

  setTimeout(() =>{
    ball_data.direction_angle = 45;

    shadow_ball.querySelector(".angle-line").style.transform = `rotate(45deg)`

  }, 200)


  current_ball_coordinates(ball, main);

})

const shadow_ball = document.querySelector(".shadow-ball");

    shadow_ball.style.top = parseInt(ball_data.y) +"px";
    shadow_ball.style.left = parseInt(ball_data.x) +"px";



x_input.addEventListener("input", (e) => {
    shadow_ball.style.left = parseInt(e.target.value || ball_data.x) +"px";
})

y_input.addEventListener("input", (e) => {
    shadow_ball.style.top = parseInt(e.target.value || ball_data.y) +"px";
})


// drag n drop
// --------------------------------------------------------
ball.addEventListener("mousedown", mouse_down);

function mouse_down(e) {
  info_current_movement_type("Drag n drop");

  ball_data.dropped = false;
  ball_data.animation_moving = false;

  ball_data.gravitySpeed = 0;

  const ballRect = ball.getBoundingClientRect();

  // get init location
  ball_data.offsetX = e.clientX - ballRect.left;
  ball_data.offsetY = e.clientY - ballRect.top;

  // get mouse location in ball

  // console.log("offset ball x: ==> ", ball_data.offsetX);
  // console.log("offset ball y: ==> ", ball_data.offsetY);


  document.addEventListener("mousemove", mouse_move);
  document.addEventListener("mouseup", mouse_up);
}

function mouse_move(e) {

  const parentRect = main.getBoundingClientRect();

  ball_data.dropped = false;


  ball_data.user_moving = true;
  ball_data.animation_moving = false;

  ball_data.x = e.clientX - parentRect.left - ball_data.offsetX;
  ball_data.y = e.clientY - parentRect.top - ball_data.offsetY;

  x_input.value = Math.floor(ball_data.x);
  y_input.value = Math.floor(ball_data.y);

  if (ball_data.x < 0 || ball_data.y < 0 || ball_data.y > main.offsetHeight || ball_data.x > main.offsetHeight) {
    info_message("Out of bounds");
  }

  ball.style.left = ball_data.x + "px";
  ball.style.top = ball_data.y + "px";

   shadow_ball.style.left = (ball_data.x) + "px";
  shadow_ball.style.top = (ball_data.y) + "px";

  update_speed();
  current_ball_coordinates(ball, main);
}
function mouse_up() {
  
  ball_data.dropped = true;

  // ball_data.animation_moving = false;
  ball_data.user_moving = false;

   ball_data.last_position = { x: ball_data.x, y: ball_data.y };
  document.removeEventListener("mousemove", mouse_move);
}
// --------------------------------------------------------

const angle_input = document.querySelector(".angle-input");
angle_input.addEventListener("input", (e) => {
  ball_data.direction_angle = parseInt(e.target.value) ?? 0;
})