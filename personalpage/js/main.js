function index_onload() {
  document.getElementById('login').addEventListener('keyup', function(event) {
          if (event.keyCode == 13) {
              login();
          }
      });
  document.getElementById('reg_email').addEventListener('keyup', function(event) {
    if(event.currentTarget.validity.valid==true){
      allcheck();
    }
  });
  CheckLogin();
  var id = getQueryString('id');
  var fx = function(ret) {
      var tmp = ret.split("|");
      document.title = tmp[0] +"的個人網頁";
      document.getElementById('pro_name').innerHTML = tmp[0];
      document.getElementById('pro_id').innerHTML = tmp[1];
      if (tmp[2]!='') {
      document.getElementById('introduce').innerHTML = tmp[2];
      }
      if (tmp[3]!='') {
      document.getElementById('welcome').innerHTML = tmp[3];
      }
      if (tmp[4]!='') {
        document.getElementById('avatar').firstElementChild.src = tmp[4]+"?"+random(1,9999);
      }
      if (tmp[5]!='') {
        document.getElementById('home_box').style.backgroundImage ="url('"+tmp[5]+"?"+random(1,9999)+"')";
      }
      if (tmp[6]!='') {
        index_set_info(tmp[6]);
      }
  };

  AJAX("get_all", fx,id);
}

function edit_onload() {
  var id = window.localStorage['id'];
  if (id==null) {
document.location.href="http://pluto.mfvps.cn";
return;
  }
  document.getElementById('login').addEventListener('keyup', function(event) {
          if (event.keyCode == 13) {
              login();
          }
      });
  document.getElementById('reg_email').addEventListener('keyup', function(event) {
    if(event.currentTarget.validity.valid==true){
      allcheck();
    }
  });
  croppie_ini();
  CheckLogin();

    var fx = function(ret) {
        var tmp = ret.split("|");
        document.getElementById('pro_name').innerHTML = tmp[0];
        document.getElementById('name').value= tmp[0];
        document.getElementById('pro_id').innerHTML = tmp[1];
        document.getElementById('intro').value = tmp[2];
        document.getElementById('welcome').value = tmp[3];
        if (tmp[4]!='') {
          document.getElementById('avatar').firstElementChild.src = tmp[4]+"?"+random(1,9999);
        }
        if (tmp[5]!='') {
          document.getElementById('home_box').style.backgroundImage ="url('"+tmp[5]+"?"+random(1,9999)+"')";
        }
        if (tmp[6]!='') {
          edit_set_info(tmp[6]);
        }
    };
    AJAX("get_all", fx, id);
}



function panel_close() {
  var panel = document.getElementById('croppie_panel');
  var mask = document.getElementById('mask');
  document.getElementById('file_input').value = '';
  panel.style = '';
  mask.style = '';
}

function select_file(id){
  document.getElementById('file_input').click();
  if (id && !croppie_type) {
    croppie.destroy();
    croppie = new Croppie(
      document.getElementById('croppie'),{
        viewport: {width: 596, height: 120, type: 'square'},
        boundary: { width: 600, height: 400 },
        showZoomer: true,
      });
    croppie_type = 1;
  }else if (!id && croppie_type) {
    croppie.destroy();
    croppie = new Croppie(
      document.getElementById('croppie'),{
        viewport: {width: 150, height: 150, type: 'circle'},
        boundary: { width: 300, height: 300 },
        showZoomer: true,
      });
    croppie_type = 0;
  }
}

function croppie_ini() {
  var input =  document.getElementById('file_input');
  input.value="";
  input.addEventListener('change',readFile,false);
  croppie_type = 0;
  croppie = new Croppie(
    document.getElementById('croppie'),{
      viewport: {width:150, height: 150, type: 'circle'},
      boundary: { width: 300, height: 300 },
      showZoomer: true,
    });
    function readFile(){
    var file = this.files[0];
      if(!/image\/\w+/.test(file.type)){
          return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e){
        croppie.bind({
            url: e.target.result
        });
        var check = document.getElementById('panel_checkmark');
        check.style='';
        check.className='';
        document.getElementById('btn_upload').style='';
        document.getElementById('panel_spinner').style='';
        document.getElementById('croppie').style='';
        document.getElementById('file_input').value = '';
      };
      var panel = document.getElementById('croppie_panel');
      var mask = document.getElementById('mask');
      panel.style.visibility = 'visible';
      panel.style.transform = 'none';
      panel.style.opacity = '1';
      mask.style.visibility = 'visible';
      mask.style.opacity = '0.8';
    }
}

function panel_upload(btn){
  btn.style.visibility='hidden';
  document.getElementById('panel_spinner').style.visibility='visible';
  document.getElementById('croppie').style.visibility='hidden';
  if (croppie_type==0) {
    croppie.result({type:'canvas',size:'viewport'}).then(function(data){get_avatarDir(data)});
  }else {
    croppie.result({type:'canvas',size:'original'}).then(function(data){get_avatarDir(data)});
  }

}

function save_avatar(data,dir){
  var id = window.localStorage['id'];
  dir = dir[croppie_type];
    $.ajax({
          type: 'POST',
          url: "js/ImgSave.php",
          data: {
            'id' : id,
            'type' : croppie_type,
            'dir' : dir,
            'base64': data
          },
          dataType: 'json',
          timeout: 50000,
          success: function(data){
                save_avatarDir(data);
          },
          error: function(xhr, type){
                 alert('上傳失敗');

          }
     });

}




function slide(id,obj) {
    var ul = document.getElementById('article_ul');
    ul.style.transform = 'translateX(-' + ul.clientWidth / 2 * id + 'px)';
    var tmp = document.getElementById('navbar').getElementsByTagName('li');
    for (var i = 0; i < tmp.length; i++) {
      tmp[i].className='';
    }
    obj.className='selected';
}


function edit_slide(id,obj) {
    var ul = document.getElementById('edit_ul');
    ul.style.transform = 'translateX(-' + ul.clientWidth /5 * id + 'px)';
    var tmp = document.getElementById('navbar').getElementsByTagName('li');
    for (var i = 0; i < tmp.length; i++) {
      tmp[i].className='';
    }
    obj.className='selected';

}

function save_avatarDir(dir){
  var id = window.localStorage['id'];
  fx = function(ret){
    var check = document.getElementById('panel_checkmark');
    check.style.visibility='visible';
    check.className='checkmark'
    document.getElementById('panel_spinner').style='';
  };
  if (croppie_type==0) {
    AJAX("save_avatar",fx,id + "&dir="+dir);
  }else {
    AJAX("save_bg",fx,id + "&dir="+dir);
  }

}

function save_All(obj){
  if (!save_acc()) {
    return;
  }
  obj.style.visibility='hidden';
  document.getElementById('saveAll_loader').style.visibility='visible';
  save_welcome();
  save_intro();
  save_info();
  document.location.href="http://pluto.mfvps.cn/personalpage?id=" + window.localStorage['id'];
}

function save_acc(){
  var content = document.getElementById('name').value;
  var pw = document.getElementById('pass').value;
  var id = window.localStorage['id'];
  if (pw!='') {
    var pw2 = document.getElementById('pass2').value;
    var flag= document.getElementById('acc_flag');
    if (pw!=pw2) {
      flag.style.visibility='visible';
      edit_slide(0,document.getElementById('navbar').firstElementChild.firstElementChild);
      return;
    }else {
      flag.style='';
      window.localStorage['pass']=pw;
      var fx = function(ret){
        console.log(ret);
      };
      AJAX("save_pass",fx,id +"&pass="+pw);
    }
  }

  var fx = function(ret) {
      console.log(ret);
  };
  AJAX("save_name", fx , id + "&content=" + content);
  return true;
}

function save_welcome() {
    var content = encodeURIComponent(document.getElementById('welcome').value);
    var id = window.localStorage['id'];
    var fx = function(ret) {
        console.log(ret)
    };
    AJAX("save_welcome", fx, id + "&content=" + content);
}

function save_intro() {
    var content = document.getElementById('intro').value;
    content = encodeURIComponent(content);
    var id = window.localStorage['id'];
    var fx = function(ret) {
        console.log(ret);
    };
    AJAX("save_intro", fx, id + "&content=" + content);
}

function save_info(){
  var id = window.localStorage['id'];
  var div = document.getElementById('info_box').getElementsByTagName('div');
  var result='';
  var fx = function(ret){console.log(ret);};
  for (var i = 0; i < div.length; i++) {
    var content = div[i].getElementsByTagName('input');
    var tmp = encodeURIComponent(content[0].value)+'@';
    result = result + tmp;
  }
  AJAX("save_info",fx,id+"&content="+result);
}

function index_set_info(result){
    var box = document.getElementById('index_info_box');
    result = result.split('@');
    for (var i = 0; i < result.length-1; i++) {
      var str = result[i].split(',');
      var div = document.createElement('div');
      div.innerHTML="<span>"+str[0]+"</span>";
      box.appendChild(div);
    }
}

function edit_set_info(result){
  var result = result.split('@');
  for (var i = 0; i < result.length; i++) {
    if(result[i]!=''){add_info()};
  }
  var div = document.getElementById('info_box').getElementsByTagName('div');
  for (var i = 0; i < div.length; i++) {
   var input =  div[i].getElementsByTagName('input');
   input[0].value = result[i];
  }
}

function add_info() {
    var box = document.getElementById('info_box');
    var div = document.createElement('div');
    div.innerHTML="<input type='text'><button onclick='delete_info(this)'>刪除</button>"
    box.appendChild(div);
}

function delete_info(obj){
  document.getElementById('info_box').removeChild(obj.parentElement);
}

function get_avatarDir(data) {
  var id = window.localStorage['id'];
  var fx = function(ret) {
    var dir = ret.split("|");
    save_avatar(data,dir);
  };
  AJAX("get_dir",fx,id);
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function random(min,max) {
return Math.floor(Math.random()*(max-min+1)+min);
}
