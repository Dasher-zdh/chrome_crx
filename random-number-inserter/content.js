// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fillRandomNumbers") {
    fillInputsWithRandomNumbers();
  }
});

function fillInputsWithRandomNumbers() {
  // 从 storage 获取用户设置的范围
  chrome.storage.sync.get(['minValue', 'maxValue'], (data) => {
    const minInput = data.minValue !== undefined ? data.minValue.toString() : '1';
    const maxInput = data.maxValue !== undefined ? data.maxValue.toString() : '1000';

    // 解析为数字
    const min = parseFloat(minInput);
    const max = parseFloat(maxInput);

    if (max < min) {
      alert('最大值必须大于或等于最小值！使用默认范围 1-1000。');
      fillInputs(1, 1000, false); // 默认填充整数
    } else {
      // 检查是否包含小数
      const hasDecimal = minInput.includes('.') || maxInput.includes('.') || !Number.isInteger(min) || !Number.isInteger(max);
      fillInputs(min, max, hasDecimal);
    }
  });
}

function fillInputs(min, max, hasDecimal) {
  const inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="search"], input:not([type])');
  inputs.forEach(input => {
    if (!input.readOnly && !input.disabled) {
      let randomNumber;
      if (hasDecimal) {
        // 填充小数，保留与输入值相同的小数位数
        const minDecimalPlaces = min.toString().split('.')[1]?.length || 0;
        const maxDecimalPlaces = max.toString().split('.')[1]?.length || 0;
        const decimalPlaces = Math.max(minDecimalPlaces, maxDecimalPlaces);

        // 生成随机小数
        randomNumber = parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
      } else {
        // 填充整数
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      input.value = randomNumber;
    }
  });
}