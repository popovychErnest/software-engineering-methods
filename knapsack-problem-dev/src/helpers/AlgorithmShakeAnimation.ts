export const animation = {
  init: {
    rotate: 0,
    x: 0,
  },

  shake: {
    rotate: [-5, 5, -2, 2, 0],

    transition: {
      duration: 0.4,
    },
  },
};
export const handleTextAppear =(windowRef: React.RefObject<HTMLDivElement | null>) => {
    if(!windowRef) return;

     const text_appear = {
      hidden: {
        opacity: 0,
        y: 0,
        x: windowRef.current?.offsetWidth,
      },
    
      visible: {
        x: windowRef.current?.offsetWidth,
        y: -100,
        opacity: [1,0],
        transition: {
          duration: .6,
        },
      },
    };

    return text_appear;
}