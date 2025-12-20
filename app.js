const APK_URL = "almukalla-telecom.apk";
const WEB_APP_URL = "https://almukallaw.yemoney.net/";

const apkBtn = document.getElementById("apkBtn");
const webApp = document.getElementById("webApp");
const themeToggle = document.getElementById("themeToggle");

/* داكن تلقائي */
document.body.classList.add("dark");
themeToggle.checked = true;

themeToggle.onchange = ()=>{
  document.body.classList.toggle("dark");
};

/* كاشف الجهاز */
(function detectDevice(){
  const ua = navigator.userAgent.toLowerCase();

  apkBtn.style.display = "none";
  webApp.style.display = "none";

  if (ua.includes("android")) {
    apkBtn.style.display = "inline-block";
    apkBtn.onclick = ()=> downloadAPK(APK_URL);
  } else {
    webApp.style.display = "inline-block";
  }
})();

/* تحميل بسيط مستقر */
function downloadAPK(url){
  const a = document.createElement("a");
  a.href = url;
  a.download = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
