var pr =[ [null,null], [null,null], [null,null], [null,null], [null,null] ];
var playerChara = undefined;
var scene = undefined;
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
   var prn;
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
dataGrab("scene","updateScene","https://kutora.github.io/Project-Zeroth_Law/js/scene_Debug_1.json");
function updateStat(statAbbreviation)
{
    document.getElementById(statAbbreviation + "Text").innerHTML = playerChara.stats[statAbbreviation].value;
}
function syncStats() 
{
  updateStat("str");
  updateStat("spd");
  updateStat("end");
  updateStat("int");
  updateStat("ctr");
}
function concatDisplayText()
{
  var ccDisTxt = '';
  for(var i = 0;i <= scene.display.displayedText.length -1;i++)
    {
      if(scene.display.displayedText[i][0] == '$'&& scene.display.displayedText[i][1] == '{'&& scene.display.displayedText[i][scene.display.displayedText[i].length-1] == '}' )
      {  
        ccDisTxt = ccDisTxt.concat(eval('(function(){'+scene.display.displayedText[i].substr(2,scene.display.displayedText[i].length-3)+'})();'));
      }
      else
      {
        ccDisTxt = ccDisTxt.concat(scene.display.displayedText[i]);
      }
    }
  return ccDisTxt;
}
function updateAButton(btnNum)
  {
    var dom_elem = document.getElementById("btn" + ~~(btnNum/5 +1) + 'r' +  (btnNum%5 +1));
    dom_elem.childNodes[0].innerHTML = scene.buttons.text[btnNum+1];
    dom_elem.setAttribute('title', scene.buttons.toolTip[btnNum+1]);
    //Add here to...
    if (dom_elem.attributes.getNamedItem('onclick') === null)
    {
      dom_elem.attributes.setNamedItem(document.createAttribute("onclick"));
    }
    //here to Index.html, then remove these comments and the code between them
    if (scene.buttons.usable[btnNum+1])
      {
        dom_elem.attributes.getNamedItem('onclick').value = null;//place holder for `...alue = "(function(){"+scene.buttons.functionality[btnNum+1]+"})();"
        if (dom_elem.attributes.getNamedItem('disabled') != null)
          {
            dom_elem.attributes.removeNamedItem('disabled');
          }
      }
    else
      {
        if(dom_elem.attributes.getNamedItem('disabled') == null)
          {
            dom_elem.attributes.setNamedItem(document.createAttribute("disabled"));
            dom_elem.attributes.getNamedItem('onclick').value = "(void function(){})();"

          }
      }
  }
function updateScene()
  {
  document.getElementById("sceneDisplay").innerHTML = concatDisplayText();    
  for(var i=0;i < 10;i++)
    {
      updateAButton(i);
    }
  }

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
