const APK_MAIN = "almukalla-telecom-android-legacy.apk";
const APK_NEW  = "almukalla-telecom-android-modern.apk";
const WEB_APP  = "https://almukallaw.yemoney.net/";

const oldBtn = document.getElementById("oldApk");
const newBtn = document.getElementById("newApk");
const webBtn = document.getElementById("webApp");

const loader = document.getElementById("loader");
const percent = document.getElementById("loaderPercent");
const speedEl = document.getElementById("loaderSpeed");

/* كشف الجهاز */
(function(){
  const ua = navigator.userAgent;
  const m = ua.match(/Android\s([0-9]+)/);

  if(m){
    const v = parseInt(m[1]);
    if(v >= 14){
      newBtn.style.display = "inline-block";
    }else{
      oldBtn.style.display = "inline-block";
    }
  }else{
    webBtn.style.display = "inline-block";
    webBtn.href = WEB_APP;
  }
})();

/* تحميل */
function downloadAPK(url){
  loader.style.display = "flex";
  percent.textContent = "0%";
  speedEl.textContent = "0.00 MB/s";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";

  let lastTime = Date.now();
  let lastLoaded = 0;

  xhr.onprogress = (e)=>{
    if(!e.lengthComputable) return;

    const p = Math.round((e.loaded / e.total) * 100);
    percent.textContent = p + "%";

    const now = Date.now();
    const speed = (e.loaded - lastLoaded) / ((now - lastTime)/1000);
    speedEl.textContent = (speed / (1024*1024)).toFixed(2) + " MB/s";

    lastLoaded = e.loaded;
    lastTime = now;
  };

  xhr.onload = ()=>{
    const a = document.createElement("a");
    a.href = URL.createObjectURL(xhr.response);
    a.download = url;
    a.click();
    loader.style.display = "none";
  };

  xhr.send();
}

oldBtn.onclick = ()=>downloadAPK(APK_MAIN);
newBtn.onclick = ()=>downloadAPK(APK_NEW);function openImage(index){
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

