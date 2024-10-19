chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  let { APIKey, targetLabel, oriText, transText } = message;
  const oriTextLine = oriText.split('\n');
  console.log(`原文: ${oriTextLine}`);
  console.log(`原文: ${oriTextLine.length}`);
  console.log(`譯文: ${transText}`);

  oriTextLine.forEach((line, index) => {
    console.log(`第 ${index + 1} 行: ${line}`);
  });

  let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  let activeTab = tabs[0];
  // chrome.scripting.executeScript({
  //   target: { tabId: activeTab }
  // })

  const subtitleReplacements = {
    '原字幕1': '替換字幕1',
    '原字幕2': '替換字幕2',
    // 可以繼續添加更多映射
  };

});

