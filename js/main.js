/* ==========================================================================
   EASY CONFIGURATION SECTION
   Edit logo path, date ranges, package names, prices, item limits, and
   decoration placeholders here without needing to change the rest of the code.
   ========================================================================== */

const CONFIG = {
  // Drop your Party City logo into imgs/ with this filename (or update the path here)
  logoPath: "imgs/party-city-logo.png",

  // Set to false if you want students to be able to submit without filling every slot
  requireFullSelection: true,

  // Seasonal delivery/setup & takedown date picker configuration
  schedule: {
    requireDates: true,
    defaultSetupDate: "2026-12-01",
    minSetupDate: "2026-11-15",
    maxSetupDate: "2026-12-23",
    defaultTakedownDate: "2027-01-05",
    minTakedownDate: "2026-12-26",
    maxTakedownDate: "2027-01-31",
    defaultTimeWindow: "Morning (9:00 AM - 12:00 PM)"
  },

  packages: [
    {
      id: "package-a",
      tierLabel: "Starter Tier",
      name: "Package A",
      price: 199,
      description: "Placeholder description for the lower-priced starter rental package.",
      limits: {
        large: 1,
        medium: 2,
        small: 3
      }
    },
    {
      id: "package-b",
      tierLabel: "Most Popular",
      name: "Package B",
      price: 349,
      description: "Placeholder description for the middle-tier holiday rental package.",
      limits: {
        large: 2,
        medium: 3,
        small: 4
      }
    },
    {
      id: "package-c",
      tierLabel: "Full Experience",
      name: "Package C",
      price: 499,
      description: "Placeholder description for the premium all-out rental package.",
      limits: {
        large: 3,
        medium: 4,
        small: 5
      }
    }
  ],

  categories: [
    { key: "large", title: "Large Decorations", subtitle: "Statement pieces for your yard or main room." },
    { key: "medium", title: "Medium Decorations", subtitle: "Mid-sized accents for entryways, porches, and mantels." },
    { key: "small", title: "Small Decorations", subtitle: "Finishing touches like wreaths, tabletop pieces, and garlands." }
  ],

  // Add, remove, or rename items here. Drop matching photos into your imgs/ folder.
  decorations: {
    large: [
      { id: "large-1", name: "Large Item Placeholder 1", desc: "e.g., 8ft Pre-Lit Christmas Tree", img: "imgs/large-1.jpg" },
      { id: "large-2", name: "Large Item Placeholder 2", desc: "e.g., Giant Lawn Inflatable Santa", img: "imgs/large-2.jpg" },
      { id: "large-3", name: "Large Item Placeholder 3", desc: "e.g., Illuminated Reindeer & Sleigh", img: "imgs/large-3.jpg" },
      { id: "large-4", name: "Large Item Placeholder 4", desc: "e.g., Oversized Holiday Archway", img: "imgs/large-4.jpg" }
    ],
    medium: [
      { id: "medium-1", name: "Medium Item Placeholder 1", desc: "e.g., Light-Up Nutcracker Statue", img: "imgs/medium-1.jpg" },
      { id: "medium-2", name: "Medium Item Placeholder 2", desc: "e.g., Frosted Porch Pine Pair", img: "imgs/medium-2.jpg" },
      { id: "medium-3", name: "Medium Item Placeholder 3", desc: "e.g., Oversized Gift Box Stack", img: "imgs/medium-3.jpg" },
      { id: "medium-4", name: "Medium Item Placeholder 4", desc: "e.g., Animated Snowman Display", img: "imgs/medium-4.jpg" },
      { id: "medium-5", name: "Medium Item Placeholder 5", desc: "e.g., Mantel Village Set", img: "imgs/medium-5.jpg" }
    ],
    small: [
      { id: "small-1", name: "Small Item Placeholder 1", desc: "e.g., Classic Pine Door Wreath", img: "imgs/small-1.jpg" },
      { id: "small-2", name: "Small Item Placeholder 2", desc: "e.g., Pre-Lit Staircase Garland", img: "imgs/small-2.jpg" },
      { id: "small-3", name: "Small Item Placeholder 3", desc: "e.g., Holiday Table Centerpiece", img: "imgs/small-3.jpg" },
      { id: "small-4", name: "Small Item Placeholder 4", desc: "e.g., Set of Velvet Stockings", img: "imgs/small-4.jpg" },
      { id: "small-5", name: "Small Item Placeholder 5", desc: "e.g., Pathway Candy Cane Stakes", img: "imgs/small-5.jpg" },
      { id: "small-6", name: "Small Item Placeholder 6", desc: "e.g., Decorative Lantern Trio", img: "imgs/small-6.jpg" }
    ]
  },

  // The first option (addonPrice: 0) is included with every package.
  lights: [
    {
      id: "lights-basic",
      name: "Basic String Lights",
      desc: "Standard warm white string lights included with your rental package.",
      addonPrice: 0
    },
    {
      id: "lights-multicolor",
      name: "Multi-Color LED Lights",
      desc: "Upgrade to multi-color LED lights for a vibrant holiday display.",
      addonPrice: 45
    },
    {
      id: "lights-icicle",
      name: "Shimmering Icicle Lights",
      desc: "Placeholder upgrade (e.g., Shimmering Icicle & Tree Wrap Lights).",
      addonPrice: 75
    },
    {
      id: "lights-smart",
      name: "App-Controlled Musical Light Show",
      desc: "Placeholder upgrade (e.g., App-Controlled Musical Light Show).",
      addonPrice: 120
    }
  ]
};

/* ==========================================================================
   APPLICATION STATE & LOGIC
   ========================================================================== */

const state = {
  currentStep: 1,
  selectedPackageId: null,
  selections: {
    large: {},
    medium: {},
    small: {}
  },
  selectedLightId: CONFIG.lights[0].id,
  setupDate: CONFIG.schedule.defaultSetupDate,
  takedownDate: CONFIG.schedule.defaultTakedownDate,
  timeWindow: CONFIG.schedule.defaultTimeWindow
};

// DOM Elements
const brandLogo = document.getElementById("brand-logo");
const brandFallback = document.getElementById("brand-fallback");
const packageGrid = document.getElementById("package-grid");
const decorationCategoriesEl = document.getElementById("decoration-categories");
const lightsGrid = document.getElementById("lights-grid");
const setupDateInput = document.getElementById("setup-date");
const takedownDateInput = document.getElementById("takedown-date");
const timeWindowSelect = document.getElementById("time-window");
const scheduleStatusPill = document.getElementById("schedule-status-pill");
const btnConfirmPackage = document.getElementById("btn-confirm-package");
const btnBackToPackages = document.getElementById("btn-back-to-packages");
const btnSubmitChoices = document.getElementById("btn-submit-choices");
const btnEditChoices = document.getElementById("btn-edit-choices");
const btnStartOver = document.getElementById("btn-start-over");
const btnMockConfirm = document.getElementById("btn-mock-confirm");
const step1Error = document.getElementById("step-1-error");
const step2Error = document.getElementById("step-2-error");
const mockConfirmation = document.getElementById("mock-confirmation");

/* --- Header Logo Setup --- */
function initLogo() {
  brandLogo.addEventListener("load", () => {
    brandLogo.classList.remove("hidden");
    brandFallback.classList.add("hidden");
  });

  brandLogo.addEventListener("error", () => {
    brandLogo.classList.add("hidden");
    brandFallback.classList.remove("hidden");
  });

  brandLogo.src = CONFIG.logoPath;
}

/* --- Schedule / Date Helpers --- */
function initScheduleInputs() {
  setupDateInput.min = CONFIG.schedule.minSetupDate;
  setupDateInput.max = CONFIG.schedule.maxSetupDate;
  takedownDateInput.min = CONFIG.schedule.minTakedownDate;
  takedownDateInput.max = CONFIG.schedule.maxTakedownDate;

  syncScheduleInputsFromState();

  setupDateInput.addEventListener("change", (e) => {
    state.setupDate = e.target.value;
    step2Error.classList.add("hidden");
    updateSchedulePill();
  });

  takedownDateInput.addEventListener("change", (e) => {
    state.takedownDate = e.target.value;
    step2Error.classList.add("hidden");
    updateSchedulePill();
  });

  timeWindowSelect.addEventListener("change", (e) => {
    state.timeWindow = e.target.value;
  });
}

function syncScheduleInputsFromState() {
  setupDateInput.value = state.setupDate;
  takedownDateInput.value = state.takedownDate;
  timeWindowSelect.value = state.timeWindow;
  updateSchedulePill();
}

function updateSchedulePill() {
  if (state.setupDate && state.takedownDate && state.takedownDate > state.setupDate) {
    scheduleStatusPill.textContent = "Dates Selected";
    scheduleStatusPill.classList.add("complete");
  } else {
    scheduleStatusPill.textContent = "Dates Needed";
    scheduleStatusPill.classList.remove("complete");
  }
}

function formatDisplayDate(isoDateStr) {
  if (!isoDateStr) return "Not selected";
  const [year, month, day] = isoDateStr.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function getSelectedPackage() {
  return CONFIG.packages.find((pkg) => pkg.id === state.selectedPackageId) || null;
}

function getSelectedLight() {
  return CONFIG.lights.find((l) => l.id === state.selectedLightId) || CONFIG.lights[0];
}

function getCategoryTotal(categoryKey) {
  const counts = state.selections[categoryKey] || {};
  return Object.values(counts).reduce((sum, qty) => sum + qty, 0);
}

function resetDecorations() {
  state.selections = { large: {}, medium: {}, small: {} };
  state.selectedLightId = CONFIG.lights[0].id;
}

function resetSchedule() {
  state.setupDate = CONFIG.schedule.defaultSetupDate;
  state.takedownDate = CONFIG.schedule.defaultTakedownDate;
  state.timeWindow = CONFIG.schedule.defaultTimeWindow;
  syncScheduleInputsFromState();
}

/* --- Navigation --- */
function goToStep(stepNum) {
  state.currentStep = stepNum;

  document.querySelectorAll(".step-section").forEach((sec, idx) => {
    sec.classList.toggle("active", idx + 1 === stepNum);
  });

  document.querySelectorAll("[data-step-indicator]").forEach((el) => {
    const indicatorNum = Number(el.dataset.stepIndicator);
    el.classList.toggle("active", indicatorNum === stepNum);
    el.classList.toggle("completed", indicatorNum < stepNum);
  });

  step1Error.classList.add("hidden");
  step2Error.classList.add("hidden");

  if (stepNum === 2) {
    renderStep2();
  } else if (stepNum === 3) {
    mockConfirmation.classList.add("hidden");
    renderStep3();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* --- Step 1 Rendering --- */
function renderStep1() {
  packageGrid.innerHTML = "";

  CONFIG.packages.forEach((pkg) => {
    const isSelected = pkg.id === state.selectedPackageId;
    const card = document.createElement("div");
    card.className = `package-card${isSelected ? " selected" : ""}`;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    card.innerHTML = `
      <span class="package-tier-badge">${pkg.tierLabel}</span>
      <h2>${pkg.name}</h2>
      <div class="package-price">$${pkg.price} <span>/ season</span></div>
      <p class="package-desc">${pkg.description}</p>
      <ul class="package-features">
        <li>${pkg.limits.large} Large Decoration${pkg.limits.large > 1 ? "s" : ""}</li>
        <li>${pkg.limits.medium} Medium Decorations</li>
        <li>${pkg.limits.small} Small Decorations</li>
        <li>${CONFIG.lights[0].name} included (upgrades available)</li>
        <li>Full delivery, setup &amp; takedown</li>
      </ul>
      <div class="select-indicator">${isSelected ? "Selected" : "Choose " + pkg.name}</div>
    `;

    const handleSelect = () => {
      if (state.selectedPackageId !== pkg.id) {
        state.selectedPackageId = pkg.id;
        resetDecorations();
      }
      btnConfirmPackage.disabled = false;
      step1Error.classList.add("hidden");
      renderStep1();
    };

    card.addEventListener("click", handleSelect);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect();
      }
    });

    packageGrid.appendChild(card);
  });
}

/* --- Step 2 Rendering --- */
function renderStep2() {
  const pkg = getSelectedPackage();
  if (!pkg) return;

  document.getElementById("banner-pkg-name").textContent = pkg.name;
  document.getElementById("banner-pkg-price").textContent = `$${pkg.price}`;

  decorationCategoriesEl.innerHTML = "";

  CONFIG.categories.forEach((cat) => {
    const limit = pkg.limits[cat.key];
    const currentTotal = getCategoryTotal(cat.key);
    const isComplete = currentTotal === limit;

    const block = document.createElement("div");
    block.className = "category-block";

    block.innerHTML = `
      <div class="category-header">
        <div>
          <h2>${cat.title}</h2>
          <p class="category-subtitle">${cat.subtitle}</p>
        </div>
        <span class="counter-pill${isComplete ? " complete" : ""}">
          Selected: ${currentTotal} / ${limit}
        </span>
      </div>
      <div class="item-grid" data-category="${cat.key}"></div>
    `;

    const grid = block.querySelector(".item-grid");

    CONFIG.decorations[cat.key].forEach((item) => {
      const qty = state.selections[cat.key][item.id] || 0;
      const card = document.createElement("div");
      card.className = `item-card${qty > 0 ? " has-qty" : ""}`;

      card.innerHTML = `
        <div class="item-img-wrap">
          <img src="${item.img}" alt="${item.name}" />
          <div class="img-placeholder hidden">
            <strong>Image Placeholder</strong>
            <span>${item.img}</span>
          </div>
        </div>
        <div class="item-body">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="qty-controls">
            <button type="button" class="qty-btn btn-minus" aria-label="Remove one ${item.name}" ${qty === 0 ? "disabled" : ""}>&minus;</button>
            <span class="qty-value">${qty}</span>
            <button type="button" class="qty-btn btn-plus" aria-label="Add one ${item.name}" ${currentTotal >= limit ? "disabled" : ""}>+</button>
          </div>
        </div>
      `;

      // Show clean placeholder if the image file isn't in imgs/ yet
      const imgEl = card.querySelector("img");
      const placeholderEl = card.querySelector(".img-placeholder");
      imgEl.addEventListener("error", () => {
        imgEl.classList.add("hidden");
        placeholderEl.classList.remove("hidden");
      });

      card.querySelector(".btn-minus").addEventListener("click", () => {
        if (qty > 0) {
          state.selections[cat.key][item.id] = qty - 1;
          if (state.selections[cat.key][item.id] === 0) {
            delete state.selections[cat.key][item.id];
          }
          step2Error.classList.add("hidden");
          renderStep2();
        }
      });

      card.querySelector(".btn-plus").addEventListener("click", () => {
        if (getCategoryTotal(cat.key) < limit) {
          state.selections[cat.key][item.id] = qty + 1;
          step2Error.classList.add("hidden");
          renderStep2();
        }
      });

      grid.appendChild(card);
    });

    decorationCategoriesEl.appendChild(block);
  });

  renderLights();
  syncScheduleInputsFromState();
}

function renderLights() {
  lightsGrid.innerHTML = "";
  const selectedLight = getSelectedLight();
  const statusPill = document.getElementById("lights-status-pill");
  statusPill.textContent =
    selectedLight.addonPrice === 0
      ? "Included Selected"
      : `Add-On: +$${selectedLight.addonPrice}`;

  CONFIG.lights.forEach((light) => {
    const isSelected = light.id === state.selectedLightId;
    const isIncluded = light.addonPrice === 0;
    const card = document.createElement("div");
    card.className = `light-card${isSelected ? " selected" : ""}`;
    card.setAttribute("role", "radio");
    card.setAttribute("aria-checked", String(isSelected));
    card.setAttribute("tabindex", "0");

    card.innerHTML = `
      <div class="light-card-top">
        <h3>${light.name}</h3>
        <span class="light-price-tag${isIncluded ? " included" : ""}">
          ${isIncluded ? "Included" : "+$" + light.addonPrice}
        </span>
      </div>
      <p>${light.desc}</p>
    `;

    const selectLight = () => {
      state.selectedLightId = light.id;
      renderLights();
    };

    card.addEventListener("click", selectLight);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectLight();
      }
    });

    lightsGrid.appendChild(card);
  });
}

/* --- Step 3 Rendering --- */
function renderStep3() {
  const pkg = getSelectedPackage();
  const light = getSelectedLight();
  if (!pkg) return;

  document.getElementById("summary-pkg-name").textContent = pkg.name;
  document.getElementById("summary-pkg-desc").textContent = pkg.description;
  document.getElementById("summary-pkg-price").textContent = `$${pkg.price}`;

  const decListEl = document.getElementById("summary-decorations-list");
  decListEl.innerHTML = "";

  CONFIG.categories.forEach((cat) => {
    const groupBox = document.createElement("div");
    groupBox.className = "summary-group-box";

    const chosenItems = CONFIG.decorations[cat.key]
      .filter((item) => (state.selections[cat.key][item.id] || 0) > 0)
      .map((item) => ({
        name: item.name,
        qty: state.selections[cat.key][item.id]
      }));

    const itemsMarkup =
      chosenItems.length > 0
        ? chosenItems.map((i) => `<li><span>${i.name}</span><strong>&times;${i.qty}</strong></li>`).join("")
        : `<li><span class="muted-text">None selected</span></li>`;

    groupBox.innerHTML = `
      <h4>${cat.title}</h4>
      <ul>${itemsMarkup}</ul>
    `;

    decListEl.appendChild(groupBox);
  });

  document.getElementById("summary-lights-name").textContent = `Lighting: ${light.name}`;
  const lightsPriceEl = document.getElementById("summary-lights-price");
  if (light.addonPrice === 0) {
    lightsPriceEl.textContent = "Included";
    lightsPriceEl.className = "included-text";
  } else {
    lightsPriceEl.textContent = `+$${light.addonPrice} Add-On`;
    lightsPriceEl.className = "";
  }

  document.getElementById("summary-setup-date").textContent = formatDisplayDate(state.setupDate);
  document.getElementById("summary-takedown-date").textContent = formatDisplayDate(state.takedownDate);
  document.getElementById("summary-time-window").textContent = state.timeWindow;

  const total = pkg.price + light.addonPrice;
  document.getElementById("summary-total-price").textContent = `$${total}`;
}

/* --- Event Listeners --- */
btnConfirmPackage.addEventListener("click", () => {
  if (!state.selectedPackageId) {
    step1Error.textContent = "Please choose a package before continuing.";
    step1Error.classList.remove("hidden");
    return;
  }
  goToStep(2);
});

btnBackToPackages.addEventListener("click", () => goToStep(1));

btnSubmitChoices.addEventListener("click", () => {
  const pkg = getSelectedPackage();
  if (!pkg) return;

  if (CONFIG.requireFullSelection) {
    const missing = [];
    CONFIG.categories.forEach((cat) => {
      const remaining = pkg.limits[cat.key] - getCategoryTotal(cat.key);
      if (remaining > 0) {
        missing.push(`${remaining} more ${cat.title.toLowerCase()}`);
      }
    });

    if (missing.length > 0) {
      step2Error.textContent = `Please finish filling your package slots before continuing: select ${missing.join(", ")}.`;
      step2Error.classList.remove("hidden");
      return;
    }
  }

  if (CONFIG.schedule.requireDates) {
    if (!state.setupDate || !state.takedownDate) {
      step2Error.textContent = "Please choose both a delivery/setup date and a takedown date.";
      step2Error.classList.remove("hidden");
      return;
    }
    if (state.takedownDate <= state.setupDate) {
      step2Error.textContent = "Your takedown date must be after your delivery and setup date.";
      step2Error.classList.remove("hidden");
      return;
    }
  }

  goToStep(3);
});

btnEditChoices.addEventListener("click", () => goToStep(2));

btnStartOver.addEventListener("click", () => {
  state.selectedPackageId = null;
  resetDecorations();
  resetSchedule();
  btnConfirmPackage.disabled = true;
  renderStep1();
  goToStep(1);
});

btnMockConfirm.addEventListener("click", () => {
  mockConfirmation.classList.remove("hidden");
  mockConfirmation.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Initialize Page
initLogo();
initScheduleInputs();
renderStep1();