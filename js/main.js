var nations = [];

(async () => {
    //SVG
    const svgData = await (await fetch("map/map.svg")).text();
    document.getElementById("mapView").insertAdjacentHTML("beforeend", svgData);

    //JSON
    nations = await (await fetch("assets/nations/nations.json")).json();
	createAssemblyCompositionChart();
    loadMap();
})();

let assemblyCompositionChart;

function createAssemblyCompositionChart() {
    const options = {
		dataLabels: {enabled: false},
        chart: {
            type: 'donut',
            height: '100%',
            width: '100%',
			animations: { enabled: false }
        },
        series: [],
        labels: [],
        legend: {show: false},
		stroke: {show: false},
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
				expandOnClick: false,
                donut: {
                    size: '30%',
                },
            },
        },
        tooltip: { enabled: false },
    };

    assemblyCompositionChart = new ApexCharts(document.querySelector("#assemblyCompositionChart"), options);
    assemblyCompositionChart.render();
}

function updateAssemblyCompositionChart(nation) {
    if (!assemblyCompositionChart) return;

    const labels = nation.government.map(g => g.party);
    const data = nation.government.map(g => g.seats);
    const colors = nation.government.map(g => g.color);

    assemblyCompositionChart.updateOptions({
        labels: labels,
        colors: colors,
    });

    assemblyCompositionChart.updateSeries(data);
}

function loadMap() {
	const groups = document.querySelectorAll(".territory");
	const territoryLabel = document.getElementById("territoryLabel");
	const territoryFlag = document.getElementById("territoryFlag");

	const capital = document.getElementById('capital-val');
	const population = document.getElementById('population-val');
	const army = document.getElementById('army-val');
	const wealth = document.getElementById('wealth-val');

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
		  territoryFlag.style.visibility = "hidden";
		}

		group.classList.add("selected");
		territoryLabel.style.visibility = "visible";
		territoryFlag.style.visibility = "visible";
		const nation = nations.find(n => n.id === group.id);
		territoryLabel.textContent = nation.name;
		
		territoryFlag.src = `assets/nations/flags/${nation.id}.png`;
		territoryFlag.onerror = () => {
			territoryFlag.src = 'assets/nations/flags/placeholder.png'
		}
		
		capital.textContent = nation.capital;
		population.textContent = nation.population.at(-1);
		army.textContent = nation.army.at(-1);
		wealth.textContent = nation.wealth.at(-1);

		const populationTrend = checkTrend(nation.population);
		const armyTrend = checkTrend(nation.army);
		const wealthTrend = checkTrend(nation.wealth);

		population.classList.toggle("increase", populationTrend === 1);
		population.classList.toggle("decrease", populationTrend === -1);

		army.classList.toggle("increase", armyTrend === 1);
		army.classList.toggle("decrease", armyTrend === -1);

		wealth.classList.toggle("increase", wealthTrend === 1);
		wealth.classList.toggle("decrease", wealthTrend === -1);

		updateAssemblyCompositionChart(nation);

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
		territoryFlag.style.visibility = "hidden";
		selectedGroup = null;
	}
  });
}

function checkTrend(val){
    if (val.length < 2) return 0; //pas assez de données
	const previous = val.at(-2);
	const current = val.at(-1);

    if (current > previous) return 1; //augmentation
    else if (current < previous) return -1; //diminution
    else return 0; //stagnation
}
