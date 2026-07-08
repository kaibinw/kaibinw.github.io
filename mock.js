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

  /* Soft-loop text cycling: data-cycle='["a","b","c"]' rotates every few seconds. */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) {
    document.querySelectorAll("[data-cycle]").forEach(function (el) {
      var values;
      try { values = JSON.parse(el.getAttribute("data-cycle")); } catch (e) { return; }
      if (!values || values.length < 2) return;
      var i = 0;
      setInterval(function () {
        if (document.hidden) return;
        i = (i + 1) % values.length;
        el.textContent = values[i];
      }, 3200);
    });
  }

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

  /* Ruler nav: the playhead tracks scroll and the nearest section's marker
     goes current. Without JS the ruler stays a decorative scrub loop. */
  var ruler = document.querySelector(".ruler[data-ruler-nav]");
  if (ruler) {
    var marks = Array.prototype.slice.call(ruler.querySelectorAll(".ruler-mark"));
    var targets = marks
      .map(function (m) {
        var el = document.querySelector(m.getAttribute("href"));
        return el ? { mark: m, el: el } : null;
      })
      .filter(Boolean);
    if (targets.length) {
      ruler.classList.add("is-live");
      var playhead = ruler.querySelector(".playhead");
      var update = function () {
        var y = window.scrollY + window.innerHeight * 0.35;
        var current = targets[0];
        targets.forEach(function (t) {
          if (t.el.getBoundingClientRect().top + window.scrollY <= y) current = t;
        });
        targets.forEach(function (t) {
          if (t === current) t.mark.setAttribute("aria-current", "true");
          else t.mark.removeAttribute("aria-current");
        });
        if (playhead) playhead.style.left = current.mark.style.getPropertyValue("--x");
      };
      var queued = false;
      window.addEventListener("scroll", function () {
        if (queued) return;
        queued = true;
        setTimeout(function () { queued = false; update(); }, 80);
      }, { passive: true });
      update();
    }
  }

  /* About hobbies: tapping a timeline marker opens its note, like a
     marker comment on an NLE timeline. One open at a time; Esc closes. */
  var hobbyTrack = document.querySelector(".hobby-track");
  if (hobbyTrack) {
    var hobbyButtons = hobbyTrack.querySelectorAll(".hobby-marker");
    var closeAll = function () {
      hobbyTrack.querySelectorAll(".hobby-note").forEach(function (n) { n.hidden = true; });
      hobbyButtons.forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    };
    hobbyButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var note = btn.parentElement.querySelector(".hobby-note");
        if (!note) return;
        var wasOpen = !note.hidden;
        closeAll();
        note.hidden = wasOpen;
        btn.setAttribute("aria-expanded", String(!wasOpen));
      });
    });
    document.addEventListener("click", closeAll);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });
  }
})();
