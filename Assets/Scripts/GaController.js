#pragma strict

//Debug.Log("this happens first");
// import my assisting script(s)
var j:joints;
j=GameObject.Find("main").GetComponent(joints);
while(!j.initialized) yield; //initialized is a variable at the bottom of joints.js

  ////////////////////////////
 // Various genome classes //
////////////////////////////

/*--------------------------------------------------------------------------------------------------------------+
/|																												|
/| It is desirable to abstract out all the assumptions about evolved mechanisms. 								|
/| A genome has a number of genes.																			|
/| Each gene has a descriptive tag.																				|
/| genes are the atomic genomes.  																				|
/| a rigidbody gene will technically be a genome with all the necessary information for the genome builder to	|
/| assemble that rigidbody.																						|
/|______________________________________________________________________________________________________________|
////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/


class GaGene {  							// The generic version of a gene
	var parent:GaGene;
	var canParent:boolean = false;
	var crossoverProbability:float = .5;
	var mutationProbability:float = .02;
	function GaGene() {
	}
	function setNewVal() {
	}
	function assignValue() {
	}
}

class BooleanGene extends GaGene {
	var val:boolean;
	function BooleanGene(parent:GaGene) {
		this.parent = parent;
		}
	function setNewVal() {
		this.val = (Mathf.RoundToInt(Random.value) == 0);
		}
	function assignValue(newval:boolean) {
		this.val = newval;
	}
}

class IntGene extends GaGene{ 				// A gene that contains an int value
	var maxVal:int = 1;
	var minVal:int = 0;
	var val:int;
	function IntGene(parent:GaGene) {
		this.parent = parent;
	}
	function setNewVal() {
		this.val=Mathf.RoundToInt(Random.value*(maxVal-minVal) + minVal);
	}
	function assignValue(newval:int) {
		this.val=newval;
	}
}

class FloatGene extends GaGene{				// A gene that contains a float value
	var minVal:float = 0;
	var maxVal:float = 1;
	var val:float;
	function FloatGene(parent:GaGene) {
		this.parent = parent;
	}
	function setNewVal() {
		this.val=(Random.value*(this.maxVal-this.minVal) + minVal);
	}
	function assignValue(newval:float) {
		this.val=newval;
	}
}

class Vec3Gene extends GaGene { 			// a gene that contains a Vector3 - a 3 D vector
	var minXVal:float = 0;
	var minYVal:float = 0;
	var minZVal:float = 0;
	var maxXVal:float = 1;
	var maxYVal:float = 1;
	var maxZVal:float = 1;
	var val:Vector3;
	function Vec3Gene(parent:GaGene) {
		this.parent = parent; 
	}
	function setNewVal() {
		this.val=Vector3(randomFloat(minXVal,maxXVal),randomFloat(minYVal,maxYVal),randomFloat(minZVal,maxZVal));
	}
	function assignValue(newval:Vector3) {
		this.val = newval;
	}
	function randomFloat(min:float,max:float) {
		return Random.value*(max-min) + min;
	}
}



class JointGene extends GaGene {
	enum jointtype {immobile, hinge, axle}
	var joint:ConfigurableJoint;

	var primaryAxis:Vec3Gene;
	var driven:BooleanGene 		= new BooleanGene(this); 		// whether the object is connected to the drive system
	function JointGene(parent:GaGene) {
		this.parent = parent;
	}	
	function setNewVal() {
		this.driven.setNewVal();
	}
	function assignValue() {
	}
}

class RigidbodyGene extends GaGene {
	var initialAngle:Vec3Gene 	= new Vec3Gene(this); 	// (0,0,90) positions a wheel as standing up straight.  0,0,0 is probably fine for most things.
	var relPosition:Vec3Gene 	= new Vec3Gene(this);	// position relative to parent
	var bodyType:structure; 						// structure enum defined based on available primitives.
	var mass:FloatGene 			= new FloatGene(this); 			// Mass of the object
	function RigidbodyGene(parent:GaGene) {
		this.parent = parent;
	}
	function setNewVal() {
		this.initialAngle.setNewVal();
		this.bodyType = Mathf.RoundToInt(Random.value*structure.GetValues(structure).Length);
		this.mass.setNewVal();
	}
	function assignValue(angle:Vector3,position:Vector3,type:structure,mass:float,driven:boolean) {
	}
}
  //////////////////////////////
 // Basic evolving gene(ome) //
//////////////////////////////

class evolvingGene extends GaGene {
	function evolvingGene(parent:GaGene) {
		this.parent = parent;
		this.canParent = true;
	}
}


  //////////////////////////////
 // Unity specific functions //
//////////////////////////////

function Start() {
}

function Update () {
}

  /////////////////////////////////////
 // Helper functions and parameters //
/////////////////////////////////////

enum structure {box, wheel, sphere}


function loadObject(objType:String,objpos:Vector3,addscript:boolean)
{
	Debug.Log("instantiating " + objType + "At position " + objpos);	
	var obj:GameObject = Instantiate (Resources.Load(objType),objpos,Quaternion.identity);
	Debug.Log(obj);
	obj.transform.position = objpos;
	if (addscript) {
		obj.AddComponent("collisionKiller");		
	}
	/*
	if(addscript) {
		Debug.Log("locating " + objType + " main script");	
		var scriptName = objType+"MainScript";
		Debug.Log("adding "+scriptName);	
		obj.AddComponent(scriptName);
		var thisScript = obj.GetComponent(scriptName);	
		Debug.Log("passing in mainscript of "+this);
		//thisScript.intialize(this);
	}*/
	Debug.Log("returning cart base of type:" + obj.GetType());
	return obj;
}