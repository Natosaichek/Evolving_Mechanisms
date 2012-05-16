var User_def_name = "";
var objType = "";
var userObjArray;
var world;
world = GameObject.Find("main").GetComponent(natoworld);

tmp_id = world.userObjCounts(objType);

// gameObject.

function init()
{
	world.userObjCounts(objType);
	userObjArray = world.userObjs(objType);
}

function rename_userobj()
{
	// we're going to find all the children of this object, and all their children etc.
	// we'll rename everything so it's got some hash appended to the end.
	//transform.childCount
}

