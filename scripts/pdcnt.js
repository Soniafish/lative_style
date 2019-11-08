$(function () {
    new pdContentUI(options).init();
    buildHTML(imgs, currentColor);

    $(".js-targetTop").click(function () {
        var id = $(this).data("target");
        var top = $("#" + id).offset().top;
        console.log($("body").width());
        console.log("top:" + top);
        if ($("body").width() < 1024) {
            top = top - 50;//header height
        } else {
            top = top - 100;//header height
        }
        $('html, body').animate({
            scrollTop: top
        }, 600);
    });
    
});

/* main interaction*/
function pdContentUI(options) {

    this.mainSlideGroup = options.mainPicWrap;
    this.colorChanger = $(options.colorChanger + ' a');
    this.sizeSelector = $(options.sizeSelector).find('select');
    this.numberChanger = $(options.numSelector).find('select');
    this.mainSlide = options.mainSlideClass;
    this.currentColor = options.initColor;
    this.currentSize;
    this.currentNumber;
    this.currentQty;
    var self = this;

    this.init = function () {
        this.colorEvent();
        this.sizeChangeEvent();
        this.qtyChangEvent();
    };

}

//pdcontent點顏色 換左邊整組圖片&換尺寸數量
pdContentUI.prototype.colorEvent = function () {
    var self = this;
    this.colorChanger.on('click', function (e) {
        e.preventDefault();
        var colorValue = $(this).data('color');
        self.currentColor = colorValue;

        //按鈕恢復
        $('.pdcnt_btn').removeClass('empty');

        //改變選顏色區樣式
        self.colorChanger.removeClass('active');
        $(this).addClass('active');

        //換左邊整組圖片
        self.activeTargetSlide(colorValue);

        //換尺寸數量
        self.activeTargetSize(colorValue);

        //更新值狀態
        self.currentSize = "";
        self.currentNumber = "";
        self.fillHiddenInput(self.currentColor, self.currentSize, self.currentNumber);

    });
}

pdContentUI.prototype.activeTargetSlide = function (colorVal) {
    var self = this;
    $(self.mainSlideGroup).removeClass('active');
    $(self.mainSlideGroup).each(function () {
        if ($(this).data('color') === colorVal) {
            $(this).addClass('active');
            // console.log($(this).html());
        }
    });
}

pdContentUI.prototype.activeTargetSize = function (colorVal) {
    var self = this;
    self.sizeSelector.removeClass('active');
    self.sizeSelector.each(function () {
        // console.log($(this).data('color'));
        if ($(this).data('color') === colorVal) {
            $(this).addClass('active');
        }
    });

}

//切換尺寸
pdContentUI.prototype.sizeChangeEvent = function () {
    var self = this;
    self.sizeSelector.on('change', function (e) {
        self.currentSize = $(e.target).val();
        // console.log('change size ' + self.currentSize);
        self.buildNumberSelect(parseInt($(e.target).find('option:selected').data('qty')));
        if (parseInt($(e.target).find('option:selected').data('qty')) === 0) {
            $('.pdcnt_btn').addClass('empty');
            self.currentNumber = 0;
        } else {
            $('.pdcnt_btn').removeClass('empty');
            if (parseInt($(e.target).find('option:selected').data('qty')) > 0){
                self.currentNumber = 1;
            }else{
                self.currentNumber = 0;
            }
        }

        //更新值狀態
        self.fillHiddenInput(self.currentColor, self.currentSize, self.currentNumber);
    });

}

//重新建構數量下拉
pdContentUI.prototype.buildNumberSelect = function(qty) {
    var self = this;
    // console.log("qty: "+qty);
    var optionHtml = '';
    this.numberChanger.empty();
    if ( qty == -1) {
        optionHtml = '<option value="' + 0 + '"> QTY </option>';
    } else if (qty == 0) {
        optionHtml = '<option value="' + 0 + '">' + 0 + '</option>';
    } else {
        for (var i = 0; i < qty; i++) {
            optionHtml = optionHtml + '<option value="' + (i + 1) + '">' + (i + 1) + '</option>';
        }
    }
    this.numberChanger.append(optionHtml);
}

pdContentUI.prototype.qtyChangEvent = function() {
    var self = this;
    self.numberChanger.on('change', function() {
        var num = parseInt(self.numberChanger.val());
        self.currentNumber = num;
        // console.log('current number: ' + self.currentNumber);
        self.fillHiddenInput(self.currentColor, self.currentSize, self.currentNumber);
    });
}

pdContentUI.prototype.fillHiddenInput = function (color, size, pdnumber) {
    $('input[name="pd_color"]').val(color);
    $('input[name="pd_size"]').val(size);
    $('input[name="pd_number"]').val(pdnumber);
    // console.log('color: ' + $('input[name="pd_color"]').val() + ',size: ' + $('input[name="pd_size"]').val() + ',number: ' + $('input[name="pd_number"]').val());
}
/* end main interaction*/

// 判斷圖存在與否
function buildHTML(imgs, color) {
    var finalHTML = '';
    var currentColor = color;
    for (var i = 0; i < imgs.length; i++) {
        var imgGroupHTML = '<div class="pdcnt_imgs clearfix" data-color="' + imgs[i].color + '">'+
                                '<div class="pdSlide">'+ 
                                    '<a><img src="' + imgs[i].img + '" alt=""></a>'+ 
                                '</div>'+ 
                            '</div>';
        finalHTML = finalHTML + imgGroupHTML;
    }
    finalHTML = finalHTML + "</div>";
    console.log(finalHTML);
    $('.pdcnt_top_left').append(finalHTML);

    try {
        $('.pdcnt_color a').each(function () {
            if (currentColor === '') {
                $('.pdcnt_color a').eq(0).click();
                return;
            }
            if (($(this).data('color')).toString() === currentColor) {
                $(this).click();
            }
        });
    } catch (e) { //colorCode not defined
        $('.pdcnt_color a').eq(0).click();
    }

}