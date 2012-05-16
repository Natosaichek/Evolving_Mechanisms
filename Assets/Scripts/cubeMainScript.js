var mainscript;
var jointHandles;
var jNames;

function intialize(caller) {
	Debug.Log("entered cube initialize");		
	cube = gameObject;
	createHandles(cube);
	this.mainscript = caller;
}


function createHandles(obj:GameObject) {
	Debug.Log("entered cube createHandles");			
	// find the places where I'm going to put handles.
	max_x=obj.GetComponent(MeshFilter).sharedMesh.bounds.max.x;
    min_x=obj.GetComponent(MeshFilter).sharedMesh.bounds.min.x;
    max_y=obj.GetComponent(MeshFilter).sharedMesh.bounds.max.y;
    min_y=obj.GetComponent(MeshFilter).sharedMesh.bounds.min.y;
    max_z=obj.GetComponent(MeshFilter).sharedMesh.bounds.max.z;
    min_z=obj.GetComponent(MeshFilter).sharedMesh.bounds.min.z;
    
	Debug.Log("maximum x,y,z then min x,y,z:"+max_x+","+max_y+","+max_z+","+min_x+","+min_y+","+min_z);			
	center = obj.transform.position;
	// create a bunch of sub-objects (spheres?).	
	jointHandles = new Array();
	
//	c[0] = center + Vector3(max_x,max_y,max_z)*1.1;
//	c[1] = center + Vector3(max_x,max_y,min_z)*1.1;
//	c[2] = center + Vector3(max_x,min_y,max_z)*1.1;
//	c[3] = center + Vector3(max_x,min_y,min_z)*1.1;
//	c[4] = center + Vector3(min_x,max_y,max_z)*1.1;
//	c[5] = center + Vector3(min_x,max_y,min_z)*1.1;
//	c[6] = center + Vector3(min_x,min_y,max_z)*1.1;
//	c[7] = center + Vector3(min_x,min_y,min_z)*1.1;


	jointHandles[0] = center + Vector3(max_x,(max_y+min_y)/2,(min_z+max_z)/2)*1.5;
	jointHandles[1] = center + Vector3(min_x,(max_y+min_y)/2,(min_z+max_z)/2)*1.5;
	jointHandles[2] = center + Vector3((max_x+min_x)/2,max_y,(min_z+max_z)/2)*1.5;
	jointHandles[3] = center + Vector3((max_x+min_x)/2,min_y,(min_z+max_z)/2)*1.5;
	jointHandles[4] = center + Vector3((max_x+min_x)/2,(max_y+min_y)/2,max_z)*1.5;
	jointHandles[5] = center + Vector3((max_x+min_x)/2,(max_y+min_y)/2,min_z)*1.5;

	jNames = new Array("left","right","top","bottom","back","front");
	
	
	handles = new Array();
	for (i = 0; i<6; i++) {
		handles[i] = Instantiate(Resources.Load("sphere"),jointHandles[i],Quaternion.identity);
		handles[i].transform.parent = obj.transform;
	}
		
}

function Update () {
	// Handle starting to add objects to the global register of objects that will get joins made between them.
	
	
	//Debug.Log("mouse="+Input.GetMouseButton(0));
	
	if(Input.GetMouseButton(0)==false){
		gameObject.rigidbody.isKinematic=true;
	}
	else{
		gameObject.rigidbody.isKinematic=false;
	}

	// Make sure the user pressed the mouse down
	if (!Input.GetMouseButtonDown (0))
		return;

	var mainCamera = FindCamera();
		
	// We need to actually hit an object
	var hit : RaycastHit;
	if (!Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),  hit, 100))
		return;
	// We need to hit a rigidbody that is not kinematic
	if (!hit.rigidbody || hit.rigidbody.isKinematic)
		return;
	
	var targetobject : GameObject;	
	targetobject = hit.rigidbody.gameObject;
	var baseobject : GameObject;
	baseobject = targetobject.transform.parent.gameObject;
	Debug.Log("target=" + targetobject);
	Debug.Log("base=" + baseobject);
	Debug.Log("connectableObjs = " + mainscript.connectableObjs);
	if (findConnectableObj(baseobject)) {
		targetSide = findSide(targetobject);
		mainscript.addJointOnSide(baseobject,targetSide);
	}
}

		
function FindCamera () {
	if (camera)
		return camera;
	else
		return Camera.main;
}

function findConnectableObj(obj : GameObject) {
	max = mainscript.connectableObjs.length;
	Debug.Log("max="+max);
	for(i = 0; i < max; i++) {
		if (mainscript.connectableObjs[i] == obj)
			return true;
	}
	return false;
}

function findSide(obj : GameObject) {
	max = jointHandles.length;
	for(i = 0; i<max; i++) {
		if (jointHandles[i] == obj)
			return jNames[i];
	}
	return "";
}
