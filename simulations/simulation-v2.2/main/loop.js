import { balls_data, state } from "../ball/ball.config.js";
import { movement } from "../ball/modules/movement.js";

// import { update_position } from "./modules/update_position.js";
import { update_speed } from "../ball/modules/update_speed.js";


const init_first_ball = () => {
  const ball = document.querySelector(".main-container .balls .ball");
const shadow_ball = document.querySelector(".main-container .balls .shadow-ball");

  ball.style.left = `${state.active_ball.x}px`;
ball.style.top = `${state.active_ball.y}px`;

shadow_ball.style.left = `${state.active_ball.x}px`;
shadow_ball.style.top = `${state.active_ball.y}px`;

shadow_ball.querySelector(".angle-line").style.transform  = `rotate(${360 - (state.active_ball.direction_angle - 90)}deg)`;
}



init_first_ball();

const balls = document.querySelectorAll(".main-container .balls .ball");

const main = document.querySelector(".main-container");


let last_time = performance.now();

const simulationLoop = () => {
  const current_tme = performance.now();
  const dt = (current_tme - last_time) / 1000;
  last_time = current_tme;

    balls_data.forEach(element => {
      
      if (!element.animation_moving) return 
        
          const angle = element.direction_angle * Math.PI / 180;
          movement(main, element.dom_element,element, dt, angle);
    
        element.dom_element.style.left = (element.x) + "px";
        element.dom_element.style.top = (element.y) + "px";
      });

  // update
  requestAnimationFrame(simulationLoop);
};
simulationLoop();
