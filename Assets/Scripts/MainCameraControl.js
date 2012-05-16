var status = "on";
var target:GameObject;



function Update () {
	if(status=="on"){
			if(target){
					//transform.LookAt (target.transform);
			}
			
		//navigation
		var keyMoveFactor = 100;
		var keyRotateFactor = 200;
		
		var mouseMoveFactor = 200;
		var mouseRotateFactor = 400;
		
		//gets the keystroke values
		var forwardBack = Input.GetAxis("Vertical") * keyMoveFactor * Time.deltaTime;
		var rotation = Input.GetAxis("Horizontal") * keyRotateFactor * Time.deltaTime;
		
		//ie. no key presses and left mouse clicked
		if ((forwardBack == 0) && (rotation == 0) && Input.GetMouseButton(0)){
			forwardBack = Input.GetAxis("Mouse Y") * mouseMoveFactor * Time.deltaTime;
			rotation = Input.GetAxis("Mouse X") * mouseRotateFactor * Time.deltaTime;
		}
		
		//middle button is default, zooms
		if ((forwardBack == 0) && (rotation == 0) && Input.GetMouseButton(2)){
			forwardBack = Input.GetAxis("Mouse Y") * mouseMoveFactor * Time.deltaTime;
			transform.Translate(0,0,forwardBack,Space.Self);
		}//shift is default, moves up and down
		else if(Input.GetKey(KeyCode.LeftShift)){
			Debug.Log("got keyleft shift");
			transform.Translate(0,forwardBack/2,0,Space.World);
		}//ctrl is default, rotates camera
		else if(Input.GetKey(KeyCode.LeftControl)){
			transform.Rotate(0,rotation,0,Space.World);
			transform.Rotate(-1*forwardBack,0,0,Space.Self);
		}//otherwise just move
		else{
			var movement = transform.TransformDirection(Vector3.forward)*forwardBack;
			movement.y = 0; //(don't want vertical movement)
			transform.Translate(movement,Space.World);
			transform.Rotate(0,rotation,0,Space.World);
		}
	}
}

function Toggle(){
	this.MonitorUserInput(status=="off");
}
//determines whether user is currently controlling this camera (ie. to allow switching of cameras and making sure this one
//stays put while the other follows
function MonitorUserInput(newVal : boolean){
	isEnabled = newVal;
	camera.enabled = isEnabled;
}