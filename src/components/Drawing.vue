<template>
  <div class="hello">

    <div v-if="!imageUrl" class="dropper">
      <input type="file" @change="uploadImages($event)" accept="image/*" />
      <span>Drag files here!</span>
    </div>

    <!--<div id="preview">
      <img v-if="imageUrl" :src="imageUrl" />
    </div>-->

    <vue-p5
      @setup="setup"
      @draw="draw"
      @mousedragged="mouseDragged"
      :style="cursor"
    ></vue-p5>

  </div>
</template>

<script>
import io from "socket.io-client";
import VueP5 from "vue-p5";
const socket = io.connect("http://localhost:9000");

export default {
  name: "Drawing",
  data() {
    return {
      color: "blue",
      image: null,
      imageUrl: "",
      isDrawn: false,
      dragOffsetX: null,
      dragOffsetY: null
    };
  },
  components: {
    "vue-p5": VueP5,
  },
  computed: {
    cursor() {
      return `cursor: url(assets/highlighter.svg)`;
    },
  },
  methods: {
    setup(sketch) {
      let w = window.innerWidth - 200;
      let h = window.innerHeight;
      sketch.createCanvas(800, 400);

      window.onresize = () => {
        w = window.innerWidth;
        h = window.innerHeight;
        sketch.resizeCanvas(w, h);
      };
    },
    draw(sketch) {
      if (!this.isDrawn && this.imageUrl) {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");

        const img = new Image();
        img.src = this.imageUrl;
        img.onload = () => {
          context.drawImage(img, 0, 0);
        };

        this.isDrawn = true;
      }
    },
    mouseDragged(sketch) {
      sketch.fill(this.color);
      sketch.noStroke();
      sketch.ellipse(sketch.mouseX, sketch.mouseY, 20, 20);

      let data = (data = {
        x: sketch.mouseX,
        y: sketch.mouseY,
      });

      this.dragOffsetX =  (`${sketch.mouseX}`);//sketch.mouseX - 10;
      this.dragOffsetY = (`${sketch.mouseY}`);

      socket.emit("mouse", data);
    },
    uploadImages(event) {
      const file = event.target.files[0];
      this.image = file;
      this.imageUrl = URL.createObjectURL(file);

      let data = (data = {
        imageUrl: this.imageUrl,
      });

      socket.emit("image", data);
    },
  },
};
</script>

<style scoped lang="scss">

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;

  li {
    display: inline-block;
    margin: 0 10px;

    a {
      color: #42b983;
    }
  }
}

.dropper {
  height: 30vh;
  border: 2px dashed black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: background 1.5s ease;

  &:hover {
    cursor: pointer;
    background: #eee;
  }
}

input {
  width: 100%;
  height: 30vh;
  position: absolute;
  opacity: 0;

  &:hover {
    cursor: pointer;
  }
}
</style>
