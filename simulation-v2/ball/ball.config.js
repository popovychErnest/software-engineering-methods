
export const ball_data = {
  // ball pos
  x: 100,
  y: 500,

  offsetX: 0,
  offsetY:0,


  //   calculate speed
  last_position: { x: 0, y: 0 },
  last_time: performance.now(),

  initial_speed: 250,
  direction_angle: 0,

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