function List(htmlElement) {
  var self         = this;
  this.header      = htmlElement.getElementsByClassName('list-header')[0];
  this.cardsBlock  = htmlElement.getElementsByClassName('list-cards')[0];
  this.cards       = htmlElement.getElementsByClassName('list-card');
  this._labelsList = this._createLabelsList();
  this.filter      = this._createFilter();

  this.filter.addEventListener("change", function(e) {
    var labeledElements = self.cardsBlock.getElementsByClassName('list-card-labels'),
        selectedOption  = e.target.value,
        notMatchedElements = Array.prototype.filter.call(labeledElements, function (element) {
          var cardLabels = element.getElementsByClassName('card-label');
          var contains = Array.prototype.some.call(cardLabels, function (el) { 
            return el.innerHTML === selectedOption; 
          });
          
          return cardLabels.length === 0 || !contains; 
        });

    if (!selectedOption) {
      Array.prototype.forEach.call(labeledElements, function (matchedElement) {
        matchedElement.parentElement.parentElement.setAttribute("style", "display: block");
      });
      
      return;
    }

    Array.prototype.forEach.call(labeledElements, function (matchedElement) {
      matchedElement.parentElement.parentElement.setAttribute("style", "display: block");
    });

    Array.prototype.forEach.call(notMatchedElements, function (matchedElement) {
      matchedElement.parentElement.parentElement.setAttribute("style", "display: none");
    });

  });
}

List.prototype._createLabelsList = function () {
  var domLabels  = this.cardsBlock.getElementsByClassName('card-label'),
      allLabels  = Array.prototype.map.call(domLabels, function (label) {
        return { 
            name: label.textContent, 
            class: label.classList[1]
          }; 
      }),
      unique     = {},
      labelsList = [];

  allLabels.forEach(function (label) {
    if (!unique[label.name]) {
      labelsList.push(label);
      unique[label.name] = true;
    }
  });

  return labelsList;
};

List.prototype._createFilter = function () {
  var selectNode = document.createElement("SELECT"),
      optionAll = document.createElement("OPTION"),
      textOptionAll   = document.createTextNode("All");
  
  optionAll.appendChild(textOptionAll);
  optionAll.setAttribute("value", "");
  selectNode.appendChild(optionAll);  

  this._labelsList.forEach(function (label) {
    var optionNode = document.createElement("OPTION"),
        textNode   = document.createTextNode(label.name);

    optionNode.setAttribute("value", label.name);
    optionNode.setAttribute("class", label.class);

    optionNode.appendChild(textNode);
    selectNode.appendChild(optionNode);
  });

  this.header.appendChild(selectNode);

  return selectNode;
};

var lists = document.getElementsByClassName('js-list-content');
var TrelloBoardFilters = Array.prototype.map.call(lists, function (list) {
  return new List(list);
});