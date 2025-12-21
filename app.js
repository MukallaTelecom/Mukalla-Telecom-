const VERSION = "921";

const APK_MAIN = "almukalla-telecom.apk";
const APK_MODERN = "almukalla-telecom-modern.apk";
const WEB_URL = "https://almukallaw.yemoney.net/";

const btn = document.getElementById("downloadBtn");
const webBtn = document.getElementById("webBtn");
const progressBox = document.getElementById("progressBox");
const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");
const logo = document.getElementById("appLogo");
const fileNameEl = document.getElementById("fileName");

const images = document.querySelectorAll(".gallery img");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

let selectedAPK = APK_MAIN;

/* كشف الجهاز */
(function(){
  const ua = navigator.userAgent;
  const match = ua.match(/Android\s([0-9]+)/);

  if(match){
    const v = parseInt(match[1]);
    selectedAPK = v >= 14 ? APK_MODERN : APK_MAIN;
    fileNameEl.textContent = selectedAPK;
  }else{
    btn.style.display = "none";
    webBtn.style.display = "inline-block";
    webBtn.href = WEB_URL;
  }
})();

/* تحميل */
btn.onclick = ()=>{
  if(localStorage.getItem("downloaded_"+VERSION)){
    alert("هذا الإصدار تم تحميله مسبقًا");
    return;
  }

  progressBox.style.display = "block";
  logo.classList.add("loading");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", selectedAPK, true);
  xhr.responseType = "blob";

  xhr.onprogress = (e)=>{
    const p = Math.round((e.loaded/e.total)*100);
    progressFill.style.width = p+"%";
    progressPercent.textContent = p+"%";
  };

  xhr.onload = ()=>{
    const a = document.createElement("a");
    a.href = URL.createObjectURL(xhr.response);
    a.download = selectedAPK;
    a.click();

    localStorage.setItem("downloaded_"+VERSION,"yes");
    logo.classList.remove("loading");
  };

  xhr.send();
};

/* معرض الصور */
function openImage(i){
  modal.style.display="flex";
  modalImg.src = images[i].src;
}
function closeImage(){
  modal.style.display="none";
}

/* وضع داكن */
const toggle = document.getElementById("themeToggle");
toggle.onchange = ()=>{
  document.body.classList.toggle("dark");
};
