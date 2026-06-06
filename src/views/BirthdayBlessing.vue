<script setup lang="ts">
import { ref } from 'vue'

// B站视频占位 BV 号，用户可自行替换
const bilibiliBvid = ref('BV1vRVAzJEY2')
</script>

<template>
  <div class="blessing-page">
    <div class="blessing-card">
      <!-- 顶部装饰区 -->
      <div class="blessing-header">
        <div class="deco-icons">
          <span>🎂</span>
          <span>🎉</span>
          <span>🎈</span>
        </div>
        <h1 class="blessing-title">🎊 生日快乐 🎊</h1>
        <p class="blessing-subtitle">
          愿你所求皆如愿，所行化坦途<br />
          多喜乐，长安宁，岁岁常欢愉
        </p>
        <div class="deco-line"></div>
      </div>

      <!-- 视频区域 -->
      <div class="video-wrapper">
        <iframe
          :src="`https://player.bilibili.com/player.html?bvid=${bilibiliBvid}&autoplay=0&high_quality=1&danmaku=0`"
          class="bilibili-iframe"
          allowfullscreen
          allow="autoplay; encrypted-media"
          referrerpolicy="no-referrer"
          scrolling="no"
          frameborder="0"
          sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
        ></iframe>
      </div>

      <!-- 底部祝福 -->
      <div class="blessing-footer">
        <p class="footer-text">💝 愿你每一天都充满阳光与欢笑 💝</p>
        <div class="deco-icons">
          <span>✨</span>
          <span>🌸</span>
          <span>🌟</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blessing-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0 60px;
}

.blessing-card {
  background: linear-gradient(
    180deg,
    var(--accent-bg) 0%,
    var(--bg-card) 40%
  );
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

/* 头部 */
.blessing-header {
  text-align: center;
  padding: 48px 32px 32px;
}

.deco-icons {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 2rem;
  margin-bottom: 16px;
}

.blessing-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--accent), #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.blessing-subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 20px;
}

.deco-line {
  width: 60px;
  height: 3px;
  margin: 0 auto;
  background: linear-gradient(90deg, var(--accent), #ec4899);
  border-radius: 2px;
}

/* 视频 */
.video-wrapper {
  position: relative;
  width: 100%;
  padding: 0 24px;
  aspect-ratio: 16 / 9;
}

.bilibili-iframe {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* 底部 */
.blessing-footer {
  text-align: center;
  padding: 32px 24px 40px;
}

.footer-text {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
  font-weight: 500;
}

/* 响应式 */
@media (max-width: 640px) {
  .blessing-header {
    padding: 32px 20px 24px;
  }

  .blessing-title {
    font-size: 1.6rem;
  }

  .blessing-subtitle {
    font-size: 0.95rem;
  }

  .video-wrapper {
    padding: 0 16px;
  }

  .blessing-footer {
    padding: 24px 16px 32px;
  }
}
</style>
