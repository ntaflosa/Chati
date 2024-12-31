// Event-Listener, der ausgeführt wird, wenn der DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
  // Elemente aus dem DOM auswählen
  const livePrompt = document.querySelector("#live-prompt");
  const form = document.querySelector("form");

  // Farbänderung der Standard-Optionen in Dropdown-Menüs
  var selectElements = document.getElementsByTagName('select');
  for (var i = 0; i < selectElements.length; i++) {
    selectElements[i].options[0].style.color = '#a64bf4';
  }

// Funktion zum Aktualisieren des Live-Prompts
const updateLivePrompt = () => {
  // Werte aus dem Formular abrufen
  const contentType = document.querySelector("#content-type").value;
  const contentSubject = document.querySelector("#description").value;
  const contentLength = document.querySelector("#content-length").value;
  const targetAudience = document.querySelector("#target-audience").value;
  const languageStyle = document.querySelector("#language-style").value;
  const perspective = document.querySelector("#perspective").value;
  const selectedEmojiOption = document.querySelector('select[name="emoji-option"]').value;
  const addressForm = document.querySelector('select[name="address-form"]').value;
  const formattingOption = document.querySelector('select[name="formatting"]').value;
  const seoKeywordOption = document.querySelector('select[name="seo-keyword-option"]').value;
  const titleSubtitleOption = document.querySelector("#title-subtitle-option").value;

  // Überprüfen, ob der Benutzer die Option "Titel und Untertitel generieren" gewählt hat
  let titleSubtitleString = "";
  if (titleSubtitleOption === "ja") {
      titleSubtitleString = "- Generierung von Titel und Untertitel = [Ja]\n";
  } 
  

  // Live-Prompt-Text erstellen
  let message = `Generiere einen personalisierten Text unter Berücksichtigung folgender Details:\n` +
  titleSubtitleString +
  `- Verwendungszweck des Textes: [${contentType}]\n` +
  `- Thematische Beschreibung: [${contentSubject}]\n` +
  `- Gewünschte Textlänge: [${contentLength}]\n` +
  `- Zielgruppe: [${targetAudience}]\n` +
  `- Sprachstil: [${languageStyle}]\n` +
  `- Perspektive: [${perspective}]\n` +
  `- Anzahl der Emojis: [${selectedEmojiOption}]\n` +
  `- Anredeform: [${addressForm}]\n` +
  `- Formatierungsoptionen: [${formattingOption}]\n` +
  `- SEO-Keywords: [${seoKeywordOption}]`;

  // Live-Prompt-Text setzen
  livePrompt.textContent = message;
};


  // Event-Listener zum Aktualisieren des Live-Prompts
  form.addEventListener("input", updateLivePrompt); // Bei Eingabe
  form.addEventListener("change", updateLivePrompt); // Bei Auswahl

  // Event-Listener zum Kopieren des Prompts
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const textToCopy = livePrompt.textContent;
    navigator.clipboard.writeText(textToCopy).then(function () {
      alert("Der generierte Prompt wurde erfolgreich in den Zwischenspeicher übertragen!");
    }).catch(function (err) {
      console.error("Es gab ein Problem beim Kopieren des generierten Prompts in den Zwischenspeicher", err);
    });
  });

  // Event-Listener zum Anzeigen des Popups
  document.querySelector("#show-popup").addEventListener("click", function (event) {
    event.preventDefault();
    const popupText = document.querySelector(".popup-text");
    popupText.textContent = livePrompt.textContent;
    document.querySelector(".popup-overlay").style.display = "flex";
  });

  // Event-Listener zum Schließen des Popups
  document.querySelector("#close-popup").addEventListener("click", function () {
    document.querySelector(".popup-overlay").style.display = "none";
  });

  // Event-Listener zum Schließen des Popups beim Klicken außerhalb
  document.querySelector(".popup-overlay").addEventListener("click", function (event) {
    if (event.target === event.currentTarget) { // Wenn das Overlay selbst geklickt wird
      event.target.style.display = "none"; // Popup ausblenden
    }
  });

  // Aufruf der updateLivePrompt-Funktion beim Laden der Seite
  updateLivePrompt();


});

