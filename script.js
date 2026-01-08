const WOODEN_PICKAXE = 0;
const STONE_PICKAXE = 1;
const IRON_PICKAXE = 2;
const GOLD_PICKAXE = 3;
const DIAMOND_PICKAXE = 4;

var anvilResources = {
  stone: {
    level: STONE_PICKAXE,
    cost: 10,
    type: "stone"
  },
  iron: {
    level: IRON_PICKAXE,
    cost: 20,
    type: "iron"
  },
  gold: {
    level: GOLD_PICKAXE,
    cost: 20,
    type: "gold"
  },
  diamond: {
    level: DIAMOND_PICKAXE,
    cost: 20,
    type: "diamond"
  },
};

var resourceAmounts = {
  stone: 0,
  iron: 0,
  gold: 0,
  diamond: 0
};

var pickaxeLevel = WOODEN_PICKAXE;


// Anvil Start
const anvilMenuElement = document.getElementById("anvil-menu");
function openAnvil() {
  for (let resource in anvilResources) {
    let resourceCraft = document.getElementById("anvil-craft-template");
    resourceCraft.querySelector()
  }

  anvilMenuElement.showModal();
}

document.getElementById("anvil-open-button").addEventListener("click", openAnvil)
document.getElementById("anvil-close-button").addEventListener("click", anvilMenuElement.close)

// Anvil End


// Mining Start
function gainResource(event) {
  var _resourceElement = event.target.closest(".resource");
  if (!_resourceElement) return;


  for (let resource in resourceAmounts) {
    if (_resourceElement.classList.contains(resource)) {
      resourceAmounts[resource] += 1;
      var _resourceAmountElement = document.getElementById(`${resource}-amount`)
      _resourceAmountElement.innerHTML = resourceAmounts[resource];
      return;
    }
  }
}

document.addEventListener("click", gainResource);