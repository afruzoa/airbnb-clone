const hamburger = document.querySelector(".hamburger") as HTMLElement;
const menu = document.querySelector(".menu") as HTMLElement;
hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});
// slide show
const prevBtn = document.querySelector(".prev-btn") as HTMLElement;
const nextBtn = document.querySelector(".next-btn") as HTMLElement;
const iconSection = document.querySelector(".icon-section") as HTMLElement;

function updateButtonVisibility() {
  if (iconSection.scrollLeft === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }

  if (
    iconSection.scrollLeft + iconSection.clientWidth >=
    iconSection.scrollWidth
  ) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "block";
  }
}

prevBtn.addEventListener("click", () => {
  iconSection.scrollBy({
    left: -iconSection.clientWidth,
    behavior: "smooth",
  });
});

nextBtn.addEventListener("click", () => {
  iconSection.scrollBy({
    left: iconSection.clientWidth,
    behavior: "smooth",
  });
});

iconSection.addEventListener("scroll", updateButtonVisibility);
updateButtonVisibility();

// who-menu
const guests = document.querySelector(".guests-search") as HTMLElement;
const guestMenu = document.querySelector(".who-menu") as HTMLElement;
guests.addEventListener("click", (event: MouseEvent) => {
  event.stopPropagation();
  guestMenu.classList.toggle("active");
});
// document.addEventListener("click", (event: MouseEvent) => {
//   if (!guests.contains(event.target as Node) && !guestMenu.contains(event.target as Node)) {
//     guestMenu.classList.remove("active");
//   }
// });
const searchItems = document.querySelectorAll(".search-item");
const searchBar = document.querySelector(".search-bar") as HTMLElement;
const activeSearchItems = (selectedItem: Element) => {
  selectedItem?.addEventListener("click", function () {
    searchItems?.forEach((item) => item.classList.remove("bg-white"));
    selectedItem.classList.toggle("bg-white");
    searchBar?.classList.add("bg-grey");
  });
};
searchItems.forEach((item) => activeSearchItems(item));

// where menu
const locations = document.querySelector(".where-box") as HTMLElement;
const locationMenu = document.querySelector(".region-select") as HTMLElement;
const inputField = document.querySelector(
  ".where-box input"
) as HTMLInputElement;
const regionItems = document.querySelectorAll(".region-item .country-text");
locations.addEventListener("click", (event) => {
  event.stopPropagation();
  locationMenu.classList.toggle("active");
});
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (!locationMenu.contains(target) && !locations.contains(target)) {
    locationMenu.classList.remove("active");
  }
});

regionItems.forEach((item) => {
  item.addEventListener("click", () => {
    const regionText = item.textContent;
    if (regionText) {
      inputField.value = regionText;
      locationMenu.classList.remove("active");
    }
  });
});

// exp searchbox
const expTab = document.querySelector(".exp");
const stayTab = document.querySelector(".stay");
const checkinBox = document.querySelector(".checkin-box");
const checkoutBox = document.querySelector(".checkout-box");
const dateBox = document.querySelector(".date-box");
expTab?.addEventListener("click", () => {
  checkinBox?.classList.add("display-none");
  checkoutBox?.classList.add("display-none");
  dateBox?.classList.remove("display-none");
});
stayTab?.addEventListener("click", () => {
  checkinBox?.classList.remove("display-none");
  checkoutBox?.classList.remove("display-none");
  dateBox?.classList.add("display-none");
});
// plus-minus
const plusButton = document.querySelector(".plus-button-adult");
const minusButton = document.querySelector(".minus-button-adult");
let adultCount = 2;
let infantCount = 0;
let childCount = 0;
let petCount = 0;

const updateCount = () => {
  const element = document.getElementById("adultCount");
  if (element) {
    element.textContent = adultCount.toString();
  }
  if (adultCount <= 1) {
    minusButton?.setAttribute("disabled", "true");
    minusButton?.classList.add("disabled");
  } else {
    minusButton?.removeAttribute("disabled");
    minusButton?.classList.remove("disabled");
  }
};
plusButton?.addEventListener("click", () => {
  if (adultCount < 16) {
    adultCount++;
    updateCount();
  }
});

minusButton?.addEventListener("click", () => {
  if (adultCount > 1) {
    adultCount--;
    updateCount();
  }
});

// who Button
const plusChildButton = document.querySelector(".plus-button-child");
const minusChildButton = document.querySelector(".minus-button-child");
plusChildButton?.addEventListener("click", () => {
  childCount++;
  const element = document.getElementById("childCount");
  if (element) {
    element.innerHTML = childCount.toString();
  }
});

minusChildButton?.addEventListener("click", () => {
  childCount--;
  const element = document.getElementById("childCount");
  if (element) {
    element.innerHTML = childCount.toString();
  }
});
//
const plusInfantButton = document.querySelector(".plus-button-infant");
const minusInfantButton = document.querySelector(".minus-button-infant");
plusInfantButton?.addEventListener("click", () => {
  infantCount++;
  const element = document.getElementById("infantCount");
  if (element) {
    element.innerHTML = infantCount.toString();
  }
});

minusInfantButton?.addEventListener("click", () => {
  infantCount--;
  const element = document.getElementById("infantCount");
  if (element) {
    element.innerHTML = infantCount.toString();
  }
});
//
const plusPetButton = document.querySelector(".plus-button-pet");
const minusPetButton = document.querySelector(".minus-button-pet");
plusPetButton?.addEventListener("click", () => {
  petCount++;
  const element = document.getElementById("petCount");
  if (element) {
    element.innerHTML = petCount.toString();
  }
});

minusPetButton?.addEventListener("click", () => {
  petCount--;
  const element = document.getElementById("petCount");
  if (element) {
    element.innerHTML = petCount.toString();
  }
});
//
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-links");
  const tabContents = document.querySelectorAll(".tab-content");

  tabContents.forEach((content) => {
    (content as HTMLElement).style.display = "none";
  });

  (tabContents[0] as HTMLElement).style.display = "block";
  (tabs[0] as HTMLElement).setAttribute("aria-selected", "true");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabContents.forEach((content) => {
        (content as HTMLElement).style.display = "none";
      });

      tabs.forEach((tab) => {
        (tab as HTMLElement).setAttribute("aria-selected", "false");
      });

      (tabContents[index] as HTMLElement).style.display = "block";

      (tabs[index] as HTMLElement).setAttribute("aria-selected", "true");
    });
  });
});
