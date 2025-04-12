const elemAnimations = [
  {
    elemId: "greeting",
    from: {
      autoAlpha: 0,
      y: 30,
    },
    to: {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    },
  },
  {
    elemId: "memory",
    from: {
      autoAlpha: 0,
      y: 30,
    },
    to: {
      autoAlpha: 1,
      y: 0,
      duration: 5,
      ease: "power2.out",
    },
  },
  {
    elemId: "memory1Img",
    from: {
      autoAlpha: 0,
      scale: 2, // Start from scale 2
    },
    to: {
      autoAlpha: 1,
      scale: 1, // Animate to scale 1
      duration: 1,
      ease: "power2.out",
    },
  },
  {
    elemId: "memory2Img",
    from: {
      autoAlpha: 0,
      scale: 2, // Start from scale 2
    },
    to: {
      autoAlpha: 1,
      scale: 1, // Animate to scale 1
      duration: 1,
      ease: "power2.out",
    },
  },
  {
    elemId: "birthday",
    from: {
      autoAlpha: 0,
      y: 30,
    },
    to: {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    },
  },
  {
    elemId: "chat",
    from: {
      autoAlpha: 0,
      y: 30,
    },
    to: {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    },
  },
];

export default elemAnimations;
