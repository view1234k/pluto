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

function edit_Logout(){
  Logout();
  document.location.href = 'http://pluto.mfvps.cn';
}
