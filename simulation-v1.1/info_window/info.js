// info container
const info = document.querySelector(".windows .info");
  const main = document.querySelector(".main-container");


document.addEventListener("DOMContentLoaded", () => {
  const ball = document.querySelector(".ball");
  const ui = document.querySelector(".ui");

  //  info  about cell quantity
  cell_info(ui);

  // info about ball location (x and y)
  current_ball_coordinates(ball, main);
});

export function current_ball_coordinates(ball, main) {
  const ballRect = ball.getBoundingClientRect();
  const mainRect = main.getBoundingClientRect();

  let location_info = document.querySelector(" .info .ball-info");

  if (!location_info) {
    location_info = document.createElement("p");
    location_info.classList.add("ball-info");
    info.appendChild(location_info);
  }

  const x = Math.floor(ballRect.left - mainRect.left);
  const y = Math.floor(ballRect.top - mainRect.top);


  // console.log("Offsets:  ====>>> ", x, "   ", y);
  location_info.textContent = `Ball localtion: x: ${x}, y: ${y}`;
}

const cell_info = (ui) => {
  const quantity = parseInt(ui.getAttribute("data-grid"));
  const quantity_info = document.createElement("p");
  quantity_info.textContent = `Grid: ${quantity} x ${quantity}`;
  info.appendChild(quantity_info);
};

export function ball_speed_info(speed) {


  let speed_info = document.querySelector(" .info .speed-info");

  if (!speed_info) {
    speed_info = document.createElement("p");
    speed_info.classList.add("speed-info");
    info.appendChild(speed_info);
  }

  speed_info.textContent = `Speed: ${Math.floor(speed)} px per second`;
}

export function info_message(mess) {

  const message = document.createElement("p");
  message.textContent = `${mess}`;
  message.style.color = "red";
  message.style.fontSize = "2rem";
  message.style.position = "absolute";
  message.style.width = "100%";
  
  message.style.placeSelf= "center";
  message.style.textAlign= "center";


  main.appendChild(message);
  setTimeout(() => {
    main.removeChild(message);
  }, 1000)
}


export function info_current_movement_type(mess) {

  const message = document.createElement("p");
  message.textContent = `${mess}`;
  message.style.color = "black";
  message.style.fontSize = "2rem";
  message.style.right = "2rem";
  message.style.bottom = "2rem";
  message.style.position = "absolute";
  message.style.transition = "all .3s ease";

  main.appendChild(message);
  setTimeout(() => {
    main.removeChild(message);
  }, 300)
}