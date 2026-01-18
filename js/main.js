var nations = [];

(async () => {
	//SVG
    const svgData = await (await fetch("../map/map.svg")).text();
    document.getElementById("mapView").insertAdjacentHTML("beforeend", svgData);

	//JSON
    nations = await (await fetch("../assets/nations/nations.json")).json();
    loadMap();
})();

function loadMap() {
	const groups = document.querySelectorAll(".territory");
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
				}

				if (selectedGroup === group) {
					//unselecting by clicking again
					group.classList.remove("selected");
					selectedGroup = null;
					return;
				}

				group.classList.add("selected");
				const nation = nations.find(n => n.id === group.id);
				console.log(nation ? nation.name : group.id);
				
				selectedGroup = group;
				group.parentNode.appendChild(group);
			};
		});
	}

	document.addEventListener("contextmenu", e => {
		e.preventDefault();
		if (selectedGroup) {
			selectedGroup.classList.remove("selected");
			selectedGroup = null;
		}
	});
}
