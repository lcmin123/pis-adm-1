export default function calcLeftTime() {
  initTime -= 1000;
  setInterval(() => {
    const s = Math.floor(initTime / 1000) % 60;
    const m = Math.floor(initTime / 1000 / 60) % 60;
    $(".left-time").text(`${m}:${s < 10 ? "0" + s : s}`);
    initTime -= 1000;
  }, 1000);
}
