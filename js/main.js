const A = document.getElementById("A");
const B = document.getElementById("B");
const C = document.getElementById("C");
const D = document.getElementById("D");
const E = document.getElementById("E");
const F = document.getElementById("F");

const territoryText = document.getElementById("territoryText");

outlinePaths(A);
outlinePaths(B);
outlinePaths(C);
outlinePaths(D);
outlinePaths(E);
outlinePaths(F);


function outlinePaths(group) {
	const paths = group.querySelectorAll("path");
	paths.forEach(path => {
		path.onmouseover = () => {group.classList.add("highlight"); territoryText.style.visibility = "visible"; territoryText.textContent=group.id};
		path.onmouseout  = () => {group.classList.remove("highlight"); territoryText.style.visibility = "hidden"};
	});
}