var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let loadImage = (src, callback) => {
  let img = new Image();
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return `images/${animation}/${frameNumber}.png`;
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  forward: [1, 2, 3, 4, 5, 6],
  backward: [1, 2, 3, 4, 5, 6],
};

let loadImages = (callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    block: [],
    forward: [],
    backward: [],
  };
  let imagesToLoad = 0;
  ["idle", "kick", "punch", "block", "forward", "backward"].forEach(
    (animation) => {
      let animatedFrames = frames[animation];
      imagesToLoad += animatedFrames.length;
      animatedFrames.forEach((frameNumber) => {
        let path = imagePath(frameNumber, animation);

        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad -= 1;

          if (imagesToLoad === 0) {
            callback(images);
          }
        });
      });
    }
  );
};

let xMovement = 0;
let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      if (animation === "forward") {
        xMovement += 10;
      } else if (animation === "backward") {
        xMovement -= 10;
      }
      ctx.clearRect(0, 0, 1000, 500);
      ctx.drawImage(image, xMovement, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let queuedanimation = [];

  let aux = () => {
    let selectedAnimation;
    if (queuedanimation.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedanimation.shift();
    }

    animate(ctx, images, selectedAnimation, aux);
  };

  aux();

  document.getElementById("kick").onclick = () => {
    queuedanimation.push("kick");
  };
  document.getElementById("punch").onclick = () => {
    queuedanimation.push("punch");
  };
  document.getElementById("block").onclick = () => {
    queuedanimation.push("block");
  };
  document.getElementById("forward").onclick = () => {
    queuedanimation.push("forward");
  };
  document.getElementById("backward").onclick = () => {
    queuedanimation.push("backward");
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key === "a") {
      queuedanimation.push("kick");
    } else if (key === "d") {
      queuedanimation.push("punch");
    } else if (key === "w") {
      queuedanimation.push("forward");
    } else if (key === "s") {
      queuedanimation.push("backward");
    } else if (key === " ") {
      queuedanimation.push("block");
    }
  });
});
