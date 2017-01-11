function login() {
    var log_btn = document.getElementById("log_form_btn");
    var flag = document.getElementById("log_flag");
    log_btn.firstElementChild.style.opacity = 0;
    log_btn.firstElementChild.style.visibility = 'hidden';
    log_btn.lastElementChild.style.visibility = "visible";
    var id, password;
    id = document.getElementById("login_id").value;
    pass = document.getElementById("login_password").value;
    if (id == "" || pass == "") {
        flag.style.visibility = 'visible';
        log_btn.firstElementChild.style.opacity = 1;
        log_btn.firstElementChild.style.visibility = 'visible';
        log_btn.lastElementChild.style.visibility = "hidden";
    } else {
        flag.style.visibility = 'hidden';
        var fx = function(ret) {
          var log_btn = document.getElementById("log_form_btn");
          var flag = document.getElementById("log_flag");
          if (ret == "error" || ret == "no id") {
              flag.style.visibility = 'visible';
              log_btn.firstElementChild.style.opacity = 1;
              log_btn.firstElementChild.style.visibility = 'visible';
              log_btn.lastElementChild.style.visibility = "hidden";
              Logout();
          } else {
              ret = ret.split("|");
              document.getElementById('pro_account').innerHTML = ret[0];
              if (ret[1]!='') {
              document.getElementById('profile_avatar').src = ret[1]+"?"+random(1,9999);
              }
              document.getElementById('login_btn').style.visibility = 'hidden';
              var pro = document.getElementById('profile');
              pro.style.visibility = 'visible';
              pro.style.opacity='1';
              login_close();
              window.localStorage['id']=id;
              window.localStorage['pass']=pass;
          }
        };
        AJAX("login",fx,id+"&pass="+pass);
    }
}

function register(reg_btn) {
    reg_btn.style.opacity = 0;
    reg_btn.style.visibility = 'hidden';
    reg_btn.nextElementSibling.style.visibility = "visible";
    var name = document.getElementById('reg_name').value;
    var id = document.getElementById('reg_id').value;
    var pass = document.getElementById('reg_pw1').value;
    var email = document.getElementById('reg_email').value;
    var fx = function(ret){
      if (ret == "202") {
          var span = document.getElementById('reg_id').nextElementSibling;
          span.style.visibility = 'visible';
          span.innerHTML = '*此ID已被註冊';
          reg_btn.style = '';
          reg_btn.nextElementSibling.style='';
      } else if (ret == "200") {
          var form = document.getElementById('reg_form');
          var mark = document.getElementById('checkmark');
          reg_btn.nextElementSibling.style.visibility = "hidden";
          form.style.opacity = '0';
          form.style.visibility = 'hidden';
          mark.style.visibility = 'visible';
          mark.className = "checkmark";
      }
    };
    AJAX("reg",fx,id+"&pass="+pass+"&name="+name);
}



function CheckLogin() {
  var id = window.localStorage['id'];
  if (id != null) {
    var log_btn = document.getElementById('login_btn');
    var loader = document.getElementById('login_loader');
    var pass = window.localStorage['pass'];
    log_btn.style.opacity='0';
    log_btn.style.visibility='hidden';
    loader.style.visibility='visible';
    var fx=function(ret){
      if (ret == "error" || ret == "no id") {
          Logout();
      } else {
          ret = ret.split("|");
          document.getElementById('pro_account').innerHTML = ret[0];
          if (ret[1]!='') {
          document.getElementById('profile_avatar').src = ret[1]+"?"+random(1,9999);
          }
          var pro = document.getElementById('profile');
          pro.style.visibility = 'visible';
          pro.style.opacity='1';
          loader.style='';
          window.localStorage['id']=id;
          window.localStorage['pass']=pass;
      }
    };
    AJAX("login",fx,id+"&pass="+pass);
  }
}

function Logout() {
  document.getElementById('profile').style='';
  document.getElementById('login_btn').style='';
  document.getElementById('login_loader').style='';
  var log_btn = document.getElementById("log_form_btn");
  log_btn.firstElementChild.style='';
  log_btn.lastElementChild.style='';
  window.localStorage.clear();
}

function AJAX(mode,fx,send){
  if (window.XMLHttpRequest) {
      var xmlhttp = new XMLHttpRequest();
  } else {
      var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var ret = xmlhttp.responseText;
          fx(ret);
      }
  }
  xmlhttp.open("POST", "/assist/js/client.asp", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("passw=9456XN&mode=" + mode + "&id=" + send);
}

function random(min,max) {
return Math.floor(Math.random()*(max-min+1)+min);
}
