
export const ball_data = {
  // ball pos
  x: 100,
  y: 500,

  offsetX: 0,
  offsetY:0,


  //   calculate speed
  lastPosition: { x: 0, y: 0 },
  lastTime: performance.now(),
  speed: 0,


  speedX: 5,
  speedY: -5,

  // gravity: 0.05,
  // gravitySpeed: 0,

  // states
  dropped: true,
  user_moving: false,
  animation_moving: false,
  movement_type: "",

};