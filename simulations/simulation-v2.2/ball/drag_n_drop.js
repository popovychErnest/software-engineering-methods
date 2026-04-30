import { current_ball_coordinates, info_current_movement_type, info_message } from "../info_window/info.js";
import { update_speed } from "./modules/update_speed.js";
import { balls_data, state } from "./ball.config.js";

const balls_container = document.querySelector(".main-container .balls");

const balls = document.querySelectorAll(".main-container .balls .ball");
const main = document.querySelector(".main-container");


const [x_input, y_input] = document.querySelectorAll(".coordinate-inputs input");


//     shadow_ball.style.top = parseInt(ball_data.y) +"px";
//     shadow_ball.style.left = parseInt(ball_data.x) +"px";



// x_input.addEventListener("input", (e) => {
//     shadow_ball.style.left = parseInt(e.target.value || ball_data.x) +"px";
// })

// y_input.addEventListener("input", (e) => {
//     shadow_ball.style.top = parseInt(e.target.value || ball_data.y) +"px";
// })


// drag n drop
// --------------------------------------------------------
// ball.addEventListener("mousedown", mouse_down);

document.addEventListener("mousedown", (e) => {
  const target = e.target.closest(".ball");
  if (!target) return;


  console.log("target: ", target);
  
  const ball = balls_data.find(ball => ball.dom_element === target);
  console.log("ball: ", ball)
  if (!ball) return;


  info_current_movement_type(`Ball #${ball.id}: Drag n Drop`);
  state.active_ball = ball;
  
  console.log("ACTIVE: ", state.active_ball)
  


  ball.dropped = false;
  ball.animation_moving = false;

  const ball_rect = ball.dom_element.getBoundingClientRect();
  ball.offsetX = e.clientX - ball_rect.left;
  ball.offsetY = e.clientY - ball_rect.top;

  state.active_ball.dom_shadow_element.style

  document.addEventListener("mousemove", mouse_move);
  document.addEventListener("mouseup", mouse_up);
})


// function mouse_down(e) {

//   ball_data.dropped = false;
//   ball_data.animation_moving = false;


//   const ballRect = ball.getBoundingClientRect();

//   // get init location
//   ball_data.offsetX = e.clientX - ballRect.left;
//   ball_data.offsetY = e.clientY - ballRect.top;

//   // get mouse location in ball

//   // console.log("offset ball x: ==> ", ball_data.offsetX);
//   // console.log("offset ball y: ==> ", ball_data.offsetY);


//   document.addEventListener("mousemove", mouse_move);
//   document.addEventListener("mouseup", mouse_up);
// }

function mouse_move(e) {

  const parentRect = main.getBoundingClientRect();
  if(!state.active_ball) return 
  
  state.active_ball.dropped = false;


  state.active_ball.user_moving = true;
  state.active_ball.animation_moving = false;

  state.active_ball.x = e.clientX - parentRect.left - state.active_ball.offsetX;
  state.active_ball.y = e.clientY - parentRect.top - state.active_ball.offsetY;

  x_input.value = Math.floor(state.active_ball.x);
  y_input.value = Math.floor(state.active_ball.y);

  if (state.active_ball.x < 0 || state.active_ball.y < 0 || state.active_ball.y > main.offsetHeight || state.active_ball.x > main.offsetHeight) {
    info_message(`Ball #${state.active_ball.id}: Out of bounds`);
  }

  // ball
  state.active_ball.dom_element.style.left = state.active_ball.x + "px";
  state.active_ball.dom_element.style.top = state.active_ball.y + "px";
  // shadow
  state.active_ball.dom_shadow_element.style.left = state.active_ball.x + "px";
  state.active_ball.dom_shadow_element.style.top = state.active_ball.y + "px";


  update_speed();
  current_ball_coordinates(state.active_ball.dom_element, main);
}
function mouse_up() {
  
  state.active_ball.dropped = true;

  // ball_data.animation_moving = false;
  state.active_ball.user_moving = false;

   state.active_ball.last_position = { x: state.active_ball.x, y: state.active_ball.y };
  document.removeEventListener("mousemove", mouse_move);
}
// --------------------------------------------------------
