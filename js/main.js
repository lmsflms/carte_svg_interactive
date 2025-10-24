const svgObject = document.getElementById("map");
svgObject.addEventListener('load', () => {
    const svgMap = svgObject.contentDocument;
    
    const greenland = svgMap.getElementById("greenland");
    const blueland = svgMap.getElementById("blueland");

    outlinePaths(greenland.querySelectorAll("path"));

    outlinePaths(blueland.querySelectorAll("path"));
});

function outlinePaths(group){ //utiliser une classe css
    group.forEach(path => {
        path.onmouseover = () => {
            group.forEach(p => {
                p.style.strokeWidth = "0.5";
            });
        };

        path.onmouseout = () => {
            group.forEach(p => {
                p.style.strokeWidth = "0";
            });
        };
    });
}