#pragma strict

//Debug.Log("this happens first");
// import my assisting script(s)
var j:joints;
j=GameObject.Find("main").GetComponent(joints);
while(!j.initialized) yield; //initialized is a variable at the bottom of joints.js


////////////////////
/* Genome classes */
////////////////////

// This will eventually be the only genome class, probably.
// It is desirable to abstract out all the assumptions about evolved mechanisms. 
// A genome has a dictionary of genes.
// Each gene has a descriptive tag.
// genes are the atomic genomes.  
// a rigidbody gene will technically be a genome with all the necessary information for the genome builder to
// assemble that rigidbody.
// 
 		 		
/*The GaGenome class is an interface to be subclassed into cartgenomes, boat genomes, etc. */
class GaGenome {					
	var crossoverProbability = .5; // change to be a per-gene value?  Maybe during refactoring later.
	var mutationProbability = .01; // change to be a per-gene value?
	
	function crossover(localgenome:GaGenome, othergenome:GaGenome) {
		// Generic crossover function - if a genome shares gene names with another genome, the values will crossover with some probability, probably also coded up in a genome somewhere.
		var localtype = localgenome.GetType();
		var othertype = othergenome.GetType();
		Debug.Log(localtype.Attributes);

//		for (localGene in localgenome.fields) {
//			for (remoteGene in othergenome.fields) {
//				if (localGene.type==remoteGene.type) { 						// If both genomes have the same gene
//					if (Random.value < localgenome.crossoverProbability) {	// and the local genome probability indicates to, then perform crossover
//						var tmpval = localgenome[localGene];
//						localgenome[localGene] = othergenome[remoteGene];
//						othergenome[remoteGene] = tmpval;
//					}
//				}
//			}
//		}
	}
	function mutate(localgenome:GaGenome) {
		// generic mutation function - will mutate each of the genes in a genome with some probability (perhaps even a probability set somewhere in the genome?) 
//		for (var localGene:GaGene in localgenome) {
//			if (Random.value < localgenome.mutationProbability) {
//				localGene.val = localGene.newVal();
//			}
//		}
	}
	function randomVector3(scale:float) {
		return new Vector3((Random.value*2-1)*scale,(Random.value*2-1)*scale,(Random.value*2-1)*scale);
	}
	function randomVector3() {
		return new Vector3(Random.value*2-1,Random.value*2-1,Random.value*2-1);
	}
}

/* Wheel Genome is a subclass of genome that is particularly useful for carts. */
class WheelGenome extends GaGenome{
	var radius:int;
	var thickness:int;
	var initialAngle:Vector3; 	// (0,0,90) positions the wheel as standing up straight
	var wheelType:String; 				// will eventually be an 'enum' probably.  Right now I only have one wheel type.
	
	var mass:float; 			// derived from radius,thickness and wheeltype.
	var driven:boolean; 		// whether the wheel is connected to the drive system
	function WheelGenome() { //position){
		this.initialAngle = Vector3(0,0,90);
		this.wheelType = "cartWheel";
	}
}

/*  Cart Genome is the genome that contains all the genes necessary to configure a cart.  
	The actual assembly is done by a separate class, a 'cartmaker' */
class CartGenome extends GaGenome{

    static var motorSpeedFactor = 10000;
    static var motorTorqueFactor = 1000;
    
    var drivepowerMass:float;			// How much mass is available for the batteries and the motor.
    
	var powerPackAllocation:float;   	// Determines how much of the total mass available for driving is available to the power pack     

	var motorAllocation:float; 			// Determines how much of the total mass available for driving is available to the motor
    var motorSpeedAllocation:float;		// Determines how much of the mass available for the motor should be used increasing top motor speed
    var motorTorqueAllocation:float;	// Determines how much of the mass available for the motor should be used increasing top motor torque
    
    var structureMass:float;			// Increasing structure mass increases the distance components can be placed from the cart structure CG. (the primary origin / datum ) 
    
    var powerPackCG:Vector3;			// position of the power pack
    var motorCG:Vector3;				// position of the motor
    var structureMassCG:Vector3;		// will initially just be (0,1,0), but may have a variable y parameter - how high off the ground the structure nominally sits.
    
    var numWheels:int;					// How many wheels the cart has
    var wheelPositions:Vector3[];		// array of wheel positions - is checked to ensure no collisions between existing wheels or the body of the vehicle.
    var WheelGenomes:WheelGenome[];		// array of wheel genomes - determines the type of wheel (wheg? circular?), radius, mass, width, etc.
    
	function CartGenome() {
	    this.drivepowerMass = Random.value*10;	    
		this.powerPackAllocation = Random.value;    
		this.motorAllocation = Random.value;
	    this.motorSpeedAllocation = Random.value;
	    this.motorTorqueAllocation = Random.value;
	    
	    this.structureMass = Random.value*10+1;
	    this.powerPackCG = this.randomVector3();
	    this.motorCG = randomVector3();
	    this.numWheels = Mathf.CeilToInt(Random.value*5);
	    this.wheelPositions = new Vector3[this.numWheels];// = new Array(this.numWheels);
	    this.WheelGenomes = new WheelGenome[this.numWheels]; //= new Array(this.numWheels);
	    for(var i=0; i<this.numWheels; i++) {
	    	this.WheelGenomes[i] = new WheelGenome(); //randomVector3());
	    	this.wheelPositions[i] = randomVector3();
	    }
	}
}

/*  A cartmaker is an assembly routine that knows how to put together a cart given a cartgenome.
	Eventually this will probably go away as a more generic assember is written  - one that can
	validate a genome and assemble the object it codes for. */

class CartMaker {
	var numcarts:int;
	var gaController:natoworld;
	var carts:GameObject[];
	
	function CartMaker(numcarts:int,caller:natoworld) { 
		this.numcarts = numcarts;
		this.gaController = caller;
		this.carts = new GameObject[numcarts];
	}
	function makeCarts() {
		for(var i = 0; i<this.numcarts; i++) {
			var name:String;
			var position:Vector3;
			name = "cartnumber"+i.ToString;
			position = Vector3(i*4 - 10,5,0);
			var genome = new CartGenome();
			this.carts[i] = (this.makeCart(i,name,position,genome));
		}
		return this.carts;
	}	
	function makeCart(index:int,name:String,position:Vector3,genome:CartGenome) {
		
		// Determine how 'spread out' all the pieces of the cart are.  
		var structuralDistance = Mathf.Sqrt(genome.structureMass);

		// Determine the masses of the various structural components
		var basemass = genome.structureMass;
		
		var drivetotal:float = genome.motorAllocation+genome.powerPackAllocation;
		var motormass = (genome.motorAllocation/drivetotal)*genome.drivepowerMass;
		var powerpackmass = (genome.powerPackAllocation/drivetotal)*genome.drivepowerMass;
		var cart:GameObject = this.gaController.loadObject("cartBase",position,false);
		
		// If our motor or power pack are too light, then the joints will make them go crazy.  Don't let that happen:
		if (motormass>(basemass/10) && motormass<(basemass*10)){
			var motor:GameObject = this.gaController.loadObject("sphere",position + genome.motorCG*structuralDistance,false);
		} else {
			motor = null;
			}
		if (powerpackmass>(basemass/10) && powerpackmass<(basemass*10)) {
			var powerpack:GameObject = this.gaController.loadObject("sphere",position + genome.powerPackCG*structuralDistance,false);
		} else {
			powerpack = null;
			}
		
		// It's possible at this point that one of our components may be nonexistent.
		if (motor == null || powerpack == null){
			Debug.Log("unable to load some object - motor or powerpack.  Returning a null cart.");
			return null;
		}else{
			// Our component masses are fine.  Lets create them.
			cart.rigidbody.mass = basemass;
			motor.rigidbody.mass = motormass;
			powerpack.rigidbody.mass = powerpackmass;
			
			// connect the joint to the motor.  It will start at the motor, go to the cart.  It has a center at the center of the motor(0,0,0), and a primary axis of (1,0,0) - the x axis.
			var motorjoint = gaController.j.createJoint(motor,cart,Vector3(0,0,0),Vector3(1,0,0));
			// connect the joint to the powerpack.  It will start at the pack, go to the cart.  It has a center at the center of the pack(0,0,0), and a primary axis of (1,0,0) - the x axis.
			var packjoint = gaController.j.createJoint(powerpack,cart,Vector3(0,0,0),Vector3(1,0,0));
			
			Debug.Log("build wheels");
			//var wheels = Array(genome.numWheels);
			var wg:WheelGenome;
			for(var i=0; i<genome.numWheels; i++) {
				wg = genome.WheelGenomes[i];
				var wheel:GameObject = this.gaController.loadObject(wg.wheelType,position + genome.wheelPositions[i]*structuralDistance,false);
				wheel.transform.Rotate(wg.initialAngle);
				var joint:ConfigurableJoint = gaController.j.createJoint(wheel,cart,Vector3(0,0,0),Vector3(1,0,0));
				joint.angularYMotion=ConfigurableJointMotion.Free;
				joint.targetAngularVelocity=Vector3(0,1,0);
				joint.angularYZDrive.mode=JointDriveMode.Velocity;	
			}
			return cart;
		}
	}
}

/*  Separate from the genome or the mechanism assembly process is the process of evaluating the
	performance of the evoving mechanism. There are several types of metrics that will have to be
	evaluated.  Initially, for carts, this will probably be things like total distance traveled,
	max speed, max angular rate, average speed, total mass, as well as an automatic veto for 
	physically impossible constructions (ie. ones with self-intersecting components).  Note that
	this is not an evaluation of the genome at all, only the physical manifestation of the 
	mechanism. */

class CartEvaluator {
	function CartEvaluator() {
	}
	function evaluate(cart:GameObject,duration:int) {
		checkForCollisions(cart);
	}
	function checkForCollisions(cart:GameObject) {
	}
}

/*  Once carts (or other generic mechanisms) have been evaluated, they must reproduce.
	A Replicator takes the evaluated performance values for mechanisms and determines 
	which of them interbreed, then performs that interbreeding.  The breeding process
	will initially be linear, but when the generic genome is finished, it will be a 
	recursive process. */  
class CartReplicator {
	function CartReplicator() {
	}
}


/*  Here we set up the initial conditions and build each of the components of the GA
	process.*/

function Start() {
	var evaluator:CartEvaluator = new CartEvaluator();
	var replicator:CartReplicator = new CartReplicator();
	var maker:CartMaker = new CartMaker(5,this);
	maker.makeCarts();	
}


/* Helper functions */
function loadObject(objType:String,objpos:Vector3,addscript:boolean)
{
	Debug.Log("instantiating " + objType + "At position " + objpos);	
	var obj:GameObject = Instantiate (Resources.Load(objType),objpos,Quaternion.identity);
	Debug.Log(obj);
	obj.transform.position = objpos;
	if(addscript) {
		Debug.Log("locating " + objType + " main script");	
		var scriptName = objType+"MainScript";
		Debug.Log("adding "+scriptName);	
		obj.AddComponent(scriptName);
		var thisScript = obj.GetComponent(scriptName);	
		Debug.Log("passing in mainscript of "+this);
		//thisScript.intialize(this);
	}
	Debug.Log("returning cart base of type:" + obj.GetType());
	return obj;
}