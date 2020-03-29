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
//   	"Bioinformatyka 2. Wykład, grupa nr 1 [WBT-BINF2-1.1 19/20Z WYK 1]",
//    "Bioinformatyka 2. Ćwiczenia, grupa nr 1 [WBT-BINF2-1.1 19/20Z CW 1]",
//    "Biologia komórki - kurs dla biochemików. Wykład, grupa nr 1 [WBT-BCH336 19/20Z WYK 1]",
//  	"DO NOT EDIT THIS LINE"
//]

//edit this list to hide chosen courses
var filteredList = [
   	"Course name [id]",
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
