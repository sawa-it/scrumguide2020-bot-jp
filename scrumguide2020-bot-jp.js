function getAll() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getActiveSheet()
  const lastRow = sheet.getLastRow() 
  
  for (let i=2; i<=lastRow; i++) {
    let headline1 = sheet.getRange(i,1).getValue()
    let headline2 = sheet.getRange(i,2).getValue() ? ' > ' + sheet.getRange(i,2).getValue() : null
    let headline3 = sheet.getRange(i,3).getValue() ? ' > ' + sheet.getRange(i,3).getValue() : null
    let contents = sheet.getRange(i,4).getValue()
    sendNotification(headline1,headline2,headline3,contents)
  }
}

function getRandom() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getActiveSheet()
  const lastRow = sheet.getLastRow()
  const pointer = getRandomPointer(lastRow)

  let headline1 = sheet.getRange(pointer,1).getValue()
  let headline2 = sheet.getRange(pointer,2).getValue() ? ' > ' + sheet.getRange(pointer,2).getValue() : null
  let headline3 = sheet.getRange(pointer,3).getValue() ? ' > ' + sheet.getRange(pointer,3).getValue() : null
  let contents = sheet.getRange(pointer,4).getValue()
  sendNotification(headline1,headline2,headline3,contents)
}

function getRandomPointer(lastRow) {
  var pointer = Math.floor( Math.random() * (lastRow))
  return pointer
}

function sendNotification(headline1,headline2,headline3,contents) {
  const webhookUrl = 'hoge'   //your webhook url

  let message = 
  headline2 && headline3 == null ? headline1 +  headline2 + '\n\n' + '```' + contents + '```' :
  headline2 == null ? headline1 + '\n\n' + '```' + contents + '```' :
  headline1 + headline2 + headline3 + '\n\n'  + '```' + contents + '```'

  let options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : JSON.stringify(
      {
        "text" : message,
        "link_names": 1
      }
    )
  }
  UrlFetchApp.fetch(webhookUrl, options)  
}
