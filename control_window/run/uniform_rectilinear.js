import { ball_data } from "../../ball/ball.config.js";
import { info_current_movement_type } from "../../info_window/info.js";

export function uniform_rectilinear (init_x, init_y) {
    ball_data.animation_moving = !ball_data.animation_moving;
    ball_data.movement_type = "uniform rectilinear";
    info_current_movement_type(ball_data.movement_type);

    ball_data.x = init_x;
    ball_data.y = init_y;

    const main = document.querySelector(".main-container");
    main.style.transition = "all 0.3s ease";
    main.style.transform = "scale(1.3)";
}

