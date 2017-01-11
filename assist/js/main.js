
function onload() {
    flag = 0;
    slider = document.getElementById("slider");
    slider.addEventListener("webkitTransitionEnd", play);
    pointer = document.getElementById("pointer").getElementsByTagName('li');
    for (var i = 0, len = pointer.length; i < len; i++) {
        pointer[i].index = i;
        pointer[i].onclick = function() {
            flag = this.index;
            setTimer();
            slide();
        }
    }
    /***********/
    document.getElementById('login').addEventListener('keyup', function(event) {
            if (event.keyCode == 13) {
                login();
            }
        })
    document.getElementById('reg_email').addEventListener('keyup', function(event) {
      if(event.currentTarget.validity.valid==true){
        allcheck();
      }
        })

        setTimeout(function() {btn_click(1);setTimer();}, 5000);
    document.getElementById('loadingMask').style.visibility='hidden';
    Time1 = 0;
    play();
    CheckLogin();
    new WOW().init();
}


function play() {
    var tmp = document.getElementById("textbox" + flag).getElementsByTagName('div');
    if (tmp[0].className.match('animated') != null) return;
    for (var i = 0, len = tmp.length; i < len; i++) {
        tmp[i].style.animationPlayState = "running";
        var str = tmp[i].className;
        tmp[i].className = "";
        play2(tmp[i], str);
    }
    if (flag == 0) {
      reset_box(1);
    }else if (flag == 5) {
      reset_box(4);
    }else {
      reset_box(flag+1);
      reset_box(flag-1);
    }

}



function reset_box(id){
  var tmp = document.getElementById('textbox'+id).getElementsByTagName('div');
  for (var i = 0; i < tmp.length; i++) {
    var str =  tmp[i].className.split(' ',1);
    tmp[i].className = '';
    tmp[i].className = str;
    tmp[i].style.visibility = 'hidden';
  }
}

function play2(obj, str) {
    setTimeout(function() {
        obj.className = str + ' animated';
        obj.style.visibility = "visible";
    }, 1);
}


function setTimer() {
    clearInterval(Time1);
    Time1 = setInterval(slide, 6000);
}

function slide() {
    var tmp = document.getElementById("slider").getElementsByTagName('li')
    var img_width = -tmp[0].offsetWidth;
    if (flag == 6) {
        slider.className = "";
        slider.style.transform = "translateX(0)";
        setTimeout(function() {
            slider.className = "active";
            flag = 0;
            btn_click(1);
        }, 10);
        return;
    }
    if (flag < 0) {
        slider.className = "";
        slider.style.transform = "translateX(" + 5 * img_width + "px)";
        setTimeout(function() {
            slider.className = "active";
            flag = 5;
            btn_click(0);
        }, 10);
        return;
    }
    slider.style.transform = "translateX(" + flag * img_width + "px)";
    update_pointer();
}



function btn_click(value) {
    setTimer();
    if (value == 1) {
        flag += 1;
    }else {
      flag -= 1;
    }
    slide();
}

function update_pointer() {
    for (var i = 0, len = pointer.length; i < len; i++) {
        pointer[i].className = '';
    }
    if (flag == 5) {
        pointer[0].className = 'thispoint';
    } else {
        pointer[flag].className = 'thispoint';
    }
}

function on_Mypage(){
  document.location.href="http://pluto.mfvps.cn/personalpage?id=" + window.localStorage['id'];
}
function on_Editpage(){
  document.location.href="http://pluto.mfvps.cn/personalpage/edit.html";
}

function show_login() {
    var login = document.getElementById('login');
    var mask = document.getElementById('login_mask');
    mask.style.opacity = '0.8';
    mask.style.visibility = 'visible';
    login.style.visibility = 'visible';
    login.style.opacity='1';
    login.style.transform = "none";
}

function login_close() {
    var login = document.getElementById('login');
    var mask = document.getElementById('login_mask');
    mask.style = '';
    login.style = "";
}

function show_reg() {
    var reg = document.getElementById('reg');
    var mask = document.getElementById('login_mask');
    var login = document.getElementById('login');
    mask.style.visibility = 'visible';
    mask.style.opacity = '0.8';
    reg.style.opacity = '1';
    reg.style.visibility = 'visible';
    reg.style.transform = "none";
    login.style = '';
    clear_reg();
}
function clear_reg(){
  var form = document.getElementById("reg_form");
  var check = document.getElementById("checkmark");
  var reg_btn = document.getElementById("reg_btn");
  if(form.style.visibility=="hidden"){
    var input = form.getElementsByTagName('input');
    for (var i = 0; i < input.length; i++) {
      input[i].value='';
    }
    form.style='';
    check.className="";
    check.style='';
    reg_btn.firstElementChild.style='';
  }
}
function reg_close() {
    var reg = document.getElementById('reg');
    var mask = document.getElementById('login_mask');
    mask.style = 'hidden';
    reg.style = '';
}

function check(obj) {
    var span = obj.nextElementSibling;
    if (obj.value == "") {
        span.style.visibility = "visible";
        span.innerHTML = "*必填";
        allcheck();
    } else {

        if (obj.id == "reg_id") {
            var match = obj.value.match(/[^A-Za-z0-9]/g);
            if (match != null) {
                span.style.visibility = "visible";
                span.innerHTML = "*請輸入純英數";
                allcheck();
                return;
            }
        } else if (obj.id == "reg_pw1") {
            var pw2 = document.getElementById('reg_pw2');
            var pw2_span = pw2.nextElementSibling;
            if (pw2.value != "") {
              span.style.visibility = "hidden";
                if (obj.value != pw2.value) {
                    pw2_span.style.visibility = "visible";
                    pw2_span.innerHTML = "*密碼不一致";
                    span.style.visibility='hidden';
                    allcheck();
                    return;
                }else {
                 pw2_span.style.visibility='hidden';
                }
            }
        } else if (obj.id == "reg_pw2") {
            var pw = document.getElementById('reg_pw1');
            if (obj.value != pw.value) {
                span.style.visibility = "visible";
                span.innerHTML = "*密碼不一致";
                allcheck();
                return;
            }
        } else if (obj.id == "reg_email") {
            if (obj.validity.valid == false) {
                span.style.visibility = "visible";
                span.innerHTML = "*請輸入正確的信箱";
                allcheck();
                return;
            }
        }
        span.style.visibility = "hidden";
        allcheck();

    }
}

function allcheck() {
  var obj = [
  document.getElementById('reg_name'),
  document.getElementById('reg_id'),
  document.getElementById('reg_pw1'),
  document.getElementById('reg_pw2'),
  document.getElementById('reg_email')];
  for (var i = 0; i < 5; i++) {
    if( obj[i].value == ""){
      document.getElementById('reg_btn').className="disable";
      return;
    }else if (obj[i].nextElementSibling.style.visibility=="visible") {
      document.getElementById('reg_btn').className="disable";
      return;
    }
  }
  document.getElementById('reg_btn').className="";
}
