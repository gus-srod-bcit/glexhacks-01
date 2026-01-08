resourceAmounts = {
  "stone": 0,
  "iron": 0,
  "gold": 0,
  "diamond": 0
};

function gainResource(event) {
  var _resourceElement = event.target.closest(".resource");
  if (!_resourceElement) return;


  for (let resource in resourceAmounts) {
    console.log(resource);
    if (_resourceElement.classList.contains(resource)) {
      resourceAmounts[resource] += 1;
      var _resourceAmountElement = document.getElementById(`${resource}-amount`)
      _resourceAmountElement.innerHTML = resourceAmounts[resource];
      return;
    }
  }
}


document.addEventListener("click", gainResource);