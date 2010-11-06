plugin.loadMainCSS();
plugin.loadLang();

paused = false;

window.onfocus = function()
{
	if(!paused)
		theWebUI.update();
}

window.onblur = function()
{
	stop();	
}

function stop(){
	theWebUI.timer.stop();
	if(theWebUI.updTimer)
		window.clearTimeout(theWebUI.updTimer);	
}

theWebUI.togglePause = function(){
	if(paused)
	{
		$("#webuiUpdateToggle").removeClass("resume");
		$("#webuiUpdateToggle").addClass("pause");
		$("#webuiUpdateToggle").attr("title", theUILang.pausewebuiPause);

		theWebUI.update();
		paused = false;
	}
	else
	{
		$("#webuiUpdateToggle").removeClass("pause");
		$("#webuiUpdateToggle").addClass("resume");
		$("#webuiUpdateToggle").attr("title", theUILang.pausewebuiResume);

		stop();
		
		paused = true;
	}
}

theWebUI.forceUpdate = function(){
	if(theWebUI.updTimer)
		window.clearTimeout(theWebUI.updTimer);
	theWebUI.update();
	if(paused){
		stop();	
	}
}

plugin.onLangLoaded = function()
{
	this.addButtonToToolbar("webuiUpdateToggle", theUILang.pausewebuiPause, "theWebUI.togglePause()", "help");
	this.addButtonToToolbar("webuiRefresh", theUILang.pausewebuiRefresh, "theWebUI.update()", "help");
	$("#webuiUpdateToggle").addClass("pause");
	this.addSeparatorToToolbar("help");
}

plugin.onRemove = function()
{
	theWebUI.update();
	this.removeSeparatorFromToolbar("webuiUpdateToggle");
	this.removeButtonFromToolbar("webuiUpdateToggle");
	this.removeButtonFromToolbar("webuiRefresh");
}

	