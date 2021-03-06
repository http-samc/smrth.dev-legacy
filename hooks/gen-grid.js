const fs = require('fs');

function genGrid(subdir) {
    var tagsAll = []

    var html = `<div class="grid-parent">`
    projectPaths = fs.readdirSync(`content/${subdir}`);
    projectPaths.forEach(function (path) {
        if (path === "_root.md" || !path.includes(".md")) return
        contents = fs.readFileSync(`content/${subdir}/${path}`, 'utf-8');
        lines = contents.split('\n');
        itemName = lines[0].replace('# ', '');
        url = itemName.replaceAll(' ', '-');
        if (url.includes('Tic-Tac-Toe')) url = url.toLowerCase();
        desc = lines[1].replace('<p align="center">', '').replace('</p>', '');
        tagsStr = lines[2].replace('<', '').replace('/>', '')
        tags = tagsStr.split(' ')
        tagsAll = [...new Set(tagsAll.concat(tags))];

        html += `
<div class="item ${tagsStr}" onclick="window.open('/${subdir}/${url}', '_self')">
<h4 class="item-header"><a href="/${subdir}/${url}" style="line-height: 31px; border-radius: 10px">${itemName}</a></h4>
<p class="item-desc">${desc}</p>
</div>
</a>
`
    });
    html += '</div>'
    filter = `<div id="filterParent"><button class="filterBtn" style="color: var(--bs-white); text-decoration: none; background-color: #121212; border-radius: 5px; padding: 3px 8px;" onclick="showOnly('item')">#all</button>`
    tagsAll.forEach((tag) => {
        if (tag === '') return
        filter += `<button class="filterBtn" onclick="showOnly('${tag}')">#${tag}</button>`
    })
    html = filter + '</div>' + html
    fs.writeFileSync(`fragments/${subdir}Grid.html`, html);
}

exports.genGrid = genGrid;