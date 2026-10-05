// searchFilter.js

// 按整张表的顺序给行打上 row-odd / row-even，实现跨 tbody 的连续隔行变色
function markRowStripes() {
    ["table1", "table2"].forEach(id => {
        const table = document.getElementById(id);
        if (!table) return;

        const rows = table.querySelectorAll("tbody tr");
        rows.forEach((tr, i) => {
            tr.classList.toggle("row-odd", i % 2 === 0);
            tr.classList.toggle("row-even", i % 2 === 1);
        });
    });
}

function filterTable() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    let hasMatchTable1 = false;
    let hasMatchTable2 = false;

    // ========== 第一张表：拉丁缩写表单行过滤 ==========
    const table1 = document.getElementById("table1");
    const trs1 = table1.querySelectorAll("tbody tr");
    trs1.forEach(tr => {
        const text = tr.textContent.toLowerCase();
        const matched = text.includes(keyword);
        tr.style.display = matched ? "" : "none";
        if (matched) hasMatchTable1 = true;
    });

    // ========== 第二张表：拉丁语短语按词性整组过滤 ==========
    const table2Groups = document.querySelectorAll("#table2 tbody.group");
    table2Groups.forEach(groupTbody => {
        const trList = groupTbody.querySelectorAll("tr");
        let groupMatch = false;
        trList.forEach(tr => {
            const txt = tr.textContent.toLowerCase();
            if (txt.includes(keyword)) groupMatch = true;
        });
        groupTbody.style.display = groupMatch ? "" : "none";
        if (groupMatch) hasMatchTable2 = true;
    });

    // ========== 控制整张表区块（标题、表格、说明）整体显示/隐藏 ==========
    const block1 = document.getElementById("block1");
    const block2 = document.getElementById("block2");
    block1.style.display = hasMatchTable1 ? "block" : "none";
    block2.style.display = hasMatchTable2 ? "block" : "none";

    // ========== 无匹配结果提示 ==========
    const tipElement = document.getElementById("noResultTip");
    if (!hasMatchTable1 && !hasMatchTable2 && keyword !== "") {
        tipElement.style.display = "block";
    } else {
        tipElement.style.display = "none";
    }
}

// 页面脚本在 body 末尾加载，DOM 已就绪，直接执行
markRowStripes();