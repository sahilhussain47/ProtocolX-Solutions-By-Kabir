(function () {
  var cache = {};
  var lastKey = "";
  var seq = 0;

  function render(el, text) {
    el.className = "ai-summary-body";
    el.textContent = "";
    var lines = text.split("\n").map(function (l) { return l.replace(/^\s*[-•*\d.)]+\s*/, "").replace(/\*\*/g, "").trim(); }).filter(Boolean);
    // If the model returned one paragraph, break it into sentences so each point gets its own bullet.
    if (lines.length === 1 && lines[0].length > 160) {
      lines = lines[0].split(/(?<=[.!?])\s+/).map(function (s) { return s.trim(); }).filter(Boolean);
    }
    var ul = document.createElement("ul");
    lines.forEach(function (l) { var li = document.createElement("li"); li.textContent = l; ul.appendChild(li); });
    el.appendChild(ul);
  }

  function run(card) {
    var ta = document.querySelector('[data-testid="input-conversation"]');
    var sel = document.querySelector('[data-testid="select-chat-language"]');
    if (!ta || !ta.value.trim()) return;
    var el = card.querySelector(".ai-summary-body");
    if (!el) {
      el = document.createElement("div");
      el.className = "ai-summary-body is-loading";
      el.setAttribute("data-testid", "text-ai-summary");
      card.appendChild(el);
    }
    var text = ta.value, lang = sel ? sel.value : "english";
    var key = lang + "|" + text;
    if (key === lastKey) return;
    lastKey = key;
    if (cache[key]) return render(el, cache[key]);
    var my = ++seq;
    el.className = "ai-summary-body is-loading";
    el.textContent = "Writing summary…";
    fetch("/api/public/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text, language: lang }),
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (my !== seq) return;
        if (!res.ok || !res.j.summary) throw new Error((res.j && res.j.error) || "Summary failed");
        cache[key] = res.j.summary;
        render(el, res.j.summary);
      })
      .catch(function (e) {
        if (my !== seq) return;
        lastKey = "";
        el.className = "ai-summary-body";
        el.textContent = "Couldn't write the AI summary: " + e.message;
      });
  }

  var timer;
  new MutationObserver(function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      var card = document.querySelector('[data-testid="card-summary"]');
      if (!card) { lastKey = ""; return; }
      if (card.querySelector(".summary-list")) run(card);
    }, 150);
  }).observe(document.body, { childList: true, subtree: true });
})();
