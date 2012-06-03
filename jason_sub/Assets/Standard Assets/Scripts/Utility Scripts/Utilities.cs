using System;
using UnityEngine;


	public class Utilities : MonoBehaviour
	{
		public Utilities ()
		{
			
		}
		
		public static Vector3 RandomVector3()
		{
			return RandomVector3((float)1.0,(float)1.0,(float)1.0); 
		}
		
		public static Vector3 RandomVector3(float max_x,float max_y, float max_z)
		{
			System.Random rand = new System.Random();
			Vector3 newVect = new Vector3();
			newVect.Set ((float)rand.NextDouble()*max_x,(float)rand.NextDouble()*max_y,(float)rand.NextDouble()*max_z );
			return newVect; 
		}
		
		public static Vector3 CreateVector3(double chromosomeVal)
		{
			return CreateVector3(chromosomeVal, 1,1,1);
		}
		
		public static Vector3 CreateVector3(double chromosomeVal,float max_x,float max_y, float max_z)
		{
			Vector3 vect = new Vector3();
			float xval = (float)chromosomeVal * max_x;
			chromosomeVal = (chromosomeVal * 10000) % 500;
			float yval = (float)chromosomeVal * max_y;
			chromosomeVal = (chromosomeVal * 10000) % 500;
			float zval = (float)chromosomeVal * max_z;
			vect.Set (xval,yval,zval);
			return vect;
		}
	
	public static GameObject loadObject(String objType,Vector3 objpos,bool addscript)
{
	//Debug.Log("instantiating " + objType + "At position " + objpos);	
	GameObject obj = (GameObject)Instantiate (Resources.Load(objType),objpos,Quaternion.identity);
	//Debug.Log(obj);
	obj.transform.position = objpos;
	obj.AddComponent("collisionKiller");
	if(addscript) {
		Debug.Log("locating " + objType + " main script");	
		var scriptName = objType+"MainScript";
		Debug.Log("adding "+scriptName);	
		//Debug.Log("adding collision killer script component");	
		//obj.AddComponent("collisionKiller");
		var thisScript = obj.GetComponent(scriptName);	
		Debug.Log("passing in mainscript of ");
		//thisScript.intialize(this);
	}
	//Debug.Log("returning cart base of type:" + obj.GetType());
	return obj;
}
	}


