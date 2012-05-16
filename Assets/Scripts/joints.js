//joints section
//Debug.Log("joints script is loaded");
var myParams= new Array();
myParams[0]="xmove";
myParams[1]="ymove";
myParams[2]="zmove";
myParams[3]="xangmove";
myParams[4]="yangmove";
myParams[5]="zangmove";

myParams[6]="xdrivemode";
myParams[7]="ydrivemode";
myParams[8]="zdrivemode";

myParams[9]="xdrivespring";
myParams[10]="ydrivespring";
myParams[11]="zdrivespring";

myParams[12]="xdrivedamper";
myParams[13]="ydrivedamper";
myParams[14]="zdrivedamper";

myParams[15]="xdrivemaxforce";
myParams[16]="ydrivemaxforce";
myParams[17]="zdrivemaxforce";

myParams[18]="xangdrivemode";
myParams[19]="yorzangdrivemode";
myParams[20]="slerpdrivemode";

myParams[21]="xangdrivespring";
myParams[22]="yorzangdrivespring";
myParams[23]="slerpdrivespring";

myParams[24]="xangdrivedamper";
myParams[25]="yorzangdrivedamper";
myParams[26]="slerpdrivedamper";

myParams[27]="xangdrivemaxforce";
myParams[28]="yorzangdrivemaxforce";
myParams[29]="slerpdrivemaxforce";

myParams[30]="linearlimitlimit";
myParams[31]="linearlimitspring";
myParams[32]="linearlimitdamper";
myParams[33]="linearlimitbouncyness";

myParams[34]="lowangularlimitlimit";
myParams[35]="lowangularlimitspring";
myParams[36]="lowangularlimitdamper";
myParams[37]="lowangularlimitbouncyness";

myParams[38]="highangularlimitlimit";
myParams[39]="highangularlimitspring";
myParams[40]="highangularlimitdamper";
myParams[41]="highangularlimitbouncyness";

myParams[42]="angularylimitlimit";
myParams[43]="angularylimitspring";
myParams[44]="angularylimitdamper";
myParams[45]="angularylimitbouncyness";

myParams[46]="angularzlimitlimit";
myParams[47]="angularzlimitspring";
myParams[48]="angularzlimitdamper";
myParams[49]="angularzlimitbouncyness";

myParams[50]="targetposition";
myParams[51]="targetvelocity";
myParams[52]="targetrotation";
myParams[53]="targetangularvelocity";

myParams[54]="rotationdrivemode";

myParams[55]="anchor";

myParams[56]="breakforce";
myParams[57]="breaktorque";
myParams[58]="motionaxis";

//Debug.Log(myParams.length);

var unityParams=new Array();
unityParams[0]="thejoint.xMotion";
unityParams[1]="thejoint.yMotion";
unityParams[2]="thejoint.zMotion";

unityParams[3]="thejoint.angularXMotion";
unityParams[4]="thejoint.angularYMotion";
unityParams[5]="thejoint.angularZMotion";

unityParams[6]="thejoint.xDrive.mode";
unityParams[7]="thejoint.yDrive.mode";
unityParams[8]="thejoint.zDrive.mode";

unityParams[9]="thejoint.xDrive.positionSpring";
unityParams[10]="thejoint.yDrive.positionSpring";
unityParams[11]="thejoint.zDrive.positionSpring";

unityParams[12]="thejoint.xDrive.positionDamper";
unityParams[13]="thejoint.yDrive.positionDamper";
unityParams[14]="thejoint.zDrive.positionDamper";

unityParams[15]="thejoint.xDrive.maximumForce";
unityParams[16]="thejoint.yDrive.maximumForce";
unityParams[17]="thejoint.zDrive.maximumForce";

unityParams[18]="thejoint.angularXDrive.mode";
unityParams[19]="thejoint.angularYZDrive.mode";
unityParams[20]="thejoint.slerpDrive.mode";

unityParams[21]="thejoint.angularXDrive.positionSpring";
unityParams[22]="thejoint.angularYZDrive.positionSpring";
unityParams[23]="thejoint.slerpDrive.positionSpring";

unityParams[24]="thejoint.angularXDrive.positionDamper";
unityParams[25]="thejoint.angularYZDrive.positionDamper";
unityParams[26]="thejoint.slerpDrive.positionDamper";

unityParams[27]="thejoint.angularXDrive.maximumForce";
unityParams[28]="thejoint.angularYZDrive.maximumForce";
unityParams[29]="thejoint.slerpDrive.maximumForce";

unityParams[30]="thejoint.linearLimit.limit";
unityParams[31]="thejoint.linearLimit.spring";
unityParams[32]="thejoint.linearLimit.damper";
unityParams[33]="thejoint.linearLimit.bouncyness";

unityParams[34]="thejoint.lowAngularXLimit.limit";
unityParams[35]="thejoint.lowAngularXLimit.spring";
unityParams[36]="thejoint.lowAngularXLimit.damper";
unityParams[37]="thejoint.lowAngularXLimit.bouncyness";

unityParams[38]="thejoint.highAngularXLimit.limit";
unityParams[39]="thejoint.highAngularXLimit.spring";
unityParams[40]="thejoint.highAngularXLimit.damper";
unityParams[41]="thejoint.highAngularXLimit.bouncyness";

unityParams[42]="thejoint.angularYLimit.limit";
unityParams[43]="thejoint.angularYLimit.spring";
unityParams[44]="thejoint.angularYLimit.damper";
unityParams[45]="thejoint.angularYLimit.bouncyness";

unityParams[46]="thejoint.angularZLimit.limit";
unityParams[47]="thejoint.angularZLimit.spring";
unityParams[48]="thejoint.angularZLimit.damper";
unityParams[49]="thejoint.angularZLimit.bouncyness";

unityParams[50]="thejoint.targetPosition";
unityParams[51]="thejoint.targetVelocity";
unityParams[52]="thejoint.targetRotation";
unityParams[53]="thejoint.targetAngularVelocity";

unityParams[54]="thejoint.rotationDriveMode";
unityParams[55]="thejoint.anchor";
unityParams[56]="thejoint.breakForce";
unityParams[57]="thejoint.breakTorque";
unityParams[58]="thejoint.axis";

var myValues= new Array();
myValues[0]="lock";
myValues[1]="limited";
myValues[2]="free";
myValues[3]="none";
myValues[4]="position";
myValues[5]="velocity";
myValues[6]="positionandvelocity";
myValues[7]="xyz";
myValues[8]="slerp";
myValues[9]="perp";

var unityValues=new Array();
unityValues[0]="ConfigurableJointMotion.Locked";
unityValues[1]="ConfigurableJointMotion.Limited";
unityValues[2]="ConfigurableJointMotion.Free";
unityValues[3]="JointDriveMode.None";
unityValues[4]="JointDriveMode.Position";
unityValues[5]="JointDriveMode.Velocity";
unityValues[6]="JointDriveMode.PositionAndVelocity";
unityValues[7]="RotationDriveMode.XYAndZ";
unityValues[8]="RotationDriveMode.Slerp";
unityValues[9]="theJoint.axis";
    

function createJoint(startobject:GameObject,endobject:GameObject){
	axis=(startobject.transform.position-endobject.transform.position)/2;
	anchor=axis;
	return createJoint(startobject,endobject,anchor,axis);
}

function createJoint(startobject:GameObject,endobject:GameObject,jointAxis:Vector3){
	anchor=jointAxis;
	return createJoint(startobject,endobject,anchor,jointAxis);
}

function createJoint(startobject:GameObject,endobject:GameObject,jointAnchor:Vector3,jointAxis:Vector3){
	thejoint=startobject.AddComponent(ConfigurableJoint);
	thejoint.axis=jointAxis;
	//Debug.Log(thejoint.axis);
	thejoint.anchor=jointAnchor;
	lockAxes(startobject);
	//endobject.transform.position;
	//thejoint.angularZMotion=ConfigurableJointMotion.Free;
	thejoint.connectedBody=endobject.rigidbody;//has to be done last
	return thejoint;
}

function lockAxes(startobject){
	//Debug.Log("locking joints");
	thejoint=startobject.GetComponent(ConfigurableJoint);
	//Debug.Log("locking joint"+thejoint);
	thejoint.xMotion=ConfigurableJointMotion.Locked;
	thejoint.yMotion=ConfigurableJointMotion.Locked;
	thejoint.zMotion=ConfigurableJointMotion.Locked;
	thejoint.angularXMotion=ConfigurableJointMotion.Locked;
	thejoint.angularYMotion=ConfigurableJointMotion.Locked;
	thejoint.angularZMotion=ConfigurableJointMotion.Locked; 
	var dude:Rigidbody;
	dude=thejoint.connectedBody;
	thejoint.connectedBody=dude;//has to be done last	
}   


//example joint1 breakforce=10;breakitdown=breakmine;etc)
function changeJoint(thejoint,jointchanges){
	//Debug.Log("changing joints");
	//Debug.Log(jointchanges);
	l=jointchanges.length;
	if (jointchanges[l-1]==";"[0]){
		//Debug.Log("there is a semicolon at the end");
		jointchanges=jointchanges.Substring(0,l-1);
		//Debug.Log(jointchanges);
		//Debug.Log("is semicolon removed?");
	}
	jointchangesA=new Array();
	jointchangesA=Regex.Split(jointchanges,";");
	for  (i=0;i<jointchangesA.length;i++){
		jointparamA=new Array();
		jointparamA=Regex.Split(jointchangesA[i],"=");
		ptype=jointparamA[0];
		pvalue=jointparamA[1];
		Debug.Log("p "+ptype+" "+pvalue);
		
		//Debug.Log(pvalue+"after");
		utype=myParamToUnityParam(ptype);
		if (ptype=="targetrotation"){
			pvalue=toQuaternion(pvalue);
		}
		//Debug.Log("pvalue="+pvalue);
		uvalue=myValueToUnityValue(pvalue);
		//Debug.Log("u "+utype+" "+uvalue);
		
		if(utype && uvalue){
			//Debug.Log(utype + "=" + uvalue);	

			// TODO: REPLACE THIS EVAL			eval(utype + "=" + uvalue);		
			cb=thejoint.connectedBody;
			thejoint.connectedBody=cb;	
		}
		else{
			Debug.LogWarning("changeJoint reporting param or value error");
		}
	}
}


function toQuaternion(vec){
	Debug.Log("vec="+vec);
	if (Regex.IsMatch(vec,"vec")){
		re="vec";
		vec=Regex.Replace(vec,re,"Vector3");
		}
	
	// TODO: REPLACE THIS EVAL vece=eval(vec);
	//Debug.Log(vece);
	Qt = Quaternion.Euler(vec);
	//Debug.Log(Qt);
	return "Quaternion"+Qt.ToString();
	}


function myParamToUnityParam(theparam){
	Debug.Log(theparam+" converting param to unity param");
	wordnum=-1;
	for(i=0;i<myParams.length;i++){
		//Debug.Log(theparam + "," + myParams[i]);
		if (theparam==myParams[i]){
			wordnum=i;
			break;
		}
	}
	//Debug.Log(wordnum + "wordnum");
	if(wordnum!=-1){
		return unityParams[wordnum];
	}
	else{
		Debug.LogWarning("warning: myParamToUnityParam cannot find parameter" + theparam);
		return 0;
	}
}
	
function myValueToUnityValue(thevalue){
	//Debug.Log(thevalue+" converting value to unityvalue");
	wordnum=-1;
	for(i=0;i<myValues.length;i++){
		if (thevalue==myValues[i]){
			wordnum=i;
			break;
		}
	}
	if(wordnum!=-1){
		return unityValues[wordnum];
	}
	else{
		
		if (Regex.IsMatch(thevalue,"vec")){
			re="vec";
			myvalue=Regex.Replace(thevalue,re,"Vector3");
			return myvalue;
		}	
		//Debug.Log("error cannot find it");
		return thevalue;	
	}
}
	
	var initialized=true;
	Debug.Log("joints initialized");