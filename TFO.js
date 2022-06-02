
// CHANGE the following constants to change appearance of timelines ...  //

const ATTR_CHROME = "nofooter noscrollbar";	// any of the following: noheader, nofooter, noborders, transparent, noscrollbar [single space between values]
const ATTR_WIDTH = "350";
const ATTR_HEIGHT = "1000";
const ATTR_THEME = "dark"; //  dark , light
const STARTING_TAB_ORDER = 1  // range from 0..N-1 (N=amount of tabs) , 0 is CORNER tab 

//----------------------------------------------------------------------//

function createTabsFromData()
{
	var i, tabs = document.getElementsByClassName("tab") , tabcontentblock = document.getElementsByClassName("tabcontentblock");
	tabs[0].innerHTML = "";
	tabcontentblock[0].innerHTML = "";
	for(i=0; i<tab_id.length; i++)
	{
		tabs[0].innerHTML += "<button class=\"tablinks\" onclick=\"openTab(event, \'" + tab_id[i] + "\')\">&nbsp;" + tab_title[i] + "&nbsp;</button>";
		tabcontentblock[0].innerHTML += "<div class=\"tabcontent\" id=\"" + tab_id[i] + "\"></div>";
	}
}

function createTimelinesFromData()
{
	var i,len = data.length, t=-1, tabcontent= document.getElementsByClassName("tabcontent");
	for(i=0; i < len; i++)
	{
		if(data[i].indexOf("##CORNER")==0) // customized tab (timeline input by user)
		{
			t++;
			tabcontent[t].innerHTML = "<h2> " + "Customized Twitter Timeline" + " </h2>";
			tabcontent[t].innerHTML += "<label> " + "select from:" + " </label> ";
			tabcontent[t].innerHTML += "<select id=\"accountslist\"></select>&nbsp;";
			tabcontent[t].innerHTML += "<label> " + "or enter username: @" + " </label>";
			tabcontent[t].innerHTML += "<input type=\"text\" id=\"special\" size=\"32\" value=\"twitter\">&nbsp;";
			tabcontent[t].innerHTML += "<button onclick=\"openSpecial()\" id=\"btnGO\">Go!</button><br/><br/><br/>";
			tabcontent[t].innerHTML += "<div id=\"special-content\"></div><br/>";
		}
		else if (data[i].indexOf("##")==0)
		{
			t++;
			tabcontent[t].innerHTML = "<h2> " + data[i].substring(2) + " </h2>";
			document.getElementById("accountslist").innerHTML += "<option disabled>"+data[i].substring(2)+"</option>";
		}
		else if (data[i]==="__")
		{
			tabcontent[t].innerHTML += "<br/><hr color=\"white\"/><br/>";
		}
		else
		{
			tabcontent[t].innerHTML += "<a class=\"twitter-timeline\" href=\"" + data[i] + "\"></a>&emsp;"
			document.getElementById("accountslist").innerHTML += "<option value=\""+data[i]+"\">"+data[i]+"</option>";
		}
	}
}

// check:	https://developer.twitter.com/en/docs/twitter-for-websites/timelines/guides/parameter-reference
//	for more attributes to change 
function setTimelinesAttrs()
{
	var i, timelines;
	timelines = document.getElementsByClassName("twitter-timeline");
	for(i=0; i < timelines.length; i++)
	{
		timelines[i].setAttribute("data-chrome", ATTR_CHROME);
		timelines[i].setAttribute("data-width", ATTR_WIDTH);
		timelines[i].setAttribute("data-height", ATTR_HEIGHT);
		timelines[i].setAttribute("data-theme", ATTR_THEME);
		timelines[i].innerHTML = timelines[i].getAttribute("href");
		timelines[i].setAttribute("href","https://twitter.com/" + timelines[i].getAttribute("href") + "?ref_src=twsrc%5Etfw");
	}
}

function tabButtonClick(tabOrder)
{
	document.getElementsByClassName("tablinks")[tabOrder].click();
}

createTabsFromData();
createTimelinesFromData();
setTimelinesAttrs();
tabButtonClick(STARTING_TAB_ORDER);

/*----------------------------------------------------------------------------------------------*/

function openTab(evt, tabTitle) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabTitle).style.display = "block";
  evt.currentTarget.className += " active";
}

/*----------------------------------------------------------------------------------------------*/

function openSpecial()
{
	var pageSRC = "TFO_S.html?uname=" + document.getElementById("special").value;
	document.getElementById("special-content").innerHTML = "<embed type=\"text/html\" src=\"" + pageSRC + "\" width=\"90%\" height=\"1850px\">";
}

function addEnterKeyListener()
{
	var btnGO = document.getElementById("btnGO");
	var inputBoxSpecial = document.getElementById("special");
	inputBoxSpecial.addEventListener("keyup", function (event) {
		if (event.keyCode == 13) //  13 is for ENTER key
		{
			btnGO.click();
		}
	});
}

function addSelectChangeListener()
{
	var btnGO = document.getElementById("btnGO");
	var inputBoxSpecial = document.getElementById("special");
	document.getElementById("accountslist").addEventListener('change', (event) => {
		inputBoxSpecial.value = event.target.value;
		btnGO.click();
	});
}

addEnterKeyListener();
addSelectChangeListener();