console.log("The script has been injected")
var textMap = {};
chrome.runtime.sendMessage({ from: "content" }); //first, tell the background page that this is the tab that wants to receive the messages.

chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.from == "background") {
    textMap = new Map(Object.entries(msg.data));
  }
});

function startObserving(targetElement) {
  console.log('已找到目標元素，開始監聽變化');

  if (textMap.size === 0) {
    console.log('textMap 為空，等待數據...');
    setTimeout(() => startObserving(targetElement), 1000);
    return;
  }


  var newContent;     // 譯後譯文
  var currentContent; // 當前頁面上內容

  // 創建一個 MutationObserver 實例用來追蹤DOM節點變化
  const observer = new MutationObserver((mutations) => {
    currentContent = targetElement.textContent.trim();
    if (currentContent === newContent) {
      currentContent = '';
    }

    console.log('當前字幕:', targetElement.textContent);

    for (let oriContent of textMap.keys()) {
      console.log("當前找到的原文：", oriContent);
      // 部分匹配，因翻譯後文本的結果可能為原文的多行合併
      if (currentContent !== "" && oriContent.includes(currentContent)) {
        console.log("找到匹配：", oriContent);
        newContent = textMap.get(oriContent);
        targetElement.textContent = newContent;
        console.log('字幕已替換:', targetElement.textContent);
        break;
      }
    }
  });

  // 配置 observer
  const config = {
    childList: true,
    characterData: true,
    subtree: true
  };

  // 開始監聽目標元素的變化
  observer.observe(targetElement, config);

  console.log('監聽器已啟動');
}


function findTargetElement() {
  const targetElement = document.querySelector('span.well--text--J1-Qi[style*="transform: none;"]');
  if (targetElement) {
    clearInterval(findInterval);
    startObserving(targetElement);
  } else {
    console.log('目標元素尚未找到，繼續等待...');
  }
}

// 每 500 毫秒檢查一次目標元素是否存在
const findInterval = setInterval(findTargetElement, 500);
console.log('開始尋找目標元素...');
