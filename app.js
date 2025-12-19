
(function detectDevice(){
  const ua = navigator.userAgent.toLowerCase();

  // إظهار رابط الويب للجميع
  webApp.style.display = "inline-block";
  webApp.href = WEB_APP_URL;

  // إخفاء أزرار APK أولاً
  oldApk.style.display = "none";
  newApk.style.display = "none";

  // لو أندرويد
  if (ua.includes("android")) {

    let version = 0;
    const match = ua.match(/android\s([0-9]+)/);
    if (match) version = parseInt(match[1]);

    // تحديد نسخة APK
    if (version >= 10) {
      newApk.style.display = "inline-block"; // أندرويد حديث
    } else {
      oldApk.style.display = "inline-block"; // أندرويد عادي
    }
  }
})();
