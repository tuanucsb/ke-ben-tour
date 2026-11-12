// Read-only preview: nothing on these pages can save.
(function () {
  var MSG = "Bản xem thử chỉ đọc: thao tác này chạy trên ứng dụng thật · Read-only preview: this step runs in the live app";
  var note, timer;
  function say() {
    if (!note) {
      note = document.createElement("div");
      note.className = "kb-note";
      note.setAttribute("role", "status");
      note.textContent = MSG;
      document.body.appendChild(note);
      note.offsetWidth; // so the first showing animates too
    }
    note.classList.add("on");
    clearTimeout(timer);
    timer = setTimeout(function () { note.classList.remove("on"); }, 3200);
  }
  // The run of neighbouring options a clicked one belongs to (a form can hold two runs).
  function run(el) {
    var out = [el], n;
    for (n = el.previousElementSibling; n && n.classList.contains("opt"); n = n.previousElementSibling) out.push(n);
    for (n = el.nextElementSibling; n && n.classList.contains("opt"); n = n.nextElementSibling) out.push(n);
    return out;
  }
  document.addEventListener("submit", function (e) { e.preventDefault(); say(); });
  document.addEventListener("click", function (e) {
    var t = e.target.nodeType === 1 ? e.target : e.target.parentElement;
    if (!t || t.closest("a")) return;
    var pick = t.closest(".opt, .seg > .s");
    if (pick) {
      var group = pick.classList.contains("opt") ? run(pick) : Array.prototype.slice.call(pick.parentElement.children);
      group.forEach(function (el) { el.classList.toggle("sel", el === pick); });
      return;
    }
    var b = t.closest("button");
    if (!b) return;
    var home = document.querySelector(".kb-bar a");
    if (home && b.textContent.indexOf("Đăng xuất") !== -1) { location.href = home.href; return; }
    if (b.type !== "submit" || !b.form) say(); // a form's own submit is announced above
  });
})();
