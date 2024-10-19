console.log("The script has been injected")

// 字幕替換映射，格式為：'原字幕': '替換字幕'
const subtitleReplacements = {
  'sections at the start.': '替換字幕1',
  'We have what we call the intro track, where we focus on the basic building blocks of extensions using': '替換字幕2',
  "We'll be learning all about the different Chrome APIs and concepts required to build out most extension": '替換字幕3',
  // 可以繼續添加更多映射
};

function startObserving(targetElement) {
  console.log('已找到目標元素，開始監聽變化');

  // 創建一個 MutationObserver 實例用來追蹤DOM節點變化
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        const currentContent = targetElement.textContent.trim();
        console.log('當前字幕內容:', currentContent);

        // 檢查是否需要替換
        if (subtitleReplacements.hasOwnProperty(currentContent)) {
          const newContent = subtitleReplacements[currentContent];
          targetElement.textContent = newContent;
          console.log('字幕已替換:', newContent);
        }
      }
    });
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

// 提供一個函數來新增或更新替換映射
function updateSubtitleReplacement(original, replacement) {
  subtitleReplacements[original] = replacement;
  console.log(`已更新替換映射: '${original}' -> '${replacement}'`);
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

function convertToSubtitleObject(inputString) {
  // 將輸入字串按行分割
  const lines = inputString.split('\n');

  // 創建結果對象
  const result = {};

  // 遍歷每一行
  lines.forEach((line, index) => {
    if (line.trim() === '') {
      // 空行也要建立一個key-value，避免時間軸跑掉
      result[""] = "";
    } else {
      // 左邊原文，右邊譯文
      result[line] = "xxx";
    }
  });

  return result;
}