<template>
  <div class="about">
    <h1>Display Image</h1>
    <vue-p5 @setup="setup" :style="cursor"></vue-p5>
  </div>
</template>

<script>
import io from "socket.io-client";
import VueP5 from "vue-p5";
const socket = io.connect("http://localhost:9000");

export default {
  name: "Preview",
  data() {
    return {
      connection: null,
      color: "red",
      dragOffsetX: null,
      dragOffsetY: null
    };
  },
  components: {
    "vue-p5": VueP5
  },
  computed: {
    cursor() {
      return `cursor: not-allowed`;
    }
  },
  methods: {
    setup(sketch) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      sketch.createCanvas(800, 400);

      socket.on("mouse", data => {
        sketch.fill(this.color);
        sketch.noStroke();
        sketch.ellipse(data.x, data.y, 20, 20);

        this.dragOffsetX = `${data.x}`; //sketch.mouseX - 10;
        this.dragOffsetY = `${data.y}`;
      });

      socket.on("image", data => {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        const img = new Image();
        img.src = data.imageUrl;
        img.onload = () => {
          context.drawImage(img, 0, 0);
        };
      });
    }
  }
};
</script>