function doPost(e)
{
  var params = JSON.parse(e.postData.getDataAsString());
  
  var data = params.data;
  var userId = params.userID;
  var userName=params.userName;
  var option = params.option;
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('FreedomMemberForAdmin');
  if(option==="continue")
  {
    var row = findRow(sheet,userId,1);
    sheet.getRange(row, 6).setValue("済");
  }
  if(option==="join"){
    join(sheet,userId,userName,data);
  }
  if(option==="leave"){
    leave(sheet,userId,data);
  }
  
}

function leave(sheet,userID, data){
  var row = findRow(sheet, userID,1);
  if(row!==0){
    sheet.getRange(row,5).setValue(data);
  }
}

function join(sheet,userID,UserName,Data){
  var row = findRow(sheet,userID,1);
  if(row !== 0){
    sheet.getRange(row, 5).setValue("");
  }
  else{
    var newData = [ userID, Data, UserName];
    sheet.appendRow(newData);
  }
}

function findRow(sheet, val,col) 
{
   var dat = sheet.getDataRange().getValues();
   for(var i=1;i<dat.length;i++){
    if(dat[i][col-1] === val){
      return i+1;
    }
  }
  return 0;
}