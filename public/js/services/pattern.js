'use strict';

angular
  .module('app')
  .factory('PatternService', PatternService);

function PatternService() {

  return {
    generatePattern: generatePattern
  };

  function generatePattern(patternType, court, currentCase, profile) {
    var data;

    switch (patternType) {
      case "zayavlenie410":
        data = {
          courtName: court.name || "................................................................................................................................",
          courtAddress: court.address || "............................................................................................................................",
          courtTown: court.town || "........................................................ ",
          courtNumber: court.number || ".......................",
          clientName: currentCase.client.name || "...........................................................................................................................................................",
          clientNumber: currentCase.client.number || "............................................................................................",
          clientAddress: currentCase.client.address || "...........................................................................................",
          clientPhone: currentCase.client.phone || "........................................................................ ",
          clientFax: currentCase.client.fax || "......................................................",
          clientEmail: currentCase.client.email || "...........................................................................................................................",
          profileName: profile.name || "....................................................................................................................................",
          profilePhone: profile.phone || "........................................................................ ",
          profileFax: profile.fax || "......................................................",
          profileEmail: profile.email || "..........................................................................................................................."
        };
        break;
      case "molbaPredstDoc":
        data = {
          courtName: court.name || "................................................................................................................................",
          caseId: currentCase.info.number || "................/ ...........Г",
          clientName: currentCase.client.name || "...............................................................................",
          clientAddress: currentCase.client.address || "....................................................................................................."
        };
        break;
    }

    var patternName = patternType + ".docx"; // output file name
    var patternUrl = "patterns/" + patternName; // pick the corresponded file

    JSZipUtils.getBinaryContent(patternUrl, function (err, content) {
      var doc = new Docxgen(content);
      doc.setData(data); //set the templateVariables
      doc.render(); //apply them (replace all occurences...)
      var out = doc.getZip().generate({type: "blob"}); //Output the document using Data-URI
      saveAs(out, patternName);
    });
  }
}