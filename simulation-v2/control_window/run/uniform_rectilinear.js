import { ball_data } from "../../ball/ball.config.js";
import { info_current_movement_type } from "../../info_window/info.js";

export function uniform_rectilinear (init_x, init_y, speed) {
    ball_data.animation_moving = true;
    ball_data.movement_type = "uniform rectilinear";
    info_current_movement_type(ball_data.movement_type);

    ball_data.initial_speed = speed;
    // const angle_radians = angle * Math.PI / 180;


    ball_data.x = init_x;
    ball_data.y = init_y;



  ball_data.fly_time = null;

    ball_data.max_altitude = ball_data.y;



    ball_data.trajectory_length = 0;
    ball_data.fly_distance = 0;


        ball_data.hitted_wall = false;

    // ball_data.speedX = ball_data.initial_speed;
    // ball_data.speedY = ball_data.initial_speed;

        ball_data.last_time = performance.now();
}

