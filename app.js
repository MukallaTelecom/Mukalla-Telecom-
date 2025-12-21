/* =====================================================
   إعدادات الملفات (عدّل الأسماء هنا فقط إذا احتجت)
===================================================== */
const APK_LEGACY = "almukalla-telecom-android-legacy.apk"; // أندرويد عادي
const APK_MODERN = "almukalla-telecom-android-modern.apk"; // أندرويد حديث
const WEB_APP_URL = "https://almukallaw.yemoney.net/";

/* =====================================================
   عناصر الصفحة
===================================================== */
const oldApk   = document.getElementById("oldApk");
const newApk   = document.getElementById("newApk");
const webApp   = document.getElementById("webApp");

const loader        = document.getElementById("loader");
const loaderPercent = document.getElementById("loaderPercent");
const loaderSpeed   = document.getElementById("loaderSpeed");
const slowMsg       = document.getElementById("slowMsg");

const themeToggle = document.getElementById("themeToggle");

const imageModal = document.getElementById("imageModal");
const modalImg   = document.getElementById("modalImg");
const images     = document.querySelectorAll(".gallery img");

/* =====================================================
   كشف نوع الجهاز وتحديد الزر المناسب
===================================================== */
(function detectDevice(){
  const ua = navigator.userAgent;
  const android = ua.match(/Android\s([0-9\.]+)/);

  // إخفاء كل الأزرار أولاً
  oldApk.style.display =
  newApk.style.display =
  webApp.style.display = "none";

  if (android) {
    // أندرويد
    if (parseFloat(android[1]) >= 10) {
      newApk.style.display = "inline-block";
    } else {
      oldApk.style.display = "inline-block";
    }
  } else {
    // آيفون أو كمبيوتر
    webApp.style.display = "inline-block";
    webApp.href = WEB_APP_URL;
  }
})();

/* =====================================================
   الوضع الفاتح / الداكن
===================================================== */
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark");
  themeToggle.checked = true;
}

themeToggle.onchange = () => {
  document.body.classList.toggle("dark");
};

/* =====================================================
   تحميل APK بعدّاد حقيقي
===================================================== */
function downloadLegacyAPK(){
  downloadAPK(APK_LEGACY);
}

function downloadModernAPK(){
  downloadAPK(APK_MODERN);
}

function downloadAPK(url){
  loader.style.display = "flex";
  loaderPercent.textContent = "0%";
  loaderSpeed.textContent = "0.00 MB/s";
  slowMsg.style.display = "none";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";

  let lastLoaded = 0;
  let lastTime = Date.now();

  xhr.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      loaderPercent.textContent = percent + "%";

      const now = Date.now();
const speed = (e.loaded - lastLoaded) / ((now - lastTime) / 1000);

// التحويل إلى MB/s فقط
const speedMB = speed / (1024 * 1024);

loaderSpeed.textContent = speedMB.toFixed(2) + " MB/s";

lastLoaded = e.loaded;
lastTime = now;
      loaderSpeed.textContent =
        kb > 1024
          ? (kb / 1024).toFixed(2) + " MB/s"
          : kb.toFixed(1) + " KB/s";

      slowMsg.style.display = kb < 50 ? "block" : "none";

      lastLoaded = e.loaded;
      lastTime = now;
    }
  };

  xhr.onload = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(xhr.response);
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  };

  xhr.onerror = () => {
    alert("حدث خطأ أثناء التحميل، حاول مرة أخرى");
    loader.style.display = "none";
  };

  xhr.send();
}

/* =====================================================
   معرض الصور (تكبير وتنقل)
===================================================== */
let currentImage = 0;

function openImage(index){
  currentImage = index;
  modalImg.src = images[index].src;
  imageModal.style.display = "flex";
}

function closeImage(){
  imageModal.style.display = "none";
}

function changeImage(step){
  currentImage += step;

  if (currentImage < 0) {
    currentImage = images.length - 1;
  }
  if (currentImage >= images.length) {
    currentImage = 0;
  }

  modalImg.src = images[currentImage].src;
    }

