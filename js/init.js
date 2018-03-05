var pr =[ [null,null], [null,null], [null,null], [null,null], [null,null] ];
var passer = false;
var playerChara = undefined;
async function getData(toBeSet,url,prn,funcToBeCalled) 
   {

       pr[prn][0] = await fetch(url, 
                { method: 'GET',
                  headers: {"Content-Type": "text/plain"},
                  mode: 'cors',
                  cache: 'default' }
       ).then(function(response)
           {
                
                
                return response.json();
           }).then(function(data)
              {
                 pr[prn][1] = Promise.resolve(data);
                 return Promise.resolve(data);
              });
       
       window[toBeSet] = pr[prn][0];
       window[funcToBeCalled]();
       return true;
      
   }


async function dataGrab(toBeSet,funcToBeCalled,url)
{
   var prn
   for(var i=0; i<pr.length;i++ )
   {
      if(pr[i][0] == null)
      {
         prn = i;
         break;
      }
   }
   getData(toBeSet,url,prn,funcToBeCalled);
   return pr[prn][0];
}
dataGrab("playerChara","syncStats","https://kutora.github.io/Project-Zeroth_Law/js/defaultPC_data.json");
//waitForData();
function getDOM(elementQueried) {
return document.querySelector(elementQueried);
}
function updateStat(statAbbreviation)
{
  switch(statAbbreviation)
    { 
      case "str" : getDOM("#strText").innerHTML = playerChara.stats.str.value;break;
      case "spd" : getDOM("#spdText").innerHTML = playerChara.stats.spd.value;break;
      case "end" : getDOM("#endText").innerHTML = playerChara.stats.end.value;break;
      case "int" : getDOM("#intText").innerHTML = playerChara.stats.int.value;break;
      case "ctr" : getDOM("#ctrText").innerHTML = playerChara.stats.ctr.value;break;
      default : console.error("Invalid updateStat call, must be a stat's three (3) letter abbreviation\nupdateStat() was called with the following: " + statAbbreviation);
    }
  
  //getDOM("#" + statAbbreviation + "Text").innerHTML = eval("playerChara.stats."+ statAbbreviation +".value");
}
function syncStats() 
{
  updateStat("str");
  updateStat("spd");
  updateStat("end");
  updateStat("int");
  updateStat("ctr");
}

/*playerChara.stats. = new Object();
playerChara.stats..value = new Number(10)
playerChara.stats..effValue = new Number(10) //effective value
playerChara.stats..maxValue = new Number(100)
playerChara.stats..minValue = new Number(1)
*/
function concatDisplayText()
{
  ccDisTxt = '';
  for(i = 0;i < scene.display.displayedText.length;i++)
    {
      ccDisTxt = ccDisTxt.concat(scene.display.displayedText[i]);
    }
  return ccDisTxt;
}


scene = {};

scene.doc = "the object for all things scene";
scene.display = {};
scene.display.displayedText = [];
scene.display.displayedText[0] = "doc: put the list of text and string returning functions to create the text<br/>Example: <br/>${playerChara.name}";
scene.display.displayedText[1] = '';
scene.display.displayedText[2] = " is cornered at a ledge, the beast is leering; you must do something!<br/><br/>";
scene.display.isInDebug = false;
scene.buttons = {};
scene.buttons.usable = [false];
scene.buttons.text = [''];
scene.buttons.toolTip = [''];

scene.buttons.usable[1] = true;
scene.buttons.usable[2] = true;
scene.buttons.usable[3] = true;
scene.buttons.usable[4] = false;
scene.buttons.usable[5] = true;
scene.buttons.usable[6] = false;
scene.buttons.usable[7] = false;
scene.buttons.usable[8] = false;
scene.buttons.usable[9] = false;
scene.buttons.usable[10] = false;

scene.buttons.text[1] = 'Juke';
scene.buttons.text[2] = 'Fight';
scene.buttons.text[3] = 'Run?';
scene.buttons.text[4] = 'Intmdte';
scene.buttons.text[5] = 'Jump';
scene.buttons.text[6] = 'Love';
scene.buttons.text[7] = 'OutSmrt';
scene.buttons.text[8] = null;//... = '';
scene.buttons.text[9] = null;
scene.buttons.text[10] = null;

scene.buttons.toolTip[1] = "Attempt to trick the beast";
scene.buttons.toolTip[2] = "Fight the beast";
scene.buttons.toolTip[3] = "Try to run";
scene.buttons.toolTip[4] = "Use your sheer strength to intimidate the beast";
scene.buttons.toolTip[5] = "Jump off the ledge";
scene.buttons.toolTip[6] = "Uh...";
scene.buttons.toolTip[7] = "Use your Intelligence to";
scene.buttons.toolTip[8] = null;//... = "";
scene.buttons.toolTip[9] = null;
scene.buttons.toolTip[10] = null;

function updateBtns()
{
  function btnAbler(btnNum, targetStr)
  {
    
    var target = document.getElementById(targetStr).attributes;
    if (target.getNamedItem('onclick') === null)
      {
        target.setNamedItem(document.createAttribute("onclick"));
      }
    
    if (scene.buttons.usable[btnNum])
      {
        target.getNamedItem('onclick').value = null;//place holder
        if (target.getNamedItem('disabled') !== null)
          {
            target.removeNamedItem('disabled');
          }
      }
    else
      {
        
        if (!scene.buttons.usable[btnNum])
          {
            target.getNamedItem('onclick').value = void(null);
            if (target.getNamedItem('disabled') === null)
              {
                target.setNamedItem(document.createAttribute("disabled"));
              }
            
          }
      }
    /*if (target.getNamedItem('disabled') !== null)
      {
        if (scene.buttons.usable[btnNum])
          {
            target.removeNamedItem('disabled');
          }
      }
    else
      {
        if (!scene.buttons.usable[btnNum])
          {
            target.setNamedItem(document.createAttribute("disabled"));
          }
      }*/
    
  }
  for(var i=1;i < 11;i++)
    {
      
      if(i>5 )
        {
          if(i==10)
            {
              document.getElementById("btn2r5").childNodes[0].innerHTML = scene.buttons.text[10];
              document.getElementById("btn2r5").setAttribute('title', scene.buttons.toolTip[10]);
              btnAbler(i, "btn2r5");
            }
          else
            {
              document.getElementById("btn2r" + (i%5)).childNodes[0].innerHTML = scene.buttons.text[i];
              document.getElementById("btn2r" + (i%5)).setAttribute('title', scene.buttons.toolTip[i]);
              btnAbler(i, ("btn2r" + (i%5)));
            }
        }
      else
        {
          if(i==5)
            {
              document.getElementById("btn1r5").childNodes[0].innerHTML = scene.buttons.text[5];
              document.getElementById("btn1r5").setAttribute('title', scene.buttons.toolTip[5]);
              btnAbler(i, "btn1r5");
            }
          else
            {
              document.getElementById("btn1r" + (i%5)).childNodes[0].innerHTML = scene.buttons.text[i];
              document.getElementById("btn1r" + (i%5)).setAttribute('title', scene.buttons.toolTip[i]);
              btnAbler(i, ("btn1r" + (i%5)));
            }
        }
    }
}

//title=""


document.getElementById("sceneDisplay").innerHTML = concatDisplayText();

updateBtns();
window.addEventListener("keydown" , 
function(event)
{
  //window.alert("Key is: " + event.keyCode);
  if(event.keyCode == 190)
    {
      
      if(!scene.display.isInDebug)
        {
          var num = 0;
          var toBeSanitized = JSON.stringify(scene);
          for(var j = 0; j < toBeSanitized.length+1;j++)
            {
              if (toBeSanitized[j] == '<')
                {
                  num++;
                }
            }
          for (var i= 0;i < num;i++)
            {
              toBeSanitized = toBeSanitized.replace('<', '&lt').replace('>', '&gt');
            }
          document.getElementById('sceneDisplay').innerHTML = toBeSanitized;
        }
      else if(scene.display.isInDebug)
        {
          document.getElementById('sceneDisplay').innerHTML = concatDisplayText();
        }
      scene.display.isInDebug = !scene.display.isInDebug;
    }
}, false);
