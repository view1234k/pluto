<%@language=vbscript codepage=65001%>
<%
passw=request.form("passw")
if passw="9456XN" then
mode=request.form("mode")

select case mode

case "save_avatar"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("database.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
id=request.form("id")
dir=request.form("dir")
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,3
          rs("adir")=dir
          rs.update
          response.write("200")
          rs.close
          conn.close
          Set rs = Nothing
          Set conn = Nothing

case "save_bg"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("database.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
id=request.form("id")
dir=request.form("dir")
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,3
          rs("bdir")=dir
          rs.update
          response.write("200")
          rs.close
          conn.close
          Set rs = Nothing
          Set conn = Nothing

case "save_name"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("database.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
id=request.form("id")
content=request.form("content")
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,3
          rs("name")=content
          rs.update
          response.write("200")
          rs.close
          conn.close
          Set rs = Nothing
          Set conn = Nothing

case "save_pass"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("database.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
id=request.form("id")
pass=request.form("pass")
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,3
          rs("pass")=pass
          rs.update
          response.write("200")
          rs.close
          conn.close
          Set rs = Nothing
          Set conn = Nothing

case "save_welcome"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("database.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
id=request.form("id")
content=request.form("content")
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,3
          rs("welcome")=content
          rs.update
          response.write("200")
          rs.close
          conn.close
          Set rs = Nothing
          Set conn = Nothing

case "save_intro"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("database.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
id=request.form("id")
content=request.form("content")
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,3
          rs("intro")=content
          rs.update
          response.write("200")
          rs.close
          conn.close
          Set rs = Nothing
          Set conn = Nothing

case "save_info"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("database.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
id=request.form("id")
content=request.form("content")
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,3
          rs("info")=content
          rs.update
          response.write("200")
          rs.close
          conn.close
          Set rs = Nothing
          Set conn = Nothing

case "get_all"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("database.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
id=request.form("id")
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,1
          If rs.bof And rs.eof Then
          response.write("404|無此帳號|||||")
          else
          response.write rs("name")&"|"&rs("id")&"|"&rs("intro")&"|"&rs("welcome")&"|"&rs("adir")&"|"&rs("bdir")&"|"&rs("info")
          end if
          rs.close
          conn.close
          Set rs = Nothing
          Set conn = Nothing

case "get_dir"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("database.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
id=request.form("id")
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,1
          response.write rs("adir")&"|"&rs("bdir")
          rs.close
          conn.close
          Set rs = Nothing
          Set conn = Nothing

case "reg"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("database.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
id=request.form("id")
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,1
if not rs.eof then
          response.write("202")
          rs.close
          conn.close
          Set rs = Nothing
          Set conn = Nothing
else
          rs.close
          sql="insert into guest (id)values('"+id+"')"
          conn.execute(sql)
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,3
          pass=request.form("pass")
          name=request.form("name")
          rs("pass")=pass
          rs("name")=name
          rs.update
          response.write("200")
          rs.close
          conn.close
          Set rs = Nothing
          Set conn = Nothing

end if
case "output"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("/data.asp")
sql = "select * from guest"
          Set rs = Server.CreateObject("ADODB.RecordSet")
          rs.Open sql,conn,1,1
          Do while Not rs.eof
          response.write rs("ID")&"|"&rs("time")&"|"&rs("Hardcode")&"|"&rs("status")&"<>"
          rs.movenext
Loop
          rs.close
          Set rs=Nothing
          conn.close
          Set conn = Nothing

case "login"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("database.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
id=request.form("id")
          sql="select * from guest where id='"+id+"'"
          rs.open sql,conn,1,1
if rs.recordcount>0 then
          if strcomp(id,rs("id")) = 0 then
          pass=request.form("pass")
          cmp=rs("pass")
          if strcomp(pass,cmp) = 0 then
          response.write rs("name")&"|"&rs("adir")
          else
          response.write("error")
          end if
          else
          response.write("no id")
          end if
else
          response.write("no id")
end if
          set rs=nothing
          conn.close
          Set conn = Nothing

case "logout"
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "driver={Microsoft Access Driver (*.mdb)};dbq="&Server.MapPath("/data.asp")
Set rs = Server.CreateObject("ADODB.RecordSet")
Hardcode=request.form("Hardcode")
          sql="select * from guest where Hardcode='"+Hardcode+"'"
          rs.open sql,conn,1,3
          rs("status")="offline"
          rs.update
          rs.close
          set rs=nothing
          conn.close
          Set conn = Nothing
          response.write("success!")

end select






else
response.write("pass incorrect!")
end if
%>
