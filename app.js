/* =====================================================
   إعدادات الملفات
===================================================== */
const APK_LEGACY = "almukalla-telecom-android-legacy.apk";
const APK_MODERN = "almukalla-telecom-android-modern.apk";
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
   تفعيل الوضع الداكن تلقائيًا
===================================================== */
document.body.classList.add("dark");
themeToggle.checked = true;

themeToggle.onchange = () => {
  document.body.classList.toggle("dark");
};

/* =====================================================
   كشف نوع الجهاز (النسخة القديمة)
===================================================== */
(function detectDevice(){
  const ua = navigator.userAgent;
  const android = ua.match(/Android\s([0-9\.]+)/);

  oldApk.style.display =
  newApk.style.display =
  webApp.style.display = "none";

  if (android) {
    parseFloat(android[1]) >= 10
      ? newApk.style.display = "inline-block"
      : oldApk.style.display = "inline-block";
  } else {
    webApp.style.display = "inline-block";
    webApp.href = WEB_APP_URL;
  }
})();

/* =====================================================
   تحميل APK (MB/s فقط + تحذير أقل من 1MB)
===================================================== */
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
    if (!e.lengthComputable) return;

    const percent = Math.round((e.loaded / e.total) * 100);
    loaderPercent.textContent = percent + "%";

    const now = Date.now();
    const bytesPerSecond = (e.loaded - lastLoaded) / ((now - lastTime) / 1000);
    const mbSpeed = bytesPerSecond / (1024 * 1024);

    loaderSpeed.textContent = mbSpeed.toFixed(2) + " MB/s";

    // ⚠️ تحذير النت الضعيف
    slowMsg.style.display = mbSpeed < 1 ? "block" : "none";

    lastLoaded = e.loaded;
    lastTime = now;
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
    alert("حدث خطأ أثناء التحميل");
    loader.style.display = "none";
  };

  xhr.send();
}

/* =====================================================
   معرض الصور
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
  if (currentImage < 0) currentImage = images.length - 1;
  if (currentImage >= images.length) currentImage = 0;
  modalImg.src = images[currentImage].src;
}
