const APK_URL = "almukalla-telecom.apk"; // الملف موجود

const btn = document.getElementById("downloadBtn");
const loaderBox = document.getElementById("loaderBox");
const loaderPercent = document.getElementById("loaderPercent");
const progressFill = document.getElementById("progressFill");

btn.onclick = () => {
  loaderBox.style.display = "block";
  progressFill.style.width = "0%";
  loaderPercent.textContent = "0%";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", APK_URL, true);
  xhr.responseType = "blob";

  xhr.onprogress = (e) => {
    if(!e.lengthComputable) return;
    const percent = Math.round((e.loaded / e.total) * 100);
    progressFill.style.width = percent + "%";
    loaderPercent.textContent = percent + "%";
  };

  xhr.onload = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(xhr.response);
    a.download = APK_URL;
    a.click();
    loaderBox.style.display = "none";
  };

  xhr.send();
};
