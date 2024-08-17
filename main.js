//getting DOM elements
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

//count of frames
const frames = {
  currentIndex: 0,
  maxIndex: 1345,
};

//total storage of images
const images = [];

//keeping track of loaded images
let imagesLoaded = 0;

function showpercentage(loaded) {
  const percentage = (loaded / frames.maxIndex) * 100;
  console.log(`Loading images... ${percentage.toFixed(0)}%`);
  document.querySelector("#percentLoaded").innerHTML = `${percentage.toFixed(
    0
  )}%`;
  document.querySelector(".loaderLine").style.width = `${percentage.toFixed(
    0
  )}%`;
}

//making a function to check, load and store all the images so website will run smoothly......
function preloadImages() {
  for (let i = 1; i <= frames.maxIndex; i++) {
    //setting images url...
    const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
    //creating image tag
    const image = new Image();
    image.src = imageUrl;

    //function to keep track on images loading
    image.onload = () => {
      imagesLoaded++;
      showpercentage(imagesLoaded);
      //function to execute tasks after successfull loading of images
      if (imagesLoaded === frames.maxIndex) {
        loadImage(frames.currentIndex);
        startAnimation();

        gsap.to(document.querySelector(".loader"), {
          //display: "none",
          opacity: 1,
          transform: "translateY(-100%)",
          duration: 1,
          ease: "ease",
        });
        //document.querySelector(".loader").style.display = "none";
        console.log("all images loaded successfully");
      }
    };

    //pushing the images into array
    images.push(image);
  }
}

//function to display and set images in canvas
function loadImage(index) {
  //checking if the image index is valid
  if (index >= 0 && index <= frames.maxIndex) {
    const image = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / image.width;
    const scaleY = canvas.height / image.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = image.width * scale;
    const newHeight = image.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, offsetX, offsetY, newWidth, newHeight);

    frames.currentIndex = index;
  }
}

function startAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
    },
  });

  function updateFrame(index) {
    return {
      currentIndex: index,
      ease: "linear",
      onUpdate: () => {
        loadImage(Math.floor(frames.currentIndex));
      },
    };
  }

  tl.to(frames, updateFrame(2), "same")
    .to(
      ".instruct",
      {
        opacity: 0,
        display: "none",
        ease: "linear",
      },
      "same"
    )
    .to(frames, updateFrame(10), "first")
    .to(
      ".animate1",
      {
        opacity: 1,
        ease: "linear",
      },
      "first"
    )
    .to(frames, updateFrame(160), "second")
    .to(
      ".animate1",
      {
        opacity: 1,
        ease: "linear",
      },
      "second"
    )
    .to(frames, updateFrame(240), "third")
    .to(
      ".animate1",
      {
        opacity: 0,
        ease: "linear",
      },
      "third"
    )
    .to(frames, updateFrame(320), "fourth")
    .to(
      ".animate2",
      {
        opacity: 1,
        ease: "linear",
      },
      "fourth"
    )
    .to(frames, updateFrame(400), "fifth")
    .to(
      ".animate2",
      {
        opacity: 1,
        ease: "linear",
      },
      "fifth"
    )
    .to(frames, updateFrame(480), "sixth")
    .to(
      ".animate2",
      {
        opacity: 0,
        ease: "linear",
      },
      "sixth"
    )
    .to(frames, updateFrame(560), "seventh")
    .to(
      ".animate3",
      {
        opacity: 1,
        ease: "linear",
      },
      "seventh"
    )
    .to(frames, updateFrame(640), "eighth")
    .to(
      ".animate3",
      {
        opacity: 1,
        ease: "linear",
      },
      "eighth"
    )
    .to(frames, updateFrame(720), "ninth")
    .to(
      ".animate3",
      {
        opacity: 0,
        ease: "linear",
      },
      "ninth"
    )
    .to(frames, updateFrame(800), "tenth")
    .to(
      ".panel",
      {
        x: 0,
        ease: "expo",
      },
      "tenth"
    )
    .to(frames, updateFrame(880), "eleventh")
    .to(
      ".panel",
      {
        x: 0,
        ease: "expo",
      },
      "eleventh"
    )
    .to(frames, updateFrame(960), "twelth")
    .to(
      ".panel",
      {
        opacity: 0,
        ease: "linear",
      },
      "twelth"
    )
    .to(frames, updateFrame(1040), "thirteenth")
    .to(
      "#canvas",
      {
        scale: 0.5,
        ease: "linear",
      },
      "thirteenth"
    )
    .to(frames, updateFrame(1120), "fourteenth")
    .to(
      ".panelism",
      {
        opacity: 1,
        ease: "expo",
      },
      "fourteenth"
    )
    .to(frames, updateFrame(1200), "fourteenth")
    .to(
      ".panelism span",
      {
        width: 200,
        ease: "expo",
      },
      "fourteenth"
    )
    .to(frames, updateFrame(1250), "fifteen")
    .to(
      "#canvas",
      {
        scale: 1,
        ease: "linear",
      },
      "fifteen"
    )
    .to(frames, updateFrame(1340), "sixteen")
    .to(
      ".panelism",
      {
        scale: 1.5,
        ease: "circ",
      },
      "sixteen"
    )
    .to(frames, updateFrame(1344), "sixteen")
    .to(
      ".panelism",
      {
        scale: 1.5,
        ease: "circ",
      },
      "sixteen"
    );
}

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

window.addEventListener("resize", () => {
  loadImage(Math.floor(frames.currentIndex));
});

preloadImages();

document.querySelectorAll(".headings h3").forEach((elem) => {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 90%",
      end: "bottom 20%",
      scrub: 2,
    },
    opacity: 0.2,
  });
});

gsap.from("#loaderCont span", {
  y: 100,
  duration: 1,
  opacity: 0,

  ease: "elastic.out(1,0.3)",
  stagger: 0.05,
  repeat: -1,
});

// gsap.from("#percentLoaded", {
//   duration: 0.2,

//   opacity: 0,

//   ease: "power4.out",

//   repeat: -1,
// });
