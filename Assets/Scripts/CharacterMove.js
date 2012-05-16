var speed = 20;
var walk;
var run;
var idle;
var jump;
Debug.Log(gameObject.animation["walk"]);
if (gameObject.animation["walk"]){walk=true;}
if (gameObject.animation["run"]){run=true;}
if (gameObject.animation["idle"]){idle=true;}
if (gameObject.animation["jump"]){jump=true;}
var rotationSpeed = 100.0;
rigidbody.isKinematic=false;
rigidbody.useGravity=true;
function Update () {
// Get the horizontal and vertical axis.
// By default they are mapped to the arrow keys.
// The value is in the range -1 to 1
var translation = Input.GetAxis ("Vertical") * speed;
var rotation = Input.GetAxis ("Horizontal") * rotationSpeed;

if ((Input.GetKeyDown ("space"))&&(transform.position.y<2)) {
rigidbody.velocity=rigidbody.velocity+Vector3(0,10,0);
if(jump){
gameObject.animation.CrossFade("jump", 0.2);
}
}
// Make it move 10 meters per second instead of 10 meters per frame...
if(translation>0){gameObject.animation.CrossFade("walk", 0.2);}
translation *= Time.deltaTime;
rotation *= Time.deltaTime;

// Move translation along the object's z-axis
transform.Translate (0, 0, translation);
// Rotate around our y-axis
transform.Rotate (0, rotation, 0);
}


