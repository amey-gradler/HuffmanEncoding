var Huffman = new HuffmanCoding(),
  timing;

//Encoder
var table = document.getElementsByTagName('table')[0];
var enCoder = document.getElementById('enCoder');

// Decoder
var deCoder = document.getElementById('deCoder');
var resultID = document.getElementById('result');

var analysis = document.getElementById('analysis');

//Events
enCoder.addEventListener('input', function inputListener(e) {
  //cleanup
  deCoder.disabled = true;
  timing = setTimeout(function () {
    removeAllRows(table.children);
    removeGraph();
    // removeAnalysis();
    DefaultValues();
    if (enCoder.value !== '') {
      Huffman.init(enCoder.value);
      updateTable(Huffman.table, Huffman.code);
      updateGraph(Huffman.table);
      res = Huffman.stat();
      createAnalysis(res);
      deCoder.disabled = false;
    }
  }, 400);
});

var res = Huffman.stat();
createAnalysis(res);

deCoder.addEventListener('input', function inputListener(e) {
  deCoder.value = e.target.value.replace(/[^01]/g, '');
  var list = Huffman.readCode(deCoder.value);
  resultID.innerHTML = list.join('');
});
// End of events

function createRow(char, apperane, probability, code) {
  var row = document.createElement('tr');

  var charTD = document.createElement('td');
  var apperaneTD = document.createElement('td');
  var probabilityTD = document.createElement('td');
  var codeTD = document.createElement('td');

  //copy the info
  charTD.innerHTML = char;
  apperaneTD.innerHTML = apperane;
  probabilityTD.innerHTML = probability + '%';
  codeTD.innerHTML = code;

  console.log;
  //styling
  codeTD.className = 'code';

  //append to the table
  row.appendChild(charTD);
  row.appendChild(apperaneTD);
  row.appendChild(probabilityTD);
  row.appendChild(codeTD);

  table.appendChild(row);
}

function createAnalysis(res) {
  var prevSize = document.getElementById('prevSize');

  var newSize = document.getElementById('newSize');
  var CompressionRatio = document.getElementById('cr');
  var CompressionPer = document.getElementById('cp');

  prevSize.innerHTML =
    'Total Bits in original string :' + res.totalBits + ' bits';

  newSize.innerHTML =
    'Total Bits in compressed string : ' + res.totalCode + ' bits';

  CompressionRatio.innerHTML =
    'Compression Ratio : ' + res.compressionRatio.toFixed(2);

  CompressionPer.innerHTML =
    'Compression Percentage : ' + res.compressionPercent.toFixed(2) + ' %';
}

//Default functions
function removeAllRows(elm) {
  var lastElm;
  while (elm.length > 1) {
    lastElm = elm.length - 1;
    elm[lastElm].parentNode.removeChild(elm[lastElm]);
  }
}

function removeGraph() {
  var graph = document.querySelector('svg');
  if (graph) graph.parentElement.removeChild(graph);
}

function DefaultValues() {
  deCoder.value = '';
  resultID.innerHTML = '';
}
//End of Default functions

//Update function
function updateGraph(HuffmanTable) {
  drawGraph(HuffmanTable);
}
function updateTable(keys, HuffmanCode) {
  var probability,
    frequency,
    size = enCoder.value.length;

  //End-result
  keys.forEach(function readElement(elm) {
    frequencys = elm.freq;
    probability = ((elm.freq / size) * 100).toFixed(0);
    var char = getChar(elm.value);
    createRow(char, frequencys, probability, elm.code);
  });
}
//End of Update function

//Helper functions
function getChar(char) {
  if (char.charCodeAt() == 32) {
    char = 'Space';
  } else if (char.charCodeAt() == 9) {
    char = 'Tabb';
  } else if (char.charCodeAt() == 10) {
    char = 'New Line';
  }
  return char;
}
