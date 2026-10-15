const STORAGE_KEY = "shiyi-progress-v1";

const FRAGMENTS = [
  {
    id: "photo",
    type: "照片档案",
    title: "听雨茶社门脸",
    summary: "巷口西侧的木牌与两扇昏黄窗纸。",
    body: "拍摄说明（演示）：画面中可见“听雨茶社”直书牌匾、湿润石板与挂起的灯笼。影像用于课程场景氛围，不对应真实门牌。",
    visual: "photo"
  },
  {
    id: "letter",
    type: "信件抄件",
    title: "掌柜家书残页",
    summary: "林向晚写给远行妹妹的一纸短笺。",
    body: "“巷里的雨还是老样子。铜壶能用，竹椅缺了一角，客人仍会坐到天黑。店不大，可它让我把一天过完整。”（演示抄件）",
    visual: "letter"
  },
  {
    id: "oral",
    type: "口述记录",
    title: "巷口居民访谈",
    summary: "一位自称在此住了四十年的邻居。",
    body: "口述整理（演示）：“那店不是名胜。它只是下雨天有地方坐。后来牌子摘了，大家仍习惯把那一段叫听雨。”",
    visual: "oral"
  },
  {
    id: "news",
    type: "报刊剪报",
    title: "青岚巷改造通告",
    summary: "地方小报边栏中的一则短讯。",
    body: "演示剪报：本市将对青岚巷部分铺面进行整饬。17 号原茶社停业已久，拟改为便民空间。原文、版面与日期均为虚构。",
    visual: "news"
  },
  {
    id: "ticket",
    type: "票据残片",
    title: "午后茶票",
    summary: "盖着模糊朱印的消费凭证。",
    body: "演示票据：听雨茶社 / 绿茶一壶 / 座位近窗 / 金额未详。纸边焦黄，左下角缺角。",
    visual: "ticket"
  },
  {
    id: "sound",
    type: "声音纪要",
    title: "雨落青岚",
    summary: "一段据称录于檐下的环境声。",
    body: "录音纪要（演示）：可听见屋檐滴水、远处车轮与极轻的杯盏碰撞。此条以文字与波形示意，无真实音频文件。",
    visual: "sound"
  }
];

const state = {
  collected: new Set(),
  currentId: null
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    state.collected = new Set(Array.isArray(ids) ? ids : []);
  } catch (err) {
    state.collected = new Set();
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.collected]));
}

function showToast(text) {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function setView(name) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.id === `view-${name}`);
  });
  document.querySelectorAll(".nav button").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.nav === name);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateProgress() {
  const total = FRAGMENTS.length;
  const count = state.collected.size;
  const percent = Math.round((count / total) * 100);
  document.getElementById("progressCount").textContent = `${count}/${total}`;
  document.getElementById("progressFill").style.width = `${percent}%`;
  document.getElementById("progressFill").parentElement.setAttribute("aria-valuenow", String(percent));

  document.querySelectorAll(".hotspot").forEach((hotspot) => {
    hotspot.classList.toggle("collected", state.collected.has(hotspot.dataset.fragment));
  });

  renderArchive();
  renderStory();
}

function renderArchive() {
  const grid = document.getElementById("archiveGrid");
  grid.innerHTML = "";
  FRAGMENTS.forEach((item) => {
    const collected = state.collected.has(item.id);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `archive-card${collected ? "" : " locked"}`;
    card.innerHTML = collected
      ? `<span class="open-badge">已入藏</span><h3>${item.title}</h3><p>${item.summary}</p><p>${item.type}</p>`
      : `<span class="lock-badge">未收集 · 锁定</span><h3>${item.title}</h3><p>请回到青岚巷场景中寻找对应热点。</p>`;
    if (collected) {
      card.addEventListener("click", () => openFragment(item.id, false));
    }
    grid.appendChild(card);
  });
}

function renderStory() {
  const unlocked = state.collected.size === FRAGMENTS.length;
  document.getElementById("storyLocked").hidden = unlocked;
  document.getElementById("storyOpen").hidden = !unlocked;
  const missing = FRAGMENTS.filter((item) => !state.collected.has(item.id));
  document.getElementById("missingList").innerHTML = missing
    .map((item) => `<span>${item.title}</span>`)
    .join("");
}

function visualMarkup(item) {
  if (item.visual === "letter") {
    return `<div class="modal-visual letter">妹妹如晤：巷雨未停，铜壶仍热。店虽小，我把它当作一件还没做完的小事。——林向晚（演示）</div>`;
  }
  if (item.visual === "news") {
    return `<div class="modal-visual news"><strong>地方新闻 · 演示版面</strong><br/>青岚巷整饬在即，17号旧茶社或改作便民空间。本报讯，日期从缺。</div>`;
  }
  if (item.visual === "ticket") {
    return `<div class="modal-visual ticket">听雨茶社 茶票<br/>绿茶一壶 · 近窗<br/>朱印：听雨（演示）</div>`;
  }
  if (item.visual === "sound") {
    const bars = Array.from({ length: 18 }, (_, i) => `<span class="wave" style="animation-delay:${i * 0.08}s;height:${20 + (i % 5) * 10}px"></span>`).join("");
    return `<div class="modal-visual sound">${bars}</div>`;
  }
  const photos = {
    photo: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80",
    oral: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80"
  };
  return `<div class="modal-visual" style="background-image:url('${photos[item.visual] || photos.photo}')"></div>`;
}

function openFragment(id, canCollect) {
  const item = FRAGMENTS.find((entry) => entry.id === id);
  if (!item) return;
  state.currentId = id;
  document.getElementById("modalType").textContent = item.type;
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalVisual").outerHTML = `<div id="modalVisual">${visualMarkup(item)}</div>`;
  document.getElementById("modalBody").textContent = item.body;
  const collectBtn = document.getElementById("collectBtn");
  const already = state.collected.has(id);
  collectBtn.hidden = !canCollect && already;
  collectBtn.textContent = already ? "已收入档案馆" : "加入档案馆";
  collectBtn.disabled = already;
  document.getElementById("modal").hidden = false;
}

function closeModal() {
  document.getElementById("modal").hidden = true;
  state.currentId = null;
}

function collectCurrent() {
  if (!state.currentId) return;
  state.collected.add(state.currentId);
  saveProgress();
  updateProgress();
  closeModal();
  if (state.collected.size === FRAGMENTS.length) {
    showToast("关键碎片已齐。完整故事已解锁。");
    setView("story");
  } else {
    showToast("碎片已收入档案馆。");
  }
}

function bindCompare() {
  const root = document.getElementById("compare");
  const now = document.getElementById("compareNow");
  const handle = document.getElementById("compareHandle");
  let dragging = false;

  const setPos = (clientX) => {
    const rect = root.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const percent = ratio * 100;
    now.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
    handle.setAttribute("aria-valuenow", String(Math.round(percent)));
  };

  const start = (event) => {
    dragging = true;
    if (event.touches) setPos(event.touches[0].clientX);
    else setPos(event.clientX);
  };
  const move = (event) => {
    if (!dragging) return;
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    setPos(x);
  };
  const end = () => { dragging = false; };

  root.addEventListener("mousedown", start);
  root.addEventListener("touchstart", start, { passive: true });
  window.addEventListener("mousemove", move);
  window.addEventListener("touchmove", move, { passive: true });
  window.addEventListener("mouseup", end);
  window.addEventListener("touchend", end);
  handle.addEventListener("keydown", (event) => {
    const current = Number(handle.getAttribute("aria-valuenow") || 50);
    if (event.key === "ArrowLeft") setPos(root.getBoundingClientRect().left + ((current - 4) / 100) * root.offsetWidth);
    if (event.key === "ArrowRight") setPos(root.getBoundingClientRect().left + ((current + 4) / 100) * root.offsetWidth);
  });
}

function init() {
  loadProgress();
  updateProgress();
  bindCompare();

  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.dataset.nav));
  });

  document.querySelectorAll(".hotspot").forEach((hotspot) => {
    hotspot.addEventListener("click", () => openFragment(hotspot.dataset.fragment, true));
  });

  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.getElementById("collectBtn").addEventListener("click", collectCurrent);

  document.getElementById("resetProgress").addEventListener("click", () => {
    if (!confirm("确定清空本机保存的探索进度吗？")) return;
    state.collected = new Set();
    saveProgress();
    updateProgress();
    showToast("进度已重置。");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

document.addEventListener("DOMContentLoaded", init);
