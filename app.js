const APK_URL = "https://your-host.com/almukalla-telecom.apk"; // عدّل الرابط

const downloadBtn = document.getElementById("downloadBtn");
const playBox = document.getElementById("playDownload");
const ring = document.querySelector(".progress-ring-fill");
const percentText = document.getElementById("playPercent");
const fileLine = document.getElementById("fileLineProgress");
const underProgress = document.getElementById("underProgress");
const fileName = document.getElementById("fileName");

const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const installBtn = document.getElementById("installBtn");
const deleteBtn = document.getElementById("deleteBtn");
const actions = document.getElementById("fileActions");

let xhr = null;
let downloadedBlob = null;
let isPaused = false;

const radius = 48;
const circumference = 2 * Math.PI * radius;
ring.style.strokeDasharray = circumference;
ring.style.strokeDashoffset = circumference;

downloadBtn.onclick = startDownload;

function startDownload(){
  playBox.style.display = "block";
  actions.style.display = "none";
  percentText.textContent = "0%";
  ring.style.strokeDashoffset = circumference;
  fileLine.style.width = "0%";
  underProgress.style.width = "0%";
  fileName.textContent = APK_URL.split("/").pop();
  isPaused = false;

  xhr = new XMLHttpRequest();
  xhr.open("GET", APK_URL, true);
  xhr.responseType = "blob";

  xhr.onprogress = (e)=>{
    if(!e.lengthComputable || isPaused) return;

    const percent = Math.round((e.loaded / e.total) * 100);
    percentText.textContent = percent + "%";

    const offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;

    fileLine.style.width = percent + "%";
    underProgress.style.width = percent + "%";
  };

  xhr.onload = ()=>{
    downloadedBlob = xhr.response;
    actions.style.display = "flex";
  };

  xhr.send();
}

/* إيقاف */
pauseBtn.onclick = ()=>{
  if(xhr){
    isPaused = true;
    xhr.abort();
  }
};

/* استئناف (يعيد التحميل من البداية) */
resumeBtn.onclick = ()=>{
  startDownload();
};

/* تثبيت (فتح الملف) */
installBtn.onclick = ()=>{
  if(!downloadedBlob) return;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(downloadedBlob);
  a.download = fileName.textContent;
  a.click();
};

/* حذف */
deleteBtn.onclick = ()=>{
  playBox.style.display = "none";
  downloadedBlob = null;
};function openImage(index){
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

