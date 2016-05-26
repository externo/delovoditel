module.exports = function() {

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
      case "molbaIzdSydUdost":
        data = {
          courtName: court.name || "................................................................................................................................",
          caseId: currentCase.info.number || "................/ ...........Г",
          clientName: currentCase.client.name || "...............................................................................",
          clientAddress: currentCase.client.address || "....................................................................................................."
        };
        break;
      case "molbaZavPrepisIL":
        data = {
          courtName: court.name || "................................................................................................................................",
          caseId: currentCase.info.number || "................/ ...........Г",
          clientName: currentCase.client.name || "...............................................................................",
          clientAddress: currentCase.client.address || ".....................................................................................................",
          clientPhone: currentCase.client.phone || "........................................................................ ",
          clientEmail: currentCase.client.email || "..........................................................................................................................."
        };
        break;
      case "molbaOFG":
        data = {
          courtName: court.name || "................................................................................................................................",
          caseId: currentCase.info.number || "................/ ...........Г",
          clientName: currentCase.client.name || "...............................................................................",
          clientAddress: currentCase.client.address || ".....................................................................................................",
          clientPhone: currentCase.client.phone || "........................................................................ ",
          clientEmail: currentCase.client.email || "..........................................................................................................................."
        };
        break;
      case "molbaReabilitacia":
        data = {
          courtName: court.name || "................................................................................................................................",
          caseId: currentCase.info.number || "................/ ...........Г",
          clientName: currentCase.client.name || "...............................................................................",
          clientNumber: currentCase.client.number || ".......................",
          clientAddress: currentCase.client.address || ".....................................................................................................",
          clientPhone: currentCase.client.phone || "........................................................................ ",
          clientEmail: currentCase.client.email || "..........................................................................................................................."
        };
        break;
      case "molbaIzmProcesPrinuda":
        data = {
          courtName: court.name || "................................................................................................................................",
          caseId: currentCase.info.number || "................/ ...........Г",
          clientName: currentCase.client.name || "...............................................................................",
          clientNumber: currentCase.client.number || ".......................",
          clientAddress: currentCase.client.address || ".....................................................................................................",
          clientPhone: currentCase.client.phone || "........................................................................ ",
          clientEmail: currentCase.client.email || "..........................................."
        };
        break;
      case "svidetelstvoSydimost":
        data = {
          courtTown: court.town || "...............",
          clientName: currentCase.client.name || "..........................................................................................................................",
          clientNumber: currentCase.client.number || ".......................",
          clientAddress: currentCase.client.address || "........................................................................................................"
        };
        break;
      case "molbaObrIzpDelo":
        data = {
          caseId: currentCase.info.number || "................/ ...........Г",
          caseType: currentCase.info.type || '...................',
          courtName: court.name || "...........................",
          clientName: currentCase.client.name || "....................................................",
          clientNumber: currentCase.client.number || "..................................",
          clientAddress: currentCase.client.address || "..............................................................",
          clientPhone: currentCase.client.phone || ".............................."
        };
        break;
      case "naddavatelnoPredlojenie":
        data = {
          courtName: court.name || "................................................................................................................................",
          caseId: currentCase.info.number || "................/ ...........Г",
          clientName: currentCase.client.name || "..............................................................",
          clientNumber: currentCase.client.number || "..........................................",
          clientAddress: currentCase.client.address || ".........................................................................................................",
          clientPhone: currentCase.client.phone || ".........................................................................",
          profileName: profile.name || "............................................................................................."
        };
        break;
    }

    var patternName = patternType + ".docx"; // search file name
    var patternUrl = "patterns/" + patternName; // pick the corresponded file
    var outputName = patternType + '  ' + moment().format('DD.MM.YYYY  HH.mm') + ".docx"; // output file name

    JSZipUtils.getBinaryContent(patternUrl, function (err, content) {
      var doc = new Docxgen(content);
      doc.setData(data); //set the templateVariables
      doc.render(); //apply them (replace all occurences...)
      var out = doc.getZip().generate({type: "blob"}); //Output the document using Data-URI
      saveAs(out, outputName);
    });
  }
};