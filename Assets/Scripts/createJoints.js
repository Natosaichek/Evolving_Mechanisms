
var jointTools = null;
jointTools = this.gameObject.GetComponent("joints");

function createJoint(startobject:GameObject,endobject:GameObject)
	{
	thejoint=startobject.AddComponent("ConfigurableJoint");
	thejoint.axis=startobject.transform.position-endobject.transform.position;
	//thejoint.axis=Vector3(0,1,0);
	//Debug.Log(thejoint.axis);
	thejoint.anchor=(startobject.transform.position + endobject.transform.position)/2;
	//jointTools.lockAxes(startobject);
	//endobject.transform.position;
	//thejoint.angularZMotion=ConfigurableJointMotion.Free;
	thejoint.connectedBody=endobject.rigidbody;//has to be done last
	return thejoint;
	}


function specializedJoint(jointType,startobject:GameObject,endobject:GameObject)
	{
	thejoint = createJoint(startobject,endobject);
	switch(jointType)
		{
		case"ujoint":
			thejoint.xMotion=ConfigurableJointMotion.Locked;
			thejoint.yMotion=ConfigurableJointMotion.Locked;
			thejoint.zMotion=ConfigurableJointMotion.Locked;
			thejoint.angularXMotion=ConfigurableJointMotion.Locked;
			thejoint.angularYMotion=ConfigurableJointMotion.Locked;
			thejoint.angularZMotion=ConfigurableJointMotion.Locked;
		break;
		
		case"verticalhinge":
			thejoint.xMotion=ConfigurableJointMotion.Locked;
			thejoint.yMotion=ConfigurableJointMotion.Locked;
			thejoint.zMotion=ConfigurableJointMotion.Locked;
			thejoint.angularXMotion=ConfigurableJointMotion.Locked;
			thejoint.angularYMotion=ConfigurableJointMotion.Limited;
			thejoint.angularZMotion=ConfigurableJointMotion.Locked;
		break;
		}
	thejoint.connectedBody=thejoint.connectedBody;//has to be done last		
	return thejoint;
	}
