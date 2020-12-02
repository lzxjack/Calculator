$(function() {
    // --------模块拖拽功能-----------------------------------------------
    // 按钮打开功能
    $(".cal-btn").on("click", function() {
        $(".bg").css("display", "block");
        $(".Calculator").css("display", "block");
        $(".tips").css("display", "block");
    });

    // 关闭计算器功能
    $(".close").on("click", function() {
        $(".bg").css("display", "none");
        $(".Calculator").css("display", "none");
        $(".tips").css("display", "none");
    });

    var header = document.querySelector(".header");
    var Calculator = document.querySelector(".Calculator");
    // 拖动功能
    header.addEventListener('mousedown', function(e) {
        // 鼠标按下对话框顶部时，获取鼠标到对话框的距离
        let x = e.pageX - Calculator.offsetLeft;
        let y = e.pageY - Calculator.offsetTop;
        // 鼠标按下并移动时，实时更新对话框的位置
        document.addEventListener('mousemove', move);

        function move(e) {
            Calculator.style.left = e.pageX - x + 'px';
            Calculator.style.top = e.pageY - y + 'px';
        }
        // 鼠标松开时，移除拖拽的动作
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', move);
        });
    });


    // --------计算器功能-------------------------------------------------
    let equation = '';

    // 将字符显示在显示区的函数
    function replaceDisplay() {
        let str;
        // 将显示区域中“/”和“*”替换为“÷”和“×”
        str = equation.replace(/\//g, '÷').replace(/\*/g, '×');
        $(".display").html(str);
    }

    // 实现退格的函数
    function deleteOne() {
        equation = equation.substring(0, equation.length - 1);
        replaceDisplay();
    }

    $(".AC").on("click", function() {
        equation = '';
        $(".display").html(equation);
    });
    $(".zero").on("click", function() {
        equation += '0';
        replaceDisplay();
    });
    $(".one").on("click", function() {
        equation += '1';
        replaceDisplay();
    });
    $(".two").on("click", function() {
        equation += '2';
        replaceDisplay();
    });
    $(".three").on("click", function() {
        equation += '3';
        replaceDisplay();
    });
    $(".four").on("click", function() {
        equation += '4';
        replaceDisplay();
    });
    $(".five").on("click", function() {
        equation += '5';
        replaceDisplay();
    });
    $(".six").on("click", function() {
        equation += '6';
        replaceDisplay();
    });
    $(".seven").on("click", function() {
        equation += '7';
        replaceDisplay();
    });
    $(".eight").on("click", function() {
        equation += '8';
        replaceDisplay();
    });
    $(".nine").on("click", function() {
        equation += '9';
        replaceDisplay();
    });
    $(".point").on("click", function() {
        equation = equation === '' ? '0.' : equation + '.';
        replaceDisplay();
    });
    $(".add").on("click", function() {
        equation += '+';
        replaceDisplay();
    });
    $(".subtract").on("click", function() {
        equation += '-';
        replaceDisplay();
    });
    $(".multiply").on("click", function() {
        if (equation === '') {
            $(".display").html('请先输入数字!');
        } else {
            equation += '*';
            replaceDisplay();
        }
    });
    $(".divide").on("click", function() {
        if (equation === '') {
            $(".display").html('请先输入数字!');
        } else {
            equation += '/';
            replaceDisplay();
        }
    });

    $(".addSubtract").on("click", function() {
        if (equation === '') {
            $(".display").html('请先输入数字!');
        } else {
            // 判断数字结果是否大于0
            // 若大于0，则在 equation头部添加负号
            // 若小于或等于0，先算出数字结果eval(),再将算出的结果转化为字符串,最后将负号去除
            equation = eval(equation) > 0 ? ('-' + equation) : (String(eval(equation)).replace('-', ''));
            replaceDisplay();
        }
    });

    $(".percent").on("click", function() {
        if (equation === '') {
            $(".display").html('请先输入数字!');
        } else {
            equation = String(eval(equation) / 100);
            replaceDisplay();
        }

    });

    $(".equal").on("click", function() {
        if (equation === '') {
            $(".display").html('请先输入数字!');
        } else {
            try {
                let reg = RegExp(/Infinity/);
                if (reg.test(String(eval(equation)))) {
                    $(".display").html('无意义!');
                } else {
                    $(".display").html(parseFloat(eval(equation).toFixed(10)));
                }
                equation = '';
            } catch {
                $(".display").html('输入错误!');
                equation = '';
            }
        }
    });

    // 当显示框内容变化时
    $(".display").bind("DOMNodeInserted", function() {
        if ($(".display").html().length > 11 && $(".display").html().length < 17) {
            $(".display").css("font-size", "40px");
        } else if ($(".display").html().length > 17 || $(".display").html().length === 17) {
            $(".display").css("font-size", "30px");
        } else {
            $(".display").css("font-size", "60px");
        }
    });


    // 监听键盘
    $(document).keydown(function(e) {
        // console.log(e.keyCode);
        switch (e.keyCode) {
            // 退格
            case 8:
                deleteOne();
                break;
                // 清零（ESC）
            case 27:
                $(".AC").click();
                break;
                // 数字0~9
            case 96:
                $(".zero").click();
                break;
            case 97:
                $(".one").click();
                break;
            case 98:
                $(".two").click();
                break;
            case 99:
                $(".three").click();
                break;
            case 100:
                $(".four").click();
                break;
            case 101:
                $(".five").click();
                break;
            case 102:
                $(".six").click();
                break;
            case 103:
                $(".seven").click();
                break;
            case 104:
                $(".eight").click();
                break;
            case 105:
                $(".nine").click();
                break;
            case 110:
                // 小数点
                $(".point").click();
                break;
                // 加减乘除
            case 107:
                $(".add").click();
                break;
            case 109:
                $(".subtract").click();
                break;
            case 106:
                $(".multiply").click();
                break;
            case 111:
                $(".divide").click();
                break;
                // 等于（回车）
            case 13:
                $(".equal").click();
                break;
                // 相反数（空格）
            case 32:
                $(".addSubtract").click();
                break;
                // 百分数（CTRL）
            case 17:
                $(".percent").click();
                break;
        }
    });
});