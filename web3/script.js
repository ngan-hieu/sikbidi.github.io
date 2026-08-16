// 1. Chữ chạy tiêu đề tab (Đã sửa lỗi nháy rỗng khi gõ xong)
const titleText = "Info+Sever - Hiếu";
let index = 0;

function typeTitle() {
  index++;
  if (index > titleText.length) {
    index = 1; 
  }
  document.title = titleText.substring(0, index);
}
setInterval(typeTitle, 199); //Tốc Độ Chữ Chạy (Ví Dụ:200ms=0.2s)

// 2. Danh sách Playlist
const playlist = [
  "videos/nhac2.mp3",
  "videos/nhac2.mp3"
];

let currentSongIndex = 0;
let audio, audioSource, musicText, musicIcon;

function updateUI(isPlaying) {
  if (!musicText || !musicIcon) return;
  if (isPlaying) {
    musicText.innerText = "Tắt nhạc";
    musicIcon.className = "fa-solid fa-volume-high";
  } else {
    musicText.innerText = "Bật nhạc";
    musicIcon.className = "fa-solid fa-volume-xmark";
  }
}

function toggleMusic() {
  if (!audio) return;
  if (audio.paused) {
    audio.play().then(() => updateUI(true)).catch(() => {});
  } else {
    audio.pause();
    updateUI(false);
  }
}

function nextSong() {
  if (!audio || !audioSource || playlist.length === 0) return;
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  audioSource.src = playlist[currentSongIndex];
  audio.load();
  audio.play().then(() => updateUI(true)).catch(() => {});
}

window.addEventListener("DOMContentLoaded", () => {
  audio = document.getElementById("myAudio");
  audioSource = document.getElementById("audioSource");
  musicText = document.getElementById("musicText");
  musicIcon = document.getElementById("musicIcon");

  if (!audio) return;

  //4. Hết nhạc tự chuyển bài
  audio.addEventListener("ended", nextSong);

  //5. Xử lý tự động phát
  audio.play().then(() => {
    updateUI(true);
  }).catch(() => {
    console.log("Autoplay bị trình duyệt chặn, chờ tương tác...");
    updateUI(false);

    const playOnInteraction = () => {
      audio.play().then(() => {
        updateUI(true);
      }).catch(() => {});
      
      document.removeEventListener("click", playOnInteraction);
      document.removeEventListener("touchstart", playOnInteraction);
      document.removeEventListener("keydown", playOnInteraction);
    };

    document.addEventListener("click", playOnInteraction);
    document.addEventListener("touchstart", playOnInteraction);
    document.addEventListener("keydown", playOnInteraction);
  });

});
// 1. Danh Sách Ảnh(Icon+Nháy)
const iconList = [
  "pictures/avata1.png",
  "pictures/avata2.png"
];

// 2. TỐC ĐỘ Nháy(ms): 500 = 0.5 giây
let blinkSpeed = 500; 

// --- LOGIC XỬ LÝ NHÁY ---
let blinkInterval = null;
let currentIndex = 0; 
function changeFavicon(src) {
  let favicon = document.getElementById("favicon");
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.id = "favicon";
    favicon.rel = "icon";
    favicon.type = "image/png";
    document.head.appendChild(favicon);
  }
  favicon.href = src + "?v=" + new Date().getTime(); 
}
function updateSpeed(val) {
  blinkSpeed = parseInt(val);
  if (blinkInterval) {
    clearInterval(blinkInterval);
    blinkInterval = null;
    startBlinking();
  }
}

// Hàm bắt đầu nhấp nháy theo danh sách
function startBlinking() {
  if (blinkInterval) return;

  const tick = () => {
    if (iconList.length > 0) {
      changeFavicon(iconList[currentIndex]);
      currentIndex = (currentIndex + 1) % iconList.length;
    }
  };

  tick();
  blinkInterval = setInterval(tick, blinkSpeed);
}

// Hàm dừng nhấp nháy và trả về icon đầu tiên
function stopBlinking() {
  if (blinkInterval) {
    clearInterval(blinkInterval);
    blinkInterval = null;
  }

  if (iconList.length > 0) {
    changeFavicon(iconList[0]);
  }

  currentIndex = 0;
}

// Tự động nháy khi Mở trang web
window.addEventListener("DOMContentLoaded", () => {
  startBlinking();
});