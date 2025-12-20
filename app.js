const APK_URL = "almukalla-telecom.apk";

const btn = document.getElementById("downloadBtn");
const playBox = document.getElementById("playDownload");
const ring = document.querySelector(".ring-fill");
const percentText = document.getElementById("playPercent");
const fileLine = document.getElementById("fileLineProgress");
const underLine = document.getElementById("underProgress");
const fileName = document.getElementById("fileName");
const actions = document.getElementById("fileActions");
const installBtn = document.getElementById("installBtn");
const deleteBtn = document.getElementById("deleteBtn");

const radius = 48;
const circumference = 2 * Math.PI * radius;
ring.style.strokeDasharray = circumference;

btn.onclick = () => {
  playBox.style.display = "block";
  actions.style.display = "none";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", APK_URL, true);
  xhr.responseType = "blob";

  xhr.onprogress = (e)=>{
    if(!e.lengthComputable) return;
    const percent = Math.round((e.loaded / e.total) * 100);

    percentText.textContent = percent + "%";
    underLine.style.width = percent + "%";
    fileLine.style.width = percent + "%";

    ring.style.strokeDashoffset =
      circumference - (percent / 100) * circumference;
  };

  xhr.onload = ()=>{
    actions.style.display = "flex";

    const blob = xhr.response;
    installBtn.onclick = ()=>{
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = APK_URL;
      a.click();
    };
  };

  deleteBtn.onclick = ()=>{
    playBox.style.display = "none";
  };

  xhr.send();
};
