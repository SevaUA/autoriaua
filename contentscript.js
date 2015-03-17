console.log("start...");

Number.prototype.formatMoney = function (c, d, t) {
  var n = this;
  c = Math.abs(c);
  c = isNaN(c) ? 2 : c;
  d = d === undefined ? "." : d;
  t = t === undefined ? "," : t;
  var s = n < 0 ? "-" : "";
  n = Math.abs(+n || 0);
  var i = parseInt(n.toFixed(c), 10).toString();
  var j = i.length;
  j = j > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var createCustomPanel = function () {
  var template = [
    '<div id="avaregePrice">',
    '<div><span id="avaregePrice-uah"></span> uah</div>',
    '<div><span id="avaregePrice-usd"></span> usd</div>',
    '<button>update</button>',
    '</div>'
  ].join('\n');
  var html = $(template);
  console.log('html', html);
  return html;
};

var priceFromText = function (priceText) {
  var clearText = priceText.replace(/\s+/g, '');
  var price = parseInt(clearText, 10);
  return price;
};

var calculatePriceSum = function (elements) {
  var sum = 0;
  elements.each(function (index, el) {
    var priceUAH = priceFromText($(this).text());
    sum += priceUAH;
  });
  return sum;
};

var update = function (currency, items, color) {
  if (color === undefined) {
    color = 'red';
  }
  items.css("border", "1px solid " + color);
  var sum = calculatePriceSum(items);
  var avarage = sum / items.length;
  $('#avaregePrice-' + currency).text(avarage.formatMoney(2, '.', ' '));
};

var process = function () {
  var results = $("#search_auto_results > .item");
  var prices = results.find(".price");
  var uah = prices.find(".grey");
  update('uah', uah);

  var usd = prices.find(".green");
  update('usd', usd, 'green');
};

$(document).ready(function () {
  console.log("ready!");
  var panel = createCustomPanel();
  $("body").append(panel);
  panel.find('button').click(function () {
    process();
  });
  process();
});
