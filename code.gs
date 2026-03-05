function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

// メイン処理
function calcLvUp(upInput, nowInput, perHourInput) {
  // 1. 1,000,000倍換算
  const up = upInput * 1000000;
  const now = nowInput * 1000000;
  const perHour = perHourInput;

  // 2. 残り時間（小数時間）
  const diff = up - now;
  if (diff <= 0) {
    return {
      duration: "既に到達しています",
      lvupTime: "-"
    };
  }
  const hoursLeft = diff / perHour;

  // 3. 小数時間 → hh:mm 形式
  const h = Math.floor(hoursLeft);
  const m = Math.floor((hoursLeft - h) * 60);
  const durationStr = `${h}時間${m}分`;

  // 4. LvUP時刻計算
  const nowDate = new Date();
  nowDate.setHours(nowDate.getHours() + h);
  nowDate.setMinutes(nowDate.getMinutes() + m);

  // 時刻フォーマット
  const pad = n => n.toString().padStart(2, '0');
  const lvupTime = `${nowDate.getFullYear()}/${pad(nowDate.getMonth()+1)}/${pad(nowDate.getDate())} ${pad(nowDate.getHours())}:${pad(nowDate.getMinutes())}`;

  return {
    duration: durationStr,
    lvupTime: lvupTime
  };
}
