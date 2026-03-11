// import { ball_data } from "../ball/ball/.config.js";

const ui_container = document.querySelector(".ui");
ui_container.style.userSelect = "none";
const grid_size = parseInt(ui_container.getAttribute("data-grid"));

console.log(grid_size);
console.log(typeof grid_size);






for (let  i = 0;  i  < (grid_size * grid_size); i++) {
    const cell = document.createElement("div");

    // cell.textContent = `${i+1}`
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
    numeration.style.bottom = "-50px";
    numeration.style.left = "-20px";
    numeration.style.border = "none";
    numeration.style.fontSize = "1.5rem"



    numeration.textContent = "0";
    ui_container.appendChild(numeration);
     

ui_container.appendChild(bottom_num_bar)
ui_container.appendChild(left_num_bar)


ui_container.style.setProperty("--grid", grid_size);



