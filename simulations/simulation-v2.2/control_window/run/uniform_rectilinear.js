import { state } from "../../ball/ball.config.js";
import { info_current_movement_type } from "../../info_window/info.js";

export function uniform_rectilinear (init_x, init_y, speed) {
    state.active_ball.animation_moving = true;
    state.active_ball.movement_type = "uniform rectilinear";
    info_current_movement_type(state.active_ball.movement_type);

    state.active_ball.initial_speed = speed;
    // const angle_radians = angle * Math.PI / 180;


    state.active_ball.x = init_x;
    state.active_ball.y = init_y;


  state.active_ball.fly_time = null;

    state.active_ball.max_altitude = state.active_ball.y;



    state.active_ball.trajectory_length = 0;
    state.active_ball.fly_distance = 0;


        state.active_ball.hitted_wall = false;

    // state.active_ball.speedX = state.active_ball.initial_speed;
    // state.active_ball.speedY = state.active_ball.initial_speed;

        state.active_ball.last_time = performance.now();
}

