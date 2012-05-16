var xtformer:GameObject;
var ytformer:GameObject;
var ztformer:GameObject;
var xatformer:GameObject;
var yatformer:GameObject;
var zatformer:GameObject;
var xaatformer:GameObject;
var yaatformer:GameObject;
var zaatformer:GameObject;
var tformerObject:GameObject;
var tformertext:GameObject;
var handle:GameObject;
var transformType="move";
var sensitivity=1;
var translationX=0;
var translationY=0;
var translationZ=0;
var worldCamera:GameObject;
//worldCamera=GameObject.Find("worldCamera");
var plane:GameObject;
plane=GameObject.Find("plane");
tformerObject=gameObject;

var moover="off";
var currentChoice:GameObject;
var moochoice="";
var initialY=0;
var initialX=0;
var currPos:Vector3;
var currRot:Vector3;
var currScale:Vector3;
var snap=false;
var loaded=false;

xtformer=Instantiate(Resources.Load("cylinder"));
xtformer.AddComponent(CapsuleCollider);
xtformer.collider.isTrigger=true;
	
ytformer=Instantiate(Resources.Load("cylinder"));
ytformer.AddComponent(CapsuleCollider);
ytformer.collider.isTrigger=true;


ztformer=Instantiate(Resources.Load("cylinder"));
ztformer.AddComponent(CapsuleCollider);
ztformer.collider.isTrigger=true;

xtformer.name="xtformer";
ytformer.name="ytformer";
ztformer.name="ztformer";


xatformer=Instantiate(Resources.Load("cube"));
yatformer=Instantiate(Resources.Load("cube"));
zatformer=Instantiate(Resources.Load("cube"));
xatformer.name="xatformer";
yatformer.name="yatformer";
zatformer.name="zatformer";


xaatformer=Instantiate(Resources.Load("cone"));
yaatformer=Instantiate(Resources.Load("cone"));
zaatformer=Instantiate(Resources.Load("cone"));
xaatformer.name="xaatformer";
yaatformer.name="yaatformer";
zaatformer.name="zaatformer";


tformertext=new GameObject();
tformertext.AddComponent(TextMesh);
tformertext.name="tformertext";
hideHandles();

function activateHandles(){
	
}

function deleteHandles(){
    xtformer=Instantiate(Resources.Load("cylinder"));
    ytformer=Instantiate(Resources.Load("cylinder"));
    ztformer=Instantiate(Resources.Load("cylinder"));
    xtformer.name="xtformer";
    ytformer.name="ytformer";
    ztformer.name="ztformer";


    xatformer=Instantiate(Resources.Load("cube"));
    yatformer=Instantiate(Resources.Load("cube"));
    zatformer=Instantiate(Resources.Load("cube"));
    xatformer.name="xatformer";
    yatformer.name="yatformer";
    zatformer.name="zatformer";


    xaatformer=Instantiate(Resources.Load("cone"));
    yaatformer=Instantiate(Resources.Load("cone"));
    zaatformer=Instantiate(Resources.Load("cone"));
    xaatformer.name="xaatformer";
    yaatformer.name="yaatformer";
    zaatformer.name="zaatformer";


    tformertext=new GameObject();
    tformertext.AddComponent(TextMesh);
    tformertext.name="tformertext";
    loaded=false;
}
function snapit(value,increment){
    raw=value/increment;
    return Mathf.Round(raw)*increment;
}
Debug.Log("snapping"+snapit(31,15));

function setHandles(){
    Debug.Log("setting handles");
    xtformer.transform.localEulerAngles=Vector3(0,90,0);
    ytformer.transform.localEulerAngles=Vector3(270,0,0);
    ztformer.transform.localEulerAngles=Vector3(0,0,0);
    
    tformerObject.transform.eulerAngles=Vector3.zero;
    
    gomaxx=tformerObject.GetComponent(MeshFilter).sharedMesh.bounds.max.x;
    gominx=tformerObject.GetComponent(MeshFilter).sharedMesh.bounds.min.x;
    
    gomaxy=tformerObject.GetComponent(MeshFilter).sharedMesh.bounds.max.y;
    gominy=tformerObject.GetComponent(MeshFilter).sharedMesh.bounds.min.y;
    
    gomaxz=tformerObject.GetComponent(MeshFilter).sharedMesh.bounds.max.z;
    gominz=tformerObject.GetComponent(MeshFilter).sharedMesh.bounds.min.z;
    
    Debug.Log("gomaxy="+gomaxy);
    Debug.Log("gominy="+gominy);

    var scalex=(gomaxx-gominx)*tformerObject.transform.localScale.x*5;
    var scaley=(gomaxy-gominy)*tformerObject.transform.localScale.y*5;
    var scalez=(gomaxz-gominz)*tformerObject.transform.localScale.z*5;
    
    Debug.Log("scales: "+scalex+":"+scaley+":"+scalez);
    
    xtformer.transform.localScale.z=scalex;
    ytformer.transform.localScale.z=scaley;
    ztformer.transform.localScale.z=scalez;
    
    Debug.Log("local ztransformer scale"+ztformer.transform.localScale);
    
    xatformer.transform.localScale.x=1/scalex;
    yatformer.transform.localScale.y=1/scaley;
    zatformer.transform.localScale.z=1/scalez;
    
    xaatformer.transform.localScale.x=1/scalex;
    yaatformer.transform.localScale.y=1/scaley;
    zaatformer.transform.localScale.z=1/scalez;


    xatformer.transform.localPosition.x=1+2*(1/scalex);
    xaatformer.transform.localPosition.x=1+1/scalex;
    
    yatformer.transform.localPosition.y=1+2*(1/scaley);
    yaatformer.transform.localPosition.y=1+1/scaley;
    
    zatformer.transform.localPosition.z=1+2*(1/scalez);
    zaatformer.transform.localPosition.z=1+1/scalez;
    
    tformertext.transform.localPosition.y=1/scaley;

    Debug.Log("ztransformer euler angles"+ztformer.transform.eulerAngles);
}

function moveHandles(){
    //tformerObject.transform.position=Vector3.zero;
    //tformerObject.transform.eulerAngles=Vector3.zero;
    xtformer.transform.position=tformerObject.transform.position;
    xatformer.transform.position=tformerObject.transform.position;
    xaatformer.transform.position=tformerObject.transform.position;
    ytformer.transform.position=tformerObject.transform.position;
    yatformer.transform.position=tformerObject.transform.position;
    yaatformer.transform.position=tformerObject.transform.position;
    ztformer.transform.position=tformerObject.transform.position;
    zatformer.transform.position=tformerObject.transform.position;
    zaatformer.transform.position=tformerObject.transform.position;
    tformertext.transform.position=tformerObject.transform.position;
}

function hideHandles(){
    xtformer.active=false;	
    ytformer.active=false;
    ztformer.active=false;	

}

function showHandles(){
    xtformer.active=true;
    ytformer.active=true;	
    ztformer.active=true;
}

function Update(){
    if (Input.GetMouseButtonDown(0)) {
        Debug.Log("mouse was down");
        var ray: Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        var hit: RaycastHit;
	
        if (Physics.Raycast(ray, hit)) {
            currentChoice=hit.transform.gameObject;
            Debug.Log("you hit"+currentChoice.name);
            if ((currentChoice==xtformer)||(currentChoice==ytformer)||(currentChoice==ztformer)){
                handle=currentChoice;
                moover="on";
                transformType="move";
                //worldCamera.GetComponent("MainCameraControl").status="off";
            }
            else if ((currentChoice==xatformer)||(currentChoice==yatformer)||(currentChoice==zatformer)){
                handle=currentChoice;
                moover="on";
                transformType="rotate";
                //worldCamera.GetComponent("MainCameraControl").status="off";
            }
            else if ((currentChoice==xaatformer)||(currentChoice==yaatformer)||(currentChoice==zaatformer)){
                handle=currentChoice;
                moover="on";
                transformType="scale";
                //worldCamera.GetComponent("MainCameraControl").status="off";
            }
            else if (currentChoice==plane){
                Debug.Log("you hit the plane");
                Debug.Log("Hit nothing");
                moover="off";
                //worldCamera.GetComponent("MainCameraControl").status="on";
                hideHandles();
            }
            else{
                Debug.Log("you hit" + currentChoice.name);
                tformerObject=currentChoice;
                moochoice=currentChoice.name;
                if(currentChoice.rigidbody){
                    currentChoice.rigidbody.isKinematic=true;
                    moveHandles();
                    setHandles();
                    showHandles();
                    Debug.Log(ztformer.transform.rotation.eulerAngles);
                    //worldCamera.GetComponent("MainCameraControl").status="off";
                }
            }
        }
    }

    if (moover=="on"){
        Debug.Log("mooving");
		moveHandles();
        if( Input.GetKey( KeyCode.W ) )
            transformType = "rotate";
        if( Input.GetKey( KeyCode.E ) )
            transformType = "move";
        if( Input.GetKey( KeyCode.R ) )
            transformType = "scale";
		
				
        if(Input.GetMouseButtonDown(0)){	
            Debug.Log("resetting initialY");
            currPos=tformerObject.transform.position;
            currRot=tformerObject.transform.eulerAngles;
            currScale=tformerObject.transform.localScale;
            initialY=Input.mousePosition.y;
            initialX=Input.mousePosition.x;
            //Debug.Log("movetype="+transformType + " " + handle.name);
            ym=Input.mousePosition.y;
            xm=Input.mousePosition.x;
            sw=Screen.width/2;
            sh=Screen.height/2;
            mposx=xm-initialX;
            mposy=ym-initialY;   
            Debug.Log(initialY+" "+ym+" "+" "+sh+" "+" "+ mposy+" "+tformerObject.name+" "+currentChoice.name);

            if(transformType=="move"){
                Debug.Log("mooving");
                if (handle==xtformer){
                    translationX = mposx*.1;	
                    if(snap==true){
                        translationX=snapit(translationX,1);
                    }
                    tformertext.GetComponent(TextMesh).text="x="+translationX;		
                    tformerObject.transform.position=currPos+Vector3(translationX,0,0);
                }
                if (handle==ytformer){
                    translationY = mposy*.1;	
                    if(snap==true){
                        translationY=snapit(translationY,1);
                    }		
                    Debug.Log(tformertext);
                    Debug.Log(tformertext.GetComponent(TextMesh));
                    Debug.Log(tformertext.name);
                    Debug.Log(tformertext.GetComponent(TextMesh).text);
                    tformertext.GetComponent(TextMesh).text="y="+translationY;	
                    tformerObject.transform.position=currPos+Vector3(0,translationY,0);
                }
                if (handle==ztformer){
                    translationZ = mposy*.1;	
                    if(snap==true){
                        translationZ=snapit(translationZ,1);
                    }			
                    tformertext.GetComponent(TextMesh).text="z="+translationZ;
                    tformerObject.transform.position=currPos+Vector3(0,0,translationZ);
                }					
					
            }
				
            if(transformType=="rotate")
            {

                if (handle==xatformer){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationX = mposx*.2;	
                    if(snap==true){
                        translationX=snapit(translationX,15);
                    }		
                    tformertext.GetComponent(TextMesh).text="x="+translationX;
                    tformerObject.transform.eulerAngles=currRot+Vector3(translationX,0,0);
                }
                if (handle==yatformer){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationY = mposy*.2;
                    if(snap==true){
                        translationY=snapit(translationY,15);
                    }
                    tformertext.GetComponent(TextMesh).text="y="+translationY;					
                    tformerObject.transform.eulerAngles=currRot+Vector3(0,translationY,0);
                }
                if (handle==zatformer){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationZ = mposy*.2;
                    if(snap==true){
                        translationZ=snapit(translationZ,15);
                    }		
                    tformertext.GetComponent(TextMesh).text="z="+translationZ;	
                    tformerObject.transform.eulerAngles=currRot+Vector3(0,0,translationZ);
                }		
					
                Debug.Log("rotation="+tformerObject.transform.eulerAngles);
            }
				
            if(transformType=="scale")
            {
                if (handle==xaatformer){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationX = mposx*.1;
                    if(snap==true){
                        translationX=snapit(translationX,.5);
                    }	
                    tformertext.GetComponent(TextMesh).text="x="+translationX;		
                    tformerObject.transform.localScale=currScale+Vector3(translationX,0,0);
                }
                if (handle==yaatformer){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationY = mposy*.1;
                    if(snap==true){
                        translationY=snapit(translationY,.5);
                    }			
                    tformertext.GetComponent(TextMesh).text="y="+translationX;		
                    tformerObject.transform.localScale=currScale+Vector3(0,translationY,0);
                }
                if (handle==zaatformer){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationZ = mposy*.1;
                    if(snap==true){
                        translationZ=snapit(translationZ,.5);
                    }
                    tformertext.GetComponent(TextMesh).text="z="+translationZ;		
                    tformerObject.transform.localScale=currScale+Vector3(0,0,translationZ);
                }				
            }
        }
    }
}
var initialized = 1;