import { current_ball_coordinates, info_current_movement_type, info_message } from "../info_window/info.js";
import { ball_data } from "./ball.config.js";
import { movement } from "./modules/movement.js";

// import { update_position } from "./modules/update_position.js";
import { update_speed } from "./modules/update_speed.js";

const ball = document.querySelector(".main-container .ball");
const main = document.querySelector(".main-container");


const x_input = document.querySelectorAll(".coordinate-inputs input")[0];
const y_input = document.querySelectorAll(".coordinate-inputs input")[1];


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
  const ballRect = ball.getBoundingClientRect();

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


  // console.log("BALL OFFSETX ====> ", ball.offsetLeft);
  // console.log("BALL OFFSETY ====> ", ball.offsetTop);

  // update_position(ball_data, ball, main);
  update_speed();
  current_ball_coordinates(ball, main);
}

function mouse_up() {
  
  ball_data.dropped = true;

  ball_data.animation_moving = false;
  ball_data.user_moving = false;

   ball_data.lastPosition = { x: ball_data.x, y: ball_data.y };
  document.removeEventListener("mousemove", mouse_move);
}
// --------------------------------------------------------






const angle_input = document.querySelector(".angle-input");
// start_scene_button.addEventListener("click", start_moving);
angle_input.addEventListener("input", (e) => {
  ball_data.direction_angle = parseInt(e.target.value) ?? 0;
})

const simulationLoop = () => {
  
  
  
  if (ball_data.animation_moving) {
    // coor_inputs.forEach(item => item.disabled = true)
    const currentTime = performance.now();

    const dt = (currentTime - ball_data.lastTime) / 1000;
    const angle = ball_data.direction_angle * Math.PI / 180;

    console.log("BALL ANGLE: ", angle)

    movement(main, ball, dt, angle);
    ball.style.left = (ball_data.x) + "px";
    ball.style.top = (ball_data.y) + "px";
  }
  // update_speed()

  // ball.style.left = (ball_data.x) + "px";
  // ball.style.top = (ball_data.y) + "px";



  // update
  requestAnimationFrame(simulationLoop);
};
simulationLoop();



// const intertion = (ball_data, ball, main, e) => {
//   const currentTime = performance.now();
//   // delta
//   const dt = currentTime - ball_data.lastTime;

//   const newX = e.clientX;
//   const newY = e.clientY;

//   const velocityX = (newX - ball_data.lastPosition.x) / dt;
//   const velocityY = (newY - ball_data.lastPosition.y) / dt;

//   console.log("Velocity XX ===> ", velocityX);
//   console.log("Velocity YY ===> ", velocityY);

//   ball_data.x = newX - ball_data.offsetX;
//   ball_data.y = newY - ball_data.offsetY;

//   ball_data.speedX = velocityX * 2;
//   ball_data.speedY = velocityY * 2;

//   ball_data.lastPosition.x = newX;
//   ball_data.lastPosition.y = newY;
//   ball_data.lastTime = currentTime;
// };
