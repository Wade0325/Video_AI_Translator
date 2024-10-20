var contentTabId;
chrome.runtime.onMessage.addListener(function (message, sender) {
  if (message.from == "content") {  //get content scripts tab id
    contentTabId = sender.tab.id;
  }
  let { APIKey, targetLabel, oriText, transText } = message;
  const oriTextLine = oriText.split('\n');
  // 分割成數組並過濾掉空行
  const tranedText = transText.split('\n').filter(line => line.trim() !== '');

  var textMap = new Map();
  new Promise((resolve) => {
    for (let i = 0; i < tranedText.length; i += 2) {
      if (i + 1 < tranedText.length) {
        textMap.set(tranedText[i], tranedText[i + 1]);
      }
    }

    for (let [key, value] of textMap) {
      console.log(`${key} => ${value}`);
    }

    resolve();
  }).then(() => {
    chrome.tabs.sendMessage(contentTabId, {
      from: "background",
      data: Object.fromEntries(textMap)  // 將 Map 轉換為普通對象
    });
  });
});

