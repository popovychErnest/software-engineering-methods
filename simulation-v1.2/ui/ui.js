// import { ball_data } from "../ball/ball/.config.js";

const ui_container = document.querySelector(".ui");
const main = document.querySelector(".main-container");

ui_container.style.userSelect = "none";
const grid_size = parseInt(ui_container.getAttribute("data-grid"));


for (let  i = 0;  i  < (grid_size * grid_size); i++) {
    const cell = document.createElement("div");
    cell.className = "grid-cell";

    ui_container.appendChild(cell);
}


const bottom_num_bar = document.createElement("div");
const left_num_bar = document.createElement("div");

bottom_num_bar.classList.add("num-bar", "bottom-num-bar");
left_num_bar.classList.add("num-bar", "left-num-bar");

for (let  i = 1;  i  <= (grid_size); i++) { 
    const numeration = document.createElement("p");
    numeration.textContent = `${i}`
    bottom_num_bar.appendChild(numeration);
}

for (let  i = grid_size;  i  >= 1; i--) {
    const numeration = document.createElement("p");
    numeration.textContent = `${i}`
    left_num_bar.appendChild(numeration);
}

    const numeration = document.createElement("p");
    numeration.style.position = "absolute"
    numeration.style.bottom = "-70px";
    numeration.style.left = "5px";
    numeration.style.border = "none";
    numeration.style.fontSize = "1.5rem"


    numeration.style.zIndex = `100000`

    numeration.textContent = "0";
    ui_container.appendChild(numeration);
     

ui_container.appendChild(bottom_num_bar)
ui_container.appendChild(left_num_bar)


ui_container.style.setProperty("--grid", grid_size);


// direction line for shadow line

const shadow_ball = main.querySelector(".shadow-ball");
    shadow_ball.querySelector(".angle-line").style.transform = `rotate(90deg)`


function direction_angle_line(e) {
        
    // shadow_ball.style.transform = `rotate(${parseInt(e.target.value)}deg)`;
    shadow_ball.querySelector(".angle-line").style.transform = `rotate(${360-(parseInt(e.target.value)-90)}deg)`

}
const angle_input = document.querySelector(".angle-input") 
angle_input.addEventListener("input", direction_angle_line);



const switch_theme = document.querySelector(".switch-theme");
switch_theme.addEventListener("click", () => {
    const theme = document.body.getAttribute("data-theme");
    document.body.setAttribute("data-theme", theme === "white" ? "black" : "white");
    document.body.style.filter =  theme === "white" ? "invert(0)" : "invert(1)";
    document.body.style.background = theme;
});

export const smooth_fade = () => {
  ui_container.querySelectorAll(".ball-trail").forEach((el) => {
    el.style.transition = "opacity 0.5s linear";
    el.style.opacity = "1";

    setTimeout(() => {
      el.style.opacity = "0";
    }, 10);

    setTimeout(() => {
      el.remove();
    }, 500);
  });
};
 


