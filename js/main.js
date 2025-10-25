const greenland = document.getElementById("Greenland");
const blueland = document.getElementById("Blueland");
const territoryText = document.getElementById("territoryText");

outlinePaths(greenland);
outlinePaths(blueland);

function outlinePaths(group) {
	const paths = group.querySelectorAll("path");
	paths.forEach(path => {
		path.onmouseover = () => {group.classList.add("highlight"); territoryText.style.visibility = "visible"; territoryText.textContent=group.id};
		path.onmouseout  = () => {group.classList.remove("highlight"); territoryText.style.visibility = "hidden"};
		//path.onclick = () => {group.classList.add("select")};
	});
}