const groups = document.querySelectorAll(".territory");
let selectedGroup = null;

groups.forEach(group => outlinePaths(group));

function outlinePaths(group) {
    const paths = group.querySelectorAll("path");

    paths.forEach(path => {
        path.onmouseover = () => {
            group.classList.add("highlight");
            territoryText.style.visibility = "visible";
            territoryText.textContent = group.id;
        };

        path.onmouseout = () => {
            group.classList.remove("highlight");
            territoryText.style.visibility = "hidden";
        };

        path.onclick = (e) => {
            e.preventDefault();
            if (selectedGroup && selectedGroup !== group) {
                selectedGroup.classList.remove("selected");
            }
            group.classList.add("selected");
            selectedGroup = group;

            group.parentNode.appendChild(group);
        };
    });
}

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (selectedGroup) {
        selectedGroup.classList.remove("selected");
        selectedGroup = null;
    }
});

let map = 0;

function changeMap(){
    map++;
    map = map % 2;

    const img = document.querySelector('.pngMap');
    img.src = `map/${map}.png`;
}
