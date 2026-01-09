const WOODEN_PICKAXE = 0;
const STONE_PICKAXE = 1;
const IRON_PICKAXE = 2;
const GOLD_PICKAXE = 3;
const DIAMOND_PICKAXE = 4;
const WINNER = 5

const PICKAXE_LEVELS = ["wood", "stone", "iron", "gold", "diamond", "winner"];


// #region Resources
var anvilResources = {
  stone: {
    level: STONE_PICKAXE,
    cost: 1,
    type: "stone"
  },
  iron: {
    level: IRON_PICKAXE,
    cost: 2,
    type: "iron"
  },
  gold: {
    level: GOLD_PICKAXE,
    cost: 4,
    type: "gold"
  },
  diamond: {
    level: DIAMOND_PICKAXE,
    cost: 8,
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

// #endregion Resources

// #region Level
var pickaxeLevel = WOODEN_PICKAXE;

function checkWin() {
  console.log(pickaxeLevel);

  if (pickaxeLevel + 1 == WINNER) {
    window.location.href = "win.html";
  }
}

function levelUpPickaxe() {
  const resourceElement = document.querySelector(".resource");
  const currentResourceMined = PICKAXE_LEVELS[pickaxeLevel + 1];
  resourceElement.classList.remove(currentResourceMined);

  // Change pickaxe level
  pickaxeLevel = Math.max(pickaxeLevel, pickaxeLevel + 1);
  // Check win
  checkWin();


  // Change Resource getting mined
  const nextResourceToMine = PICKAXE_LEVELS[pickaxeLevel + 1];
  resourceElement.classList.add(nextResourceToMine);
  resourceElement.querySelector("img").src = `./sprites/minerals/${nextResourceToMine}.png`;
}
// #endregion Level

// #region Anvil Start
const anvilMenuElement = document.getElementById("anvil-menu");
function openAnvil() {
  document.getElementById("anvil-grid").innerHTML = "";
  for (let resource in anvilResources) {
    let resourceCraft = document.getElementById("anvil-craft-template").content.cloneNode(true);

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
        );

        levelUpPickaxe();

        anvilMenuElement.close();
      });
    }

    document.getElementById("anvil-grid").append(resourceCraft)
  }

  anvilMenuElement.showModal();
}

document.getElementById("anvil-open-button").addEventListener("click", openAnvil)
document.getElementById("anvil-close-button").addEventListener("click", () => { anvilMenuElement.close() })

// #endregion Anvil

// #region Mining Start
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

// #endregion Mining