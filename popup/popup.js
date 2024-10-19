document.getElementById('change_button').addEventListener('click', function () {
  let APIKey = document.getElementById('APIKey').value;
  let targetLabel = document.getElementById('targetLabel').value;
  let oriText = document.getElementById('original-text').value;
  let transText = document.getElementById('translated-text').value;

  // post訊息到背景程序(background.js)
  chrome.runtime.sendMessage({ APIKey, targetLabel, oriText, transText });
});