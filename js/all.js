// TODO: 修正 ESLint 錯誤、補上分號、前輩說要改單引號 > done
const url = 'https://hexschool.github.io/js-filter-data/data.json';

// 選取 HTML 元素
const table = document.querySelector('.table-content');
const filter = document.querySelector('.filter');

// 全域使用的變數宣告
let data;
let showData = [];
let category = '';

// 全域使用的函式宣告
function renderData(ary) {
  let str = '';
  ary.forEach((plantObj) => {
    const tableRow = `
    <tr>
      <td> ${plantObj.作物名稱} </td>
      <td> ${plantObj.市場名稱} </td>
      <td> ${plantObj.上價} </td>
      <td> ${plantObj.中價} </td>
      <td> ${plantObj.下價} </td>
      <td> ${plantObj.平均價} </td>
      <td> ${plantObj.交易量} </td>
    </tr>`;
    str += tableRow;
  });
  table.innerHTML = str;
}

// 由 CDN 引入的 axios，要加上 window 表示其為掛載在全域下的物件
window.axios.get(url).then((res) => {
  // 排除沒有'作物名稱'屬性的物件，組成陣列 data
  data = res.data.filter((plantObj) => plantObj.作物名稱);
  // TODO: 之後拆成 renderData 函式 > done
  renderData(data);
});

function filterCategory(e) {
  if (e.target.nodeName === 'BUTTON') {
    // 蔬果的 category 是 N04, 水果是 N05
    category = e.target.dataset.category;
    showData = data.filter((plantObj) => plantObj.種類代碼 === category);
    // TODO: 之後拆成 renderData 函式 > done
    renderData(showData);
  }
}

// 針對 filter 區的監聽函式
filter.addEventListener('click', filterCategory);
