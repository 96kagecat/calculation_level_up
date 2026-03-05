function pad(n) {
  return n.toString().padStart(2, '0');
}

function calculate() {
  const btn = document.getElementById('calcBtn');
  btn.disabled = true;

  const up = Number(document.getElementById('up').value);
  const now = Number(document.getElementById('now').value);
  const perHour = Number(document.getElementById('perHour').value);

  if (!up || !now || !perHour || perHour <= 0) {
    document.getElementById('output').textContent = '全て正しい値を入力してください';
    btn.disabled = false;
    return;
  }

  // 1. 1,000,000倍換算
  const upValue = up * 1000000;
  const nowValue = now * 1000000;

  // 2. 残り時間（小数時間）
  const diff = upValue - nowValue;
  if (diff <= 0) {
    document.getElementById('output').innerHTML =
      `LvUPまでの時間: <span style="color:blue">既に到達しています</span><br>LvUP時刻: <span style="color:green">-</span>`;
    btn.disabled = false;
    return;
  }
  const hoursLeft = diff / perHour;

  // 3. 小数時間 → hh:mm 形式
  const h = Math.floor(hoursLeft);
  const m = Math.ceil((hoursLeft - h) * 60);
  // 分が60の場合は繰り上げ
  let realH = h;
  let realM = m;
  if (realM === 60) {
    realH += 1;
    realM = 0;
  }
  const durationStr = `${realH}時間${realM}分`;
  
  // 4. LvUP時刻計算
  const nowDate = new Date();
  nowDate.setHours(nowDate.getHours() + h);
  nowDate.setMinutes(nowDate.getMinutes() + m);

  const lvupTime = `${nowDate.getFullYear()}/${pad(nowDate.getMonth()+1)}/${pad(nowDate.getDate())} ${pad(nowDate.getHours())}:${pad(nowDate.getMinutes())}`;

  document.getElementById('output').innerHTML =
    `LvUPまでの時間: <span style="color:blue">${durationStr}</span><br>LvUP時刻: <span style="color:green">${lvupTime}</span>`;

  btn.disabled = false;
}
