/*
	*	number of items in both tab_id & tab_title arrays must be equal, as each item's id is in same position as its title
		this number must also be the same as number of "##..." & "__" in data array
	
	*	"CORNER" in tab_id , "@" in tab_title, and "##CORNER" in data, must all stay at FIRST position in each array
	*	"##CORNER" in data[] must NOT be changed , because this "special" name makes the code in TFO.js recognize it
	
	*	to change names/titles of tabs, change strings in each of tab_title[] desired tab
	*	ids in tab_id can be changed freely , they are used in code internally to connect between tab-links and tab-content
	
	*	regarding data[], which represents each tab's content:
		+	"##TITLE" represents the title at the top of the tab-content (not the tab button, but below it)
			it must not be deleted , for the program to function correctly, renaming can be done by changing anything after "##"
			"##" at start must stay always, as they are an indicator for the code to regard them as titles
		+	"__" is at the end of the tab-content, for each tab, represents a <hr> at the end of the page
			it can be deleted , as this won't break the program down
		+	between "##TITLE" and "__" , ar present by order all the usernames desired to be shown in that tab
			usernames should be written as they are found in twitter after "@" symbol , for example @twitter is written as "twitter"
			THERE is NO limit on the amount of usernames per tab !
	
	+ 	removing/adding a tab: should be done by add/remove a value to tab_id & tab_title (in the same array position)
		AND also by adding a line in data[] array in that same order as the other arrays
		EACH line should be made of "##TITLE"  & "__" , and any amount of twitter usernames in between them ... 
	
*/


const tab_id = ["CORNER","WorldNews","SciTech","title3","title4","title5"];
const tab_title = ["@","World-News","Science&Tech.","title#3","title#4","title#5"];
const data = [
		"##CORNER","__",
		"##World News","bbc","cnn","reuters","__",
		"##Science & Technology News","IFLScience","ScienceAlert","physorg_com","__",
		"##TITLE_3","__",
		"##TITLE_4","__",
		"##TITLE_5","__"
];