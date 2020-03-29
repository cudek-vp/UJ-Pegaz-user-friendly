// ==UserScript==
// @name     Pegaz user-friendly
// @namespace https://pegaz.uj.edu.pl/my/
// @version  1
// @include https://pegaz.uj.edu.pl/my/
// @grant    none
// @author Tomasz Cudek
// @description The script to sipmplify UJ Pegaz interface. Additionaly, if you see unwanted courses on your courses list, choose edit script option and add unwanted courses to the filteredList.
// ==/UserScript==

//example filterd list (the actual list to edit is below this example):
//var filteredList = [
//    "Bioinformatyka 2. Wykład, grupa nr 1 [WBT-BINF2-1.1 19/20Z WYK 1]",
//    "Bioinformatyka 2. Ćwiczenia, grupa nr 1 [WBT-BINF2-1.1 19/20Z CW 1]",
//    "Biologia komórki - kurs dla biochemików. Wykład, grupa nr 1 [WBT-BCH336 19/20Z WYK 1]",
//    "DO NOT EDIT THIS LINE"
//]

//edit this list to hide chosen courses
var filteredList = [
   	"Bioinformatyka 2. Wykład, grupa nr 1 [WBT-BINF2-1.1 19/20Z WYK 1]",
    "Bioinformatyka 2. Ćwiczenia, grupa nr 1 [WBT-BINF2-1.1 19/20Z CW 1]",
    "Biologia komórki - kurs dla biochemików. Wykład, grupa nr 1 [WBT-BCH336 19/20Z WYK 1]",
    "Biologia komórki - kurs dla biochemików. Ćwiczenia, grupa nr 5 [WBT-BCH336 19/20Z CW 5]",
    "Biologia strukturalna. Konwersatorium, grupa nr 1 [WBT-BINF2-1.6 19/20Z KON 1]",
    "Biologia strukturalna. Wykład, grupa nr 1 [WBT-BINF2-1.6 19/20Z WYK 1]",
    "Biologia strukturalna. Ćwiczenia, grupa nr 1 [WBT-BINF2-1.6 19/20Z CW 1]",
    "Filogenetyka molekularna. Konwersatorium, grupa nr 1 [WBT-BINF2-1.5 19/20Z KON 1]",
    "Filogenetyka molekularna. Ćwiczenia, grupa nr 1 [WBT-BINF2-1.5 19/20Z CW 1]",
    "Język angielski-C1-30 godzin/1 semestr. Lektorat, grupa nr 6 [JCJ-A-WBT-C1-30/1 19/20Z LEK 6]",
    "Lista mailingowa - kierunki studiów WBBiB. Kształcenie na odległość, grupa nr 15 [WBT-02 19/20 EL 15]",
    "Lista mailingowa - studenci WBBiB. Kształcenie na odległość, grupa nr 1 [WBT-01 19/20 EL 1]",
    "Modelowanie molekularne 2. Konwersatorium, grupa nr 1 [WBT-BINF2-1.3 19/20Z KON 1]",
    "Modelowanie molekularne 2. Ćwiczenia, grupa nr 1 [WBT-BINF2-1.3 19/20Z CW 1]",
    "Next-Generation Sequencing and Data Analysis. Wykład, grupa nr 1 [WBT-BINF2-1.4 19/20Z WYK 1]",
    "Next-Generation Sequencing and Data Analysis. Ćwiczenia, grupa nr 1 [WBT-BINF2-1.4 19/20Z CW 1]",
    "Proteomika. Wykład, grupa nr 1 [WBT-BINF2-1.2 19/20Z WYK 1]",
    "Proteomika. Ćwiczenia, grupa nr 1 [WBT-BINF2-1.2 19/20Z CW 1]",
    "Równania różniczkowe. Wykład, grupa nr 1 [WBT-BINF2-1.7 19/20Z WYK 1]",
    "Równania różniczkowe. Ćwiczenia, grupa nr 1 [WBT-BINF2-1.7 19/20Z CW 1]",
    "Sygnalizacja komórkowa. Konwersatorium, grupa nr 2 [WBT-BCH356 19/20Z KON 2]",
    "Sygnalizacja komórkowa. Wykład, grupa nr 1 [WBT-BCH356 19/20Z WYK 1]",
    "Szkolenie USOSweb dla studentów WBBiB. Kształcenie na odległość, grupa nr 7 [WBT-BT638 19/20Z EL 7]",
  	"DO NOT EDIT THIS LINE"
]

var coursesView = document.getElementById("courses-view-in-progress");
var coursesHrefs = coursesView.getElementsByClassName("c-title");

var simplifiedHrefs = []

// create simplified links excluding the ones that are in filtered list
for (var i=0; i < coursesHrefs.length; ++i){
  if (!filteredList.includes(coursesHrefs[i].text)){
  	var courseHref = coursesHrefs[i];
  	var simplifiedHref = document.createElement('a');
  	simplifiedHref.setAttribute("href", courseHref.getAttribute("href"));
  	simplifiedHref.innerHTML = courseHref.text
  	simplifiedHrefs.push(simplifiedHref)
  }
}

// sort links by text
simplifiedHrefs.sort(function(a, b) {
  return a.innerHTML == b.innerHTML
          ? 0
          : (a.innerHTML > b.innerHTML ? 1 : -1);
});

// add links to document 
var coursesDiv=document.createElement("div");
coursesView.insertBefore(coursesDiv, coursesView.getElementsByClassName("text-xs-center text-center")[0]);

var coursesList = document.createElement('ul');
coursesDiv.appendChild(coursesList);

for (var i=0; i < simplifiedHrefs.length; ++i){
  var courseItem = document.createElement('li');
  courseItem.appendChild(simplifiedHrefs[i]);
  coursesList.appendChild(courseItem);
}

//hide previous view
document.getElementById("pc-for-in-progress").style.display="none";
