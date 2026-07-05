const screens = [...document.querySelectorAll(".screen")];
const navItems = [...document.querySelectorAll(".nav-item")];
const toast = document.querySelector("#toast");
const calendarGrid = document.querySelector("#calendarGrid");
const face = document.querySelector("#face");
const noteText = document.querySelector("#noteText");

const days = [
  { n: 24, muted: true },
  { n: 25, muted: true },
  { n: 26, muted: true, dot: "green" },
  { n: 27, muted: true },
  { n: 28, muted: true },
  { n: 29, muted: true, dot: "pink" },
  { n: 30, muted: true },
  { n: 1 },
  { n: 2 },
  { n: 3 },
  { n: 4, dot: "green" },
  { n: 5 },
  { n: 6 },
  { n: 7, dot: "pink" },
  { n: 8 },
  { n: 9 },
  { n: 10 },
  { n: 11, selected: true },
  { n: 12, dot: "green" },
  { n: 13 },
  { n: 14, dot: "pink" },
  { n: 15 },
  { n: 16 },
  { n: 17 },
  { n: 18 },
  { n: 19, dot: "pink" },
  { n: 20 },
  { n: 21 },
  { n: 22 },
  { n: 23 },
  { n: 24 },
  { n: 25, dot: "pink" },
  { n: 26 },
  { n: 27 },
  { n: 28 }
];

const faces = {
  平静: ":|",
  开心: ":)",
  疲惫: "-_-",
  焦虑: ":/"
};

// -------------------------
// Toast
// -------------------------
function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

// -------------------------
// Screen switch
// -------------------------
function go(screenName) {
  if (screenName === "stats") {
    showToast("统计页会展示心情趋势和日程能量分布");
    return;
  }

  screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === screenName);
  });

  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.go === screenName);
  });
}

// -------------------------
// Calendar
// -------------------------
function buildCalendar() {
  if (!calendarGrid) return;

  calendarGrid.innerHTML = "";

  days.forEach((day) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "date";
    button.textContent = day.n;

    if (day.muted) button.classList.add("is-muted");
    if (day.selected) button.classList.add("is-selected");

    if (day.dot) {
      button.classList.add("has-dot");

      if (day.dot === "pink") {
        button.classList.add("has-pink");
      } else if (day.dot === "green") {
        button.classList.add("has-green");
      }
    }

    button.addEventListener("click", () => {
      document.querySelectorAll(".date").forEach((date) =>
        date.classList.remove("is-selected")
      );

      button.classList.add("is-selected");
      showToast(`${day.n} 日已选中`);
    });

    calendarGrid.appendChild(button);
  });
}

// -------------------------
// Global click handler
// -------------------------
document.addEventListener("click", (event) => {
  const goButton = event.target.closest("[data-go]");
  if (goButton) go(goButton.dataset.go);

  const quickMood = event.target.closest("[data-mood]");
  if (quickMood) {
    document.querySelectorAll("[data-mood]").forEach((button) =>
      button.classList.remove("is-selected")
    );

    quickMood.classList.add("is-selected");
    showToast(`今天的心情：${quickMood.dataset.mood}`);
  }

  const moodButton = event.target.closest("[data-mood-pick]");
  if (moodButton) {
    document.querySelectorAll("[data-mood-pick]").forEach((button) =>
      button.classList.remove("is-selected")
    );

    moodButton.classList.add("is-selected");
    if (face) {
      face.textContent = faces[moodButton.dataset.moodPick] || ":)";
    }
  }
});

// -------------------------
// Buttons (safe binding)
// -------------------------
document.querySelector("#addPlan")?.addEventListener("click", () => {
  showToast("已准备新增日程入口");
});

document.querySelector("#saveMood")?.addEventListener("click", () => {
  const text = noteText?.value?.trim();

  showToast(text ? "心情记录已保存" : "已保存当前心情");
});

// -------------------------
// Init
// -------------------------
buildCalendar();
