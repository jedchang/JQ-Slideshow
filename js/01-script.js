(function($) {
  // 對 slideshow 類別內的每個元素進行處理
  $('.slideshow').each(function() {
    // 變數準備
    // ---------------------------------------
    var imgArray = ['slide-1.jpg', 'slide-2.jpg', 'slide-3.jpg', 'slide-4.jpg', 'slide-5.jpg'];
    var slideGroup = $(this).find('.slideshow-slides');
    var slideCount = imgArray.length;

    var nav = $(this).find('.slideshow-nav');
    var pn = $(this).find('.slideshow-pagination');

    // 紀錄目前 slide index
    var currentIndex = 0;
    var pnHTML = '';
    var slideHTML = '';

    // 動態產生 img HTML 元素
    // ---------------------------------------
    for (var i = 0; i < imgArray.length; i++) {
      slideHTML += '<a href="javascript:;" class="slide"><img src="./images/slide-' + (i + 1) + '.jpg"></a>';
    }
    slideGroup.append(slideHTML);

    // 動態產生 pagination HTML 元素
    // ---------------------------------------
    for (var i = 0; i < imgArray.length; i++) {
      pnHTML = pnHTML + '<a href="javascript:;">' + (i + 1) + '</a>';
    }
    pn.html(pnHTML);

    // 函數定義
    // ---------------------------------------
    function goToChange(index) {
      // 紀錄當前 slide 的 index
      currentIndex = index;

      // 淡出: img 上一層 a 的全部子代 全部清除
      $('.slide img')
        .parent()
        .children()
        .fadeOut();

      // 淡入: img 上一層 a 的全部子代中的 index 秀出
      $('.slide img')
        .parent()
        .children()
        .eq(currentIndex)
        .fadeIn();

      updateNav();
    }

    function updateNav() {
      var btnPrev = nav.find('.prev');
      var btnNext = nav.find('.next');

      // 若為第一個 Slide 則 prev 按鈕無效
      if (currentIndex === 0) {
        btnPrev.addClass('disabled');
      } else {
        btnPrev.removeClass('disabled');
      }

      // 若為最後一個 Slide 則 next 按鈕無效
      if (currentIndex === slideCount - 1) {
        btnNext.addClass('disabled');
      } else {
        btnNext.removeClass('disabled');
      }

      // 從所有 Slide a 移除 active，再將當前 Slide a 加上 active
      pn.find('a')
        .removeClass('active')
        .eq(currentIndex)
        .addClass('active');
    }

    // click 事件
    // ---------------------------------------
    $('.next').on('click', function(e) {
      e.preventDefault();
      goToChange(currentIndex + 1);
      console.log('currentIndex:' + currentIndex);
    });
    $('.prev').on('click', function(e) {
      e.preventDefault();
      goToChange(currentIndex - 1);
      console.log('currentIndex:' + currentIndex);
    });

    $(pn.find('a')).on('click', function(e) {
      e.preventDefault();
      // console.log($(this).index());

      // 如果"沒有"包含 active 就執行
      if (!$(this).hasClass('active')) {
        // 參數帶入 目前的索引值
        goToChange($(this).index());
      }
    });

    // on() 多事件綁定不同函式
    $(this).on({
      // 滑鼠進入
      mouseenter: function() {
        stopTimer();
        console.log('mouseenter');
      },
      // 滑鼠離開
      mouseleave: function() {
        startTimer();
        console.log('mouseleave');
      }
    });

    // Timer 開始與暫停
    // ---------------------------------------
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

    // Timer 停止函式
    // ---------------------------------------
    function stopTimer() {
      clearInterval(timer);
    }

    // 初始化
    // ---------------------------------------
    goToChange(currentIndex);
    startTimer();
  });
})($);
