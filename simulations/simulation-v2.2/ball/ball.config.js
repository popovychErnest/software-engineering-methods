const ball = document.querySelector(".main-container .ball");
const shadow_ball = document.querySelector(".main-container .shadow-ball");



const ball_data = {
  // ball pos
  dom_element: ball,
  dom_shadow_element: shadow_ball,
  
  id: 0,
  x: Math.floor(Math.random() * (600 - 10) + 10),
  y: Math.floor(Math.random() * (600 - 10) + 10),

  offsetX: 0,
  offsetY:0,

  //   calculate speed
  last_position: { x: 0, y: 0 },
  last_time: performance.now(),

  initial_speed: 250,
  direction_angle: Math.floor(Math.random() * (360 - 0) + 0),

  fly_start_time: 0,
  fly_end_time: 0,
  fly_time: null,

  max_altitude: 0,

  fly_distance: 0,
  trajectory_length: 0,

  speedX: 0,
  speedY: 0,
  speed_acceleration: 200,
  gravity: 98,

  // states
  hitted_wall: false,
  dropped: true,
  user_moving: false,
  animation_moving: false,
  movement_type: "",
};

export const state = {
  active_ball: ball_data
};


export const balls_data = [];
balls_data.push(ball_data);