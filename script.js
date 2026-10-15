const STORAGE_KEY = "shiyi-sanxingdui-v1";

const IMAGE_BASE = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=";

const IMAGES = {
  figure: IMAGE_BASE + "ancient%20Chinese%20bronze%20standing%20figure%20statue%20with%20tall%20crown%20and%20layered%20robe%2C%20hands%20held%20together%20in%20circle%20at%20chest%2C%20Sanxingdui%20style%2C%20full%20body%2C%20dark%20museum%20spotlight%2C%20bronze%20green%20patina%2C%20black%20background%2C%20cinematic%2C%20high%20detail&image_size=landscape_4_3",
  tree: IMAGE_BASE + "ancient%20bronze%20sacred%20tree%20sculpture%20with%20birds%20perched%20on%20branches%20and%20a%20dragon%20descending%20along%20the%20trunk%2C%20Sanxingdui%20style%2C%20dark%20museum%20display%2C%20spotlight%2C%20bronze%20green%20patina%2C%20black%20background%2C%20mysterious%20cinematic%2C%20high%20detail&image_size=landscape_4_3",
  eyemask: IMAGE_BASE + "ancient%20Chinese%20bronze%20mask%20with%20protruding%20cylindrical%20eyes%20and%20large%20spreading%20ears%2C%20Sanxingdui%20style%2C%20dark%20museum%20display%2C%20spotlight%2C%20bronze%20green%20patina%2C%20black%20background%2C%20mysterious%2C%20high%20detail&image_size=landscape_4_3",
  goldmask: IMAGE_BASE + "ancient%20broken%20gold%20mask%20artifact%2C%20half%20of%20a%20golden%20mask%20with%20hollow%20eyes%2C%20Sanxingdui%20style%2C%20dark%20museum%20display%2C%20dramatic%20spotlight%2C%20black%20background%2C%20metallic%20shine%2C%20high%20detail&image_size=landscape_4_3",
  staff: IMAGE_BASE + "ancient%20Chinese%20gold%20scepter%20staff%20with%20engraved%20fish%20bird%20arrow%20and%20human%20head%20patterns%2C%20Sanxingdui%20artifact%2C%20dark%20museum%20display%2C%20spotlight%2C%20black%20background%2C%20metallic%20gold%20shine%2C%20high%20detail&image_size=landscape_4_3",
  sunwheel: IMAGE_BASE + "ancient%20bronze%20circular%20sun%20wheel%20artifact%20with%20five%20radiating%20rays%20connected%20to%20outer%20ring%2C%20Sanxingdui%20style%2C%20dark%20museum%20display%2C%20spotlight%2C%20bronze%20green%20patina%2C%20black%20background%2C%20high%20detail&image_size=landscape_4_3"
};

const FRAGMENTS = [
  {
    id: "figure",
    type: "青铜造像",
    title: "青铜大立人像",
    summary: "通高 260.8 厘米，被誉为“世界铜像之王”。",
    body: "1986 年出土于三星堆二号祭祀坑。人像高 172 厘米，头戴高冠，身着三层长衣，赤足立于方台之上，双手环握于胸前，是现存最高、最完整的青铜立人像之一。多数学者推测其身份可能是集神权与王权于一身的大祭司或蜀王；其双手原持何物（象牙、法器或礼器等），学界尚无定论。",
    clue: "线索：环握的双手一定曾持有某物——它握住的或许是沟通天地的法器，也或许是一段至今未被破译的仪式。"
  },
  {
    id: "tree",
    type: "青铜重器",
    title: "青铜神树",
    summary: "修复后通高 396 厘米，是迄今所见最大的单件青铜文物之一。",
    body: "1986 年出土于二号祭祀坑。一号神树残高 359 厘米，修复后通高 396 厘米。树分三层，每层三枝，枝头立有神鸟，残存九只；树侧有一龙缘树而下。学界常将其与《山海经》中的“扶木”“若木”等神树传说相联系，认为它可能反映了古蜀人的太阳崇拜与沟通天地的观念——此为学术推测，尚无定论。",
    clue: "线索：九鸟栖于枝头，一龙自天而降——树，或许是古蜀人心中连接天地的阶梯。"
  },
  {
    id: "eyemask",
    type: "青铜面具",
    title: "青铜纵目面具",
    summary: "宽 138 厘米，双眼呈柱状外凸约 16 厘米，人称“千里眼、顺风耳”。",
    body: "1986 年出土于二号祭祀坑。面具宽约 138 厘米、高约 66 厘米，眼球呈柱状向前凸出约 16 厘米，双耳向两侧充分展开。有学者将其与《华阳国志》中蜀王蚕丛“其目纵”的记载相联系，推测它可能是古蜀人心目中始祖或祖先神的形象；也有观点认为它象征超凡的视听能力。以上均属学术推测。",
    clue: "线索：凸出的双目究竟望向何处？也许它看的不是远方，而是古蜀人想象力的边界。"
  },
  {
    id: "goldmask",
    type: "黄金器",
    title: "金面具",
    summary: "2021 年出土于五号坑的半张黄金面具，重约 280 克。",
    body: "2021 年出土于五号祭祀坑，出土时仅剩半张。残存部分宽约 23 厘米、高约 28 厘米，重约 280 克；考古人员推测完整面具总重可能超过 500 克，体量在国内同期黄金面具中罕见。它与三星堆此前出土的金面罩、金杖一起，构成了古蜀独特而成熟的黄金工艺传统。",
    clue: "线索：半张面具静静躺在坑中——另一半去了哪里？在古蜀，黄金或许是神的面庞。"
  },
  {
    id: "staff",
    type: "黄金器",
    title: "金杖",
    summary: "长约 142 厘米的金皮木杖，錾刻鱼、鸟、箭与人头像图案。",
    body: "1986 年出土于一号祭祀坑。金杖以金条捶打成金皮后包卷在木杖上制成，木芯早已炭化。杖身錾刻着由鱼、鸟、箭矢与人头像组成的图案。中原王朝多以鼎象征权力，而三星堆以杖为尊——多数学者推测金杖可能是王权或神权的象征物，其图案的确切含义至今未有定论。",
    clue: "线索：鱼、鸟、箭串联成一行“图像的文字”——在没有成熟文字的古蜀，权杖本身就是宣言。"
  },
  {
    id: "sunwheel",
    type: "青铜器",
    title: "青铜太阳形器",
    summary: "直径约 85 厘米，中心凸起，五道“光芒”呈放射状分布。",
    body: "1986 年出土于二号祭祀坑。器物呈圆形，直径约 85 厘米，中央半球状凸起，五道芒条与外圈相连。其用途众说纷纭：太阳崇拜的礼器、车轮、盾牌或装饰构件等说法并存，学界尚无定论。三星堆器物上反复出现的太阳与眼睛元素，暗示“观天”在古蜀信仰中可能占有重要位置（推测）。",
    clue: "线索：五道光芒钉住一轮太阳——古蜀人把它铸进青铜，是想让光明永不落下吗？"
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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.collected]));
  } catch (err) {
    /* 隐私模式等场景下无法写入时，仅本次会话内保留进度 */
  }
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
      : `<span class="lock-badge">待发掘 · 锁定</span><h3>${item.title}</h3><p>请回到遗址现场寻找对应热点。</p>`;
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
  return `<div class="modal-visual" style="background-image:url('${IMAGES[item.id]}')"><span class="visual-note">AI 氛围示意 · 非文物实拍</span></div>`;
}

function openFragment(id, canCollect) {
  const item = FRAGMENTS.find((entry) => entry.id === id);
  if (!item) return;
  state.currentId = id;
  document.getElementById("modalType").textContent = item.type;
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalVisual").outerHTML = `<div id="modalVisual">${visualMarkup(item)}</div>`;
  document.getElementById("modalBody").innerHTML = `<p>${item.body}</p><p class="clue-line">${item.clue}</p>`;
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
    showToast("六件文物档案已齐，古蜀文明故事已解锁。");
    setView("story");
  } else {
    showToast("文物档案已收录。");
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
