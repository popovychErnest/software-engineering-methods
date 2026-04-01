
export const ball_data = {
  // ball pos
  x: 100,
  y: 500,

  offsetX: 0,
  offsetY:0,


  //   calculate speed
  lastPosition: { x: 0, y: 0 },
  lastTime: performance.now(),

  initial_speed: 25,
  direction_angle: 0,

  speedX: 0,
  speedY: 0,
  speed_acceleration: 1.1,

  // states
  dropped: true,
  user_moving: false,
  animation_moving: false,
  movement_type: "",
};