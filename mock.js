/* Interactive mockups — progressive enhancement only.
   Patterns:
   [data-tabs] container: buttons with data-tab="x" switch sibling [data-panels] > [data-panel="x"].
   [data-filter-group]: buttons with data-filter="x" show/hide list items with data-tag (x or "all").
   Every mock renders a sensible default without JS. */
(function () {
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var buttons = root.querySelectorAll("[data-tab]");
    var panelHost = root.querySelector("[data-panels]");
    if (!panelHost) return;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.toggle("on", b === btn); });
        panelHost.querySelectorAll("[data-panel]").forEach(function (p) {
          p.hidden = p.getAttribute("data-panel") !== btn.getAttribute("data-tab");
        });
        root.setAttribute("data-state", btn.getAttribute("data-tab"));
      });
    });
  });

  document.querySelectorAll("[data-filter-group]").forEach(function (root) {
    var buttons = root.querySelectorAll("[data-filter]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var want = btn.getAttribute("data-filter");
        buttons.forEach(function (b) { b.classList.toggle("on", b === btn); });
        root.querySelectorAll("[data-tag]").forEach(function (item) {
          item.hidden = want !== "all" && item.getAttribute("data-tag") !== want;
        });
      });
    });
  });

  /* Running timecode: elements with data-timecode tick at 24fps from their start value. */
  var tcEls = document.querySelectorAll("[data-timecode]");
  if (tcEls.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var frame = 0;
    setInterval(function () {
      if (document.hidden) return;
      frame++;
      tcEls.forEach(function (el) {
        var f = frame % 24, s = Math.floor(frame / 24) % 60,
            m = Math.floor(frame / 1440) % 60, h = 1 + Math.floor(frame / 86400);
        function p(n) { return (n < 10 ? "0" : "") + n; }
        el.textContent = p(h) + ":" + p(m) + ":" + p(s) + ":" + p(f);
      });
    }, 1000 / 24);
  }
})();
