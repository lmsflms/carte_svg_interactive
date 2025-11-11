fetch("map/map.svg")
  .then(r => r.text())
  .then(svgData => {
	document.getElementById("mapView").insertAdjacentHTML("beforeend", svgData);
	loadMap();
  });

function loadMap() {
  const groups = document.querySelectorAll(".territory");
  const territoryLabel = document.getElementById("territory-label");
  let selectedGroup = null;

  groups.forEach(group => outlinePaths(group));

  function outlinePaths(group) {
	const paths = group.querySelectorAll("path");

	paths.forEach(path => {
	  path.onmouseover = () => group.classList.add("highlight");
	  path.onmouseout = () => group.classList.remove("highlight");

	  path.onclick = e => {
		e.preventDefault();
		if (selectedGroup && selectedGroup !== group) {
		  selectedGroup.classList.remove("selected");
		  territoryLabel.style.visibility = "hidden";
		}

		group.classList.add("selected");
		territoryLabel.style.visibility = "visible";
		territoryLabel.textContent = group.id;

		selectedGroup = group;
		group.parentNode.appendChild(group);
	  };
	});
  }

  document.addEventListener("contextmenu", e => {
	e.preventDefault();
	if (selectedGroup) {
	  selectedGroup.classList.remove("selected");
	  territoryLabel.style.visibility = "hidden";
	  selectedGroup = null;
	}
  });
}
