# JQ-Slideshow-exercise

![image](https://img.shields.io/badge/jQuery-exercise-0769AD.svg) ![image](https://img.shields.io/badge/SCSS-exercise-CD6799.svg)

![image](https://github.com/jedchang/JQ-Slideshow/blob/master/preview.jpg)

### 定義資料

- 使用 `each()` 對 slideshow 類別內的每個元素進行處理。
- 定義陣列資料，以供圖片選擇。 `var imgArray = ['slide-1.jpg', 'slide-2.jpg', 'slide-3.jpg', 'slide-4.jpg', 'slide-5.jpg'];`
- 設定變數紀錄 slide index。

```javascript
var currentIndex = 0;
var pnHTML = '';
var slideHTML = '';
```

### 函數定義

- 定義 function goToChange(index)，當中的參數 index 用來判斷目前位置。
- 紀錄當前 slide 的 index `currentIndex = index;`

### click 事件

- 清除預設。`e.preventDefault();`
- 點擊觸發 `goToChange(currentIndex + 1)`，帶入目前 currentIndex +1 或 -1
- 使用 `hasClass()` 判斷屬性有無包含 `.active`

### Timer 開始與暫停

- 自動撥放效果，有 setInterval 就要有 clearInterval
- 使用 `% (餘數)` 來判斷張數剩餘多少。

```javascript
var timer;
function startTimer() {
  // 切記: 有 setInterval 就要有 clearInterval
  timer = setInterval(function() {
    // 根據當前 slide 決定顯示下一個 slide
    // +1 因為索引從0開始，取總數量(5)的餘數
    // 0 + 1 % 5 = 1, 0 + 2 % 5 = 2 ... 0 + 5 % 5 = 0
    var nextIndex = (currentIndex + 1) % slideCount;
    goToChange(nextIndex);
  }, 5000);
}
```
