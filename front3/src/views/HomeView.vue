<template>
  <div class="HomeView">
    <!-- Home 배경영상 -->
    <video class="background-video" autoplay muted loop>
      <source src="@/assets/homeBackgroundVideo.mp4" type="video/mp4" />
    </video>
    <div class="contentsBox">
      <!-- 홈 화면 텍스트 -->
      <div class="mainText">
        <div class="textContainer" ref="textContainer">
          {{ typedText }}
        </div>
      </div>
      <!-- EgoExpand 라우터 링크 -->
      <router-link
        :to="{ name: 'egoExpand' }"
        class="nav-link"
        style="width: fit-content"
      >
        <span class="egoExpandBtn" :class="{ blink: isBlinking }"
          >Click to Ego Expand</span
        ></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  mounted() {
    // MainText 타이핑 효과
    this.runTypingAnimation();
    // EgoExpand 라우터 링크 깜박임 효과
    this.startBlinking();
  },
  data() {
    return {
      // 타이핑될 텍스트를 데이터에 추가
      typedText: "",
      // 깜박임 제어를 위한 변수 추가
      isBlinking: false,
    };
  },
  methods: {
    async runTypingAnimation() {
      const texts = [
        "Every ego has different\nmovies.",
        "모든 자아는 다른 영화를\n가지고 있습니다.",
        "Cada ego tiene películas\ndiferentes.",
        "すべてのエゴは異なる映画を持\nっている.",
        "每个自我都有不同的电影.",
      ];

      const typingSpeed = 100; // 타이핑 속도 (1자당 밀리초)
      const eraseSpeed = 100; // 지우기 속도 (1자당 밀리초)
      const typingDelay = 100; // 다음 텍스트까지의 딜레이 (밀리초)
      const eraseDelay = 2000; // 텍스트를 모두 지우고 다음 텍스트까지의 딜레이 (밀리초)

      let index = 0;
      let isRunning = true; // 무한 루프를 제어할 변수 추가

      while (isRunning) {
        const text = texts[index];
        const textContainer = this.$refs.textContainer;

        if (!textContainer) {
          isRunning = false;
          break;
        }

        for (let j = 0; j <= text.length; j++) {
          this.typedText = text.substr(0, j); // 텍스트를 데이터에 설정하여 렌더링
          await this.sleep(typingSpeed);
        }

        await this.sleep(eraseDelay);

        for (let j = text.length; j >= 0; j--) {
          this.typedText = text.substr(0, j); // 텍스트를 데이터에 설정하여 렌더링
          await this.sleep(eraseSpeed);
        }

        await this.sleep(typingDelay);

        index = (index + 1) % texts.length;
      }
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    //  깜박임효과
    startBlinking() {
      setInterval(() => {
        this.isBlinking = !this.isBlinking;
      }, 800);
    },
  },
};
</script>

<style scoped>
.contentsBox {
  margin-top: 200px;
  margin-left: 200px;
}
/* 배경 영상 CSS */
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

/* MainText CSS */
.mainText {
  font-size: 60px;
  height: 250px;
  font-weight: bold;
  /* color: #e50914; */
  color: white;
}

.textContainer {
  white-space: pre-line;
}

/* EgoExpand 라우터 링크 CSS */
.egoExpandBtn {
  display: inline-block; /* 글자에 딱 맞게 영역 설정 */
  padding: 5px 10px; /* 필요에 따라 padding 조정 */
  font-size: 35px;
  color: rgba(255, 255, 255, 0.671);
  transition: opacity 0.9s ease-in-out;
  font-weight: bold;
  border: 0.1px solid rgba(255, 255, 255, 0.671);
}
.blink {
  opacity: 0;
}
</style>
