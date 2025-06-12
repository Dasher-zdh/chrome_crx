document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['minValue', 'maxValue'], (data) => {
    document.getElementById('minValue').value = data.minValue || '';
    document.getElementById('maxValue').value = data.maxValue || '';
  });

  document.getElementById('saveButton').addEventListener('click', () => {
    const minValue = parseFloat(document.getElementById('minValue').value);
    const maxValue = parseFloat(document.getElementById('maxValue').value);
    const status = document.getElementById('status');

    if (isNaN(minValue) || isNaN(maxValue)) {
      status.textContent = '请输入有效的数字！';
      return;
    }
    if (maxValue < minValue) {
      status.textContent = '最大值必须大于或等于最小值！';
      return;
    }

    chrome.storage.sync.set({
      minValue: minValue,
      maxValue: maxValue
    }, () => {
      status.textContent = '设置已保存！';
      setTimeout(() => {
        status.textContent = '';
      }, 2000);
    });
  });
});