const WOODEN_PICKAXE = 0;
const STONE_PICKAXE = 1;
const IRON_PICKAXE = 2;
const GOLD_PICKAXE = 3;
const DIAMOND_PICKAXE = 4;
const WINNER = 5

const PICKAXE_LEVELS = ["wood", "stone", "iron", "gold", "diamond", "winner"];


// Resources
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
    cost: 40,
    type: "gold"
  },
  diamond: {
    level: DIAMOND_PICKAXE,
    cost: 80,
    type: "diamond"
  },
};

var resourceAmounts = {
  stone: 0,
  iron: 0,
  gold: 0,
  diamond: 0
};

function updateResourceAmount(resource, amount) {
  resourceAmounts[resource] = amount;
  var _resourceAmountElement = document.getElementById(`${resource}-amount`);
  _resourceAmountElement.innerHTML = resourceAmounts[resource];
}
// Resources End

// Level
var pickaxeLevel = WOODEN_PICKAXE;

// Level End


// Anvil Start
const anvilMenuElement = document.getElementById("anvil-menu");
function openAnvil() {
  document.getElementById("anvil-grid").innerHTML = "";
  for (let resource in anvilResources) {
    let resourceCraft = document.getElementById("anvil-craft-template").content.cloneNode(true);
    console.log(resourceCraft);

    resourceCraft.querySelector(".anvil-craft-name").innerHTML = resource;
    resourceCraft.querySelector(".anvil-craft-cost").innerHTML = anvilResources[resource].cost;
    resourceCraft.querySelector(".anvil-craft-type").innerHTML = anvilResources[resource].type;

    let craftButton = resourceCraft.querySelector(".anvil-craft-button");
    if (anvilResources[resource].level == pickaxeLevel + 1 &&
      resourceAmounts[resource] >= anvilResources[resource].cost) {
      craftButton.disabled = false;
      craftButton.innerText = "Craft";

      // Level Up
      craftButton.addEventListener("click", () => {
        // Reduce resources
        updateResourceAmount(
          resource,
          resourceAmounts[resource] - anvilResources[resource].cost
        )

        // Change Resource getting mined
        const resourceElement = document.querySelector(".resource");
        resourceElement.classList.remove(resource);

        // Change pickaxe level
        pickaxeLevel = Math.max(pickaxeLevel, anvilResources[resource].level);

        // Change Resource getting mined
        const nextResourceToMine = PICKAXE_LEVELS[pickaxeLevel + 1]
        resourceElement.classList.add(nextResourceToMine);
        resourceElement.querySelector("p").innerText = nextResourceToMine;

        anvilMenuElement.close();
      });
    }

    document.getElementById("anvil-grid").append(resourceCraft)
  }

  anvilMenuElement.showModal();
}

document.getElementById("anvil-open-button").addEventListener("click", openAnvil)
document.getElementById("anvil-close-button").addEventListener("click", () => { anvilMenuElement.close() })

// Anvil End


// Mining Start
function gainResource(event) {
  var _resourceElement = event.target.closest(".resource");
  if (!_resourceElement) return;

  for (let resource in resourceAmounts) {
    if (_resourceElement.classList.contains(resource)) {
      updateResourceAmount(
        resource,
        resourceAmounts[resource] + 1
      );
      return;
    }
  }
}

document.addEventListener("click", gainResource);

// Mining End