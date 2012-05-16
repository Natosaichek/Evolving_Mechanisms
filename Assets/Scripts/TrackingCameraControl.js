var isEnabled = true;
var target : GameObject;

var initialLocation : Vector2; //(distance, height)
var currentLocation : Vector2;

// How much the movement is dampened
var heightDamping = 2.0;
var rotationDamping = 3.0;

var offsetAngle = 0;
var initialOffsetFactor = 8;

function Start(){
	//this is to setup the initial position of the camera relative to the model.
	//all the if's are so that it can properly position itself even for a variety of different model setups (ie. some things don't have
	//colliders
	var temp; var tempHeight;
	if (target.GetComponent(Collider) != null){
		temp = target.GetComponent(Collider).bounds.extents;
		tempHeight = temp.y;
		temp.y = 0;
		initialLocation = initialOffsetFactor*Vector2(temp.magnitude, tempHeight);
	}else if (target.GetComponent(CharacterController) != null){
		temp = target.GetComponent(CharacterController);
		initialLocation = initialOffsetFactor*Vector2(temp.radius, temp.height);
	}else if (target.GetComponent(Renderer) != null){
		temp = target.GetComponent(Renderer).bounds.extents;
		tempHeight = temp.y;
		temp.y = 0;
		initialLocation = initialOffsetFactor*Vector2(temp.magnitude, tempHeight);
	}else{
		initialLocation = Vector2(8,4);	
	}
	currentLocation = initialLocation;
	
	transform.position = new Vector3(currentLocation.x,currentLocation.y,currentLocation.x);
}

function Update () {
	//getting key inputs
	if(isEnabled){
		//navigation	
		var mouseMoveFactor = 60;
		var mouseRotateFactor = 400;
	
		//middle button = zoom
		if (Input.GetMouseButton(2)){
			var ratio = currentLocation.y/currentLocation.x;
			currentLocation.x += Input.GetAxis("Mouse Y") * mouseMoveFactor * Time.deltaTime;
			currentLocation.y += Input.GetAxis("Mouse Y") * mouseMoveFactor * Time.deltaTime *ratio;
		}
		
		//left click: up and down = change height, right& left = change offset
		if(Input.GetMouseButton(0)){
			currentLocation.y += Input.GetAxis("Mouse Y") * mouseMoveFactor * Time.deltaTime;
			currentLocation.y = currentLocation.y > 25 ? 25: currentLocation.y;
			currentLocation.y = currentLocation.y < -25 ? -25: currentLocation.y;
			offsetAngle += Input.GetAxis("Mouse X") * mouseRotateFactor * Time.deltaTime;
		}
		
		//2 is default, sets new target
		if(false){
			SetTargetControls(false);
			
			//searches through all the game objects deemed "tagable" for the one right after the current one
			var objectsInScene = GameObject.FindGameObjectsWithTag("Targetable");
			
			if(objectsInScene.length > 1){
				var getNext = false;
				for(var currObject : GameObject in objectsInScene){
					if(getNext){
						SetNewTarget(currObject);
						getNext = false;
					}else if(currObject == target){
						getNext = true;	
					}
				}
				
				//ie we were on the last object
				if(getNext){
					SetNewTarget(objectsInScene[0].gameObject);
				}
			}
			
			SetTargetControls(true);
		}
		
		//3 is default, resets to initial camera positioning
		if(false){
			offsetAngle = 0;
			currentLocation = initialLocation;
		}
		
		//4 is default, resets to facing the front (180)
		if(false){
			offsetAngle = 180;
			currentLocation = initialLocation;
		}
		
		//5 is default, resets to top [approximately]
		if(false){
			offsetAngle = 0;
			currentLocation = initialLocation;
			currentLocation.y = 25;
		}
	}
	
	//the actual target following
	if(isEnabled && target){
		targetTrans = target.transform;
		// Calculate the current rotation angles
		wantedRotationAngle = targetTrans.eulerAngles.y + offsetAngle;
		wantedHeight = targetTrans.position.y + currentLocation.y;
			
		currentRotationAngle = transform.eulerAngles.y;
		currentHeight = transform.position.y;
		
		// Damp the rotation around the y-axis
		currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);
	
		// Damp the height
		currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);
	
		// Convert the angle into a rotation
		currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);
		
		// Set the position of the camera on the x-z plane to:
		// distance meters behind the target
		
		transform.position = targetTrans.position;
		transform.position -= currentRotation * Vector3.forward * currentLocation.x;
	
		// Set the height of the camera
		transform.position.y = currentHeight;			
		// Always look at the target
		transform.LookAt (targetTrans);
	}
	
	
}

function Toggle(){
	this.MonitorUserInput(!isEnabled);
}

//called to let this know it should be listening and responding to user key/mouse commands
function MonitorUserInput(newVal : boolean){
	isEnabled = newVal;
	camera.enabled = isEnabled;
}

//making sure the camera and it's target are on the same page
function SetTargetControls(newVal: boolean){
	target.SendMessage("MonitorUserInput",newVal,SendMessageOptions.DontRequireReceiver);	
}

function currentTarget(){
	return target;	
}

function SetNewTarget(newTarget: GameObject){
	transform.LookAt(newTarget.transform);
	target = newTarget;	
	
	this.Start(); 
}

function SwitchTargets(){};


