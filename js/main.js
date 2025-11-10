fetch("map/map.svg")
    .then(r => r.text())
    .then(svgData => {
        document.getElementById("mapDiv").insertAdjacentHTML("beforeend", svgData);
        loadMap();
    })

function loadMap(){
    const groups = document.querySelectorAll(".territory");
    let selectedGroup = null;

    groups.forEach(group => outlinePaths(group));

    function outlinePaths(group) {
        const paths = group.querySelectorAll("path");

        paths.forEach(path => {
            path.onmouseover = () => {
                group.classList.add("highlight");
            };

            path.onmouseout = () => {
                group.classList.remove("highlight");
            };

            path.onclick = (e) => {
                e.preventDefault();
                if (selectedGroup && selectedGroup !== group) {
                    selectedGroup.classList.remove("selected");
                    territoryText.style.visibility = "hidden";
                }
                group.classList.add("selected");
                territoryText.style.visibility = "visible";
                territoryText.textContent = group.id;

                selectedGroup = group;

                group.parentNode.appendChild(group);
            };
        });
    }
    
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (selectedGroup) {
            selectedGroup.classList.remove("selected");
            territoryText.style.visibility = "hidden";
            selectedGroup = null;
        }
    });
}

let map = 0;
var numMap = 1;

function changeMap(){
    map++;
    map = map % numMap;

    const img = document.querySelector('.pngMap');
    img.src = `map/${map}.png`;
}
