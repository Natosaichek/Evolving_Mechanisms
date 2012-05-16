//When an object is added to the world we attach a script like one to it so the object has properties. For example this script could
//be used to make a car operate like a car. All protperties
//in this script can be accessed through the main script by first accessing the gameObject that the script is attached to,
//then accessing the Component -- which is the script, and then accessing variables or functions in the script.  Here is an example
//Cow1.getComponent("CowScript").pos=Vector3(); where Cow1 is the gameObject Name and CowScript is the name of the script we attached
//when we loaded the model.
//This technique is great because it allows us to make any object have scripted properties. As soon as we attach the script to the object
//The script will operate on that object.




//initialize variables and types
var acc:Vector3=Vector3(0,0,0);
//forces is an array so multiple forces can be applied
var forces:Array=new Array();
//force positions is an array so each force can have a different starting point if necessary
var forcepositions:Array=new Array();
var modeltype:String;
var pos:Vector3;
var scale:Vector3;
var vel:Vector3;
var torq:Vector3;
var torques:Array=new Array();
var torquestotal:Vector3;
var forcestotal:Vector3;
var forcepositionstotal:Vector3;
//the physics material sets things like friction etc.
var physicsMaterial:PhysicMaterial;

//this function is called to initialize the object which means to add the rigid body and collider type
//Collider type can be sphere or cube or mesh see docs. 
//each collider has a default physics material which is the physicsMaterial but it is accessed using rigidbody.collider.material...
//not a texture material.Remember this script is attached to an object by the csb script
//once that is done then gameObject refers to the object the script is attached to and rigidBody is the rigidBody of the
//gameObject remember these lower case terms are shortcuts to use instead of GameObject.Find('thename').etc...

function initialize(){
Debug.Log(gameObject.name);
gameObject.AddComponent (Rigidbody); 
gameObject.AddComponent (BoxCollider); 
rigidbody.collider.material.staticFriction=.2;
rigidbody.collider.material.dynamicFriction=.2;
rigidbody.collider.material.frictionCombine=PhysicMaterialCombine.Average;  //if the floor is 0 and the object is 1 the combo will be .5
rigidbody.drag=0;
rigidbody.angularDrag=0;
rigidbody.mass=10;
rigidbody.isKinematic=false;//kinematic objects do not participate in motion physics but still have mass and collide with things
rigidbody.useGravity=false;//turn off the fake gravity so we can use our own.

//these are my own variables set to 0 to start. They can be accessed from another script using the following method
//first get the game object, then get the component that has this script then set the variable for example
//if the game object is cube1 and the script is called CubePhysics then it would be done like this
//thecube = GameObject.Find("cube1").GetComponent("CubePhysics").acc=Vector3(3,2,0)
//function in this script can also be accessed that way.

acc=Vector3(0,0,0);
forces[0]=Vector3(0,0,0);
forcepositions[0]=Vector3(0,0,0);
torquestotal=Vector3.zero;
forcestotal=Vector3.zero;





//Here is how to create a new physical material if necessary create own materials if neceesary;
var ice : PhysicMaterial; 
var wood : PhysicMaterial; 

}

//You can call these functions from the main script using the following method:

//first get the game object, then get the component that has this script then set the variable for example
//if the game object is cube1 and the script is called CubePhysics then it would be done like this
//thecube = GameObject.Find("cube1").GetComponent("CubePhysics").setFriction(0);


function setFriction(stuff){
rigidbody.collider.material.staticFriction=stuff;
rigidbody.collider.material.dynamicFriction=stuff;
}

//  This nextfunction is red because it is a built in Unity3d Function to run physics. FixedUpdate is used to do all physics calculations
//and may run many frames per second.
//the other function Update() is run every frame and will run faster or slower on different machines.

function FixedUpdate () {
	if(acc!=Vector3.zero){
	rigidbody.AddForce(acc,ForceMode.Acceleration);
	}
	
	//I am setting these at 0 and then adding all the new foces. Resetting them is necessary because otherwise the old forces
	//will accumulate when you try to add new ones. Think of a force application as something that happens instantenously at each fixed update iteration
forcestotal=Vector3.zero;
torquestotal=Vector3.zero;
			for(i=0;i<forces.length;i++){
			forcestotal=forcestotal+forces[i];
			torquestotal=torquestotal+Vector3.Cross((forcepositions[i]-rigidbody.transform.localPosition),(forces[i]));
			Debug.Log("torques"+torquestotal);
			Debug.Log("forces"+forcestotal);
			
		}
		if (forcestotal!=Vector3.zero){
			rigidbody.AddForce(forcestotal,ForceMode.Force);
	}

		if(torquestotal!=Vector3.zero){
	rigidbody.AddTorque(torquestotal,ForceMode.Force);
	}

	
	
	}

//access these functions from the CSB script using the method described above
function setmass(mymass){
rigidbody.mass=mymass;	
}

function setvel(myvel:Vector3){
rigidbody.velocity=myvel;	
//Application.ExternalCall ("fromUnity", "alert('"+rigidbody.velocity+"')");
//Application.ExternalCall ("debugU", rigidbody.velocity);
}

function setpos(mypos){
transform.position=vel;	
}

function setrot(myrot){
transform.eulerAngles=myrot;	
}

function setacc(myacc){
acc=myacc;	
}

function setscale(myscale){
transform.localScale=Vector3(myscale,myscale,myscale);	
}



