// Import the data to customize and insert them into page
const textarea = document.querySelector(".hbd-chatbox");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto"; // reset height
  textarea.style.height = `${textarea.scrollHeight}px`; // set to new scrollHeight
});
const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      dataArr = Object.keys(data);
      dataArr.map((customData) => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData]);
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`)
              ? (document.querySelector(
                  `[data-node-name*="${customData}"]`
                ).innerText = data[customData])
              : console.log(`[data-node-name*="${customData}"]`);
          }
        }

        // Check if the iteration is over
        // Run amimation if so
        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          animationTimeline();
        }
      });
    });
};

// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  const tl = new TimelineMax();

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )

    .from("#memory", 0.7, {
      opacity: 0,
    })
    .to("#memory-text", 5, {
      opacity: 1,
    })
    .to("#memory-text", 1, {
      display: "none",
    })

    .to("#memory-images", 0.2, {
      display: "flex",
    })
    .from("#img1", 0.2, {
      scale: 2,
      opacity: 0,
    })
    .from("#img2", 0.2, {
      scale: 2,
      opacity: 0,
    })

    .to("#img1", 0.7, {
      scale: 1,
      opacity: 1,
    })
    .to("#img2", 0.7, {
      scale: 1,
      opacity: 1,
      rotate: 15,
    })
    .to("#memory-images", 0.7, {
      display: "none",

      scale: 1,
      opacity: 1,
      rotate: 15,
    })
    .to("#memory", 0.7, {
      opacity: 0,
    })

    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .to(".keyboard-img", 0, {
      display: "block",
    })
    .from(".keyboard-img", 1, {
      opacity: 0,
      y: 50,
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        display: "inline",
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)",
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=0.7"
    )
    .from(".idea-1", 2, ideaTextTrans)
    .to(".idea-1", 2, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 2, ideaTextTrans)
    .to(".idea-2", 2, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 2, ideaTextTrans)
    .to(".idea-3 strong", 2, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=0.5"
    )
    .to(
      ".idea-5 .smiley",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.2,
      "+=1"
    )
    .to(".baloons", 2.5, {
      display: "block",
    })
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.2
    )
    .to(".lydia-dp", 0.5, {
      opacity: 1,
    })
    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -45,
      y: 101,
      rotation: 75,
      opacity: 0,
    })
    .to(".wish-hbd", 0.5, {
      opacity: 1,
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90,
      },
      "+=1"
    )
    .to(".last", 0.5, {
      opacity: 1,
    });

  // tl.seek("currentStep");
  // tl.timeScale(2);
};

// Run fetch and animation in sequence
fetchData();
