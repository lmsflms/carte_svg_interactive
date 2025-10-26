const keirstand = document.getElementById("Keirstand");
const svalkuschtania = document.getElementById("Svalkuschtania");
const territoryText = document.getElementById("territoryText");

outlinePaths(keirstand);
outlinePaths(svalkuschtania);

function outlinePaths(group) {
	const paths = group.querySelectorAll("path");
	paths.forEach(path => {
		path.onmouseover = () => {group.classList.add("highlight"); territoryText.style.visibility = "visible"; territoryText.textContent=group.id};
		path.onmouseout  = () => {group.classList.remove("highlight"); territoryText.style.visibility = "hidden"};
	});
}