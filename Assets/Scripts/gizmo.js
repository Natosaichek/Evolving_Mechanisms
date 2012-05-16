var xgizmo:GameObject;
var ygizmo:GameObject;
var zgizmo:GameObject;
var xagizmo:GameObject;
var yagizmo:GameObject;
var zagizmo:GameObject;
var xaagizmo:GameObject;
var yaagizmo:GameObject;
var zaagizmo:GameObject;
var gizmoObject:GameObject;
var gizmotext:GameObject;
var handle:GameObject;
var transformType="move";
var sensitivity=1;
var translationX=0;
var translationY=0;
var translationZ=0;
var worldCamera:GameObject;
worldCamera=GameObject.Find("WorldCamera");
var plane:GameObject;
plane=GameObject.Find("plane");
gizmoObject=gameObject;

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

xgizmo=Instantiate(Resources.Load("cylinder"));
xgizmo.AddComponent(CapsuleCollider);
xgizmo.collider.isTrigger=true;
	
ygizmo=Instantiate(Resources.Load("cylinder"));
ygizmo.AddComponent(CapsuleCollider);
ygizmo.collider.isTrigger=true;


zgizmo=Instantiate(Resources.Load("cylinder"));
zgizmo.AddComponent(CapsuleCollider);
zgizmo.collider.isTrigger=true;

xgizmo.name="xgizmo";
ygizmo.name="ygizmo";
zgizmo.name="zgizmo";


xagizmo=Instantiate(Resources.Load("cube"));
yagizmo=Instantiate(Resources.Load("cube"));
zagizmo=Instantiate(Resources.Load("cube"));
xagizmo.name="xagizmo";
yagizmo.name="yagizmo";
zagizmo.name="zagizmo";


xaagizmo=Instantiate(Resources.Load("cone"));
yaagizmo=Instantiate(Resources.Load("cone"));
zaagizmo=Instantiate(Resources.Load("cone"));
xaagizmo.name="xaagizmo";
yaagizmo.name="yaagizmo";
zaagizmo.name="zaagizmo";


gizmotext=new GameObject();
gizmotext.AddComponent(TextMesh);
gizmotext.name="gizmotext";

function activateHandles(){
	
}

function deleteHandles(){
    xgizmo=Instantiate(Resources.Load("cylinder"));
    ygizmo=Instantiate(Resources.Load("cylinder"));
    zgizmo=Instantiate(Resources.Load("cylinder"));
    xgizmo.name="xgizmo";
    ygizmo.name="ygizmo";
    zgizmo.name="zgizmo";


    xagizmo=Instantiate(Resources.Load("cube"));
    yagizmo=Instantiate(Resources.Load("cube"));
    zagizmo=Instantiate(Resources.Load("cube"));
    xagizmo.name="xagizmo";
    yagizmo.name="yagizmo";
    zagizmo.name="zagizmo";


    xaagizmo=Instantiate(Resources.Load("cone"));
    yaagizmo=Instantiate(Resources.Load("cone"));
    zaagizmo=Instantiate(Resources.Load("cone"));
    xaagizmo.name="xaagizmo";
    yaagizmo.name="yaagizmo";
    zaagizmo.name="zaagizmo";


    gizmotext=new GameObject();
    gizmotext.AddComponent(TextMesh);
    gizmotext.name="gizmotext";
    loaded=false;
}
function snapit(value,increment){
    raw=value/increment;
    return Mathf.Round(raw)*increment;
}
Debug.Log("snapping"+snapit(31,15));
function setHandles(){
    Debug.Log("setting handles");
    xgizmo.transform.localEulerAngles=Vector3(0,90,0);
    ygizmo.transform.localEulerAngles=Vector3(270,0,0);
    zgizmo.transform.localEulerAngles=Vector3(0,0,0);
    gizmoObject.transform.eulerAngles=Vector3.zero;
    gomaxx=gizmoObject.GetComponent(MeshFilter).sharedMesh.bounds.max.x;
    gominx=gizmoObject.GetComponent(MeshFilter).sharedMesh.bounds.min.x;
    gomaxy=gizmoObject.GetComponent(MeshFilter).sharedMesh.bounds.max.y;
    gominy=gizmoObject.GetComponent(MeshFilter).sharedMesh.bounds.min.y;
    gomaxz=gizmoObject.GetComponent(MeshFilter).sharedMesh.bounds.max.z;
    gominz=gizmoObject.GetComponent(MeshFilter).sharedMesh.bounds.min.z;
    Debug.Log("gomaxy="+gomaxy);
    Debug.Log("gominy="+gominy);

    var scalegizmox=(gomaxx-gominx)*gizmoObject.transform.localScale.x*5;
    var scalegizmoy=(gomaxy-gominy)*gizmoObject.transform.localScale.y*5;
    var scalegizmoz=(gomaxz-gominz)*gizmoObject.transform.localScale.z*5;
    Debug.Log(scalegizmox+":"+scalegizmoy+":"+scalegizmoz);
    xgizmo.transform.localScale.z=scalegizmox;
    ygizmo.transform.localScale.z=scalegizmoy;
    zgizmo.transform.localScale.z=scalegizmoz;
    Debug.Log(zgizmo.transform.localScale);
    xagizmo.transform.localScale.x=1/scalegizmox;
    yagizmo.transform.localScale.y=1/scalegizmoy;
    zagizmo.transform.localScale.z=1/scalegizmoz;
    xaagizmo.transform.localScale.x=1/scalegizmox;
    yaagizmo.transform.localScale.y=1/scalegizmoy;
    zaagizmo.transform.localScale.z=1/scalegizmoz;


    xagizmo.transform.localPosition.y=1+2*(1/scalegizmoy);
    xaagizmo.transform.localPosition.y=1+1/scalegizmoy;
    yagizmo.transform.localPosition.y=1+2*(1/scalegizmoy);
    yaagizmo.transform.localPosition.y=1+1/scalegizmoy;
    zagizmo.transform.localPosition.y=1+2*(1/scalegizmoy);
    zaagizmo.transform.localPosition.y=1+1/scalegizmoy;
    gizmotext.transform.localPosition.y=1/scalegizmoy;
    Debug.Log(zgizmo.transform.eulerAngles);
}

function moveHandles(){
    //gizmoObject.transform.position=Vector3.zero;
    //gizmoObject.transform.eulerAngles=Vector3.zero;
    xgizmo.transform.position=gizmoObject.transform.position;
    ygizmo.transform.position=gizmoObject.transform.position;
    zgizmo.transform.position=gizmoObject.transform.position;
    gizmotext.transform.position=gizmoObject.transform.position;
}
function hideHandles(){
    xgizmo.active=false;	
    ygizmo.active=false;
    zgizmo.active=false;	

}

function showHandles(){
    xgizmo.active=true;
    ygizmo.active=true;	
    zgizmo.active=true;
}

function Update(){
    if (Input.GetMouseButtonDown(0)) {
        Debug.Log("mouse was down");
        var ray: Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        var hit: RaycastHit;
	
        if (Physics.Raycast(ray, hit)) {
            currentChoice=hit.transform.gameObject;
            Debug.Log("you hit"+currentChoice.name);
            if ((currentChoice==xgizmo)||(currentChoice==ygizmo)||(currentChoice==zgizmo)){
                handle=currentChoice;
                moover="on";
                transformType="move";
                worldCamera.GetComponent("MainCameraControl").status="off";
            }
            else if ((currentChoice==xagizmo)||(currentChoice==yagizmo)||(currentChoice==zagizmo)){
                handle=currentChoice;
                moover="on";
                transformType="rotate";
                worldCamera.GetComponent("MainCameraControl").status="off";
            }
            else if ((currentChoice==xaagizmo)||(currentChoice==yaagizmo)||(currentChoice==zaagizmo)){
                handle=currentChoice;
                moover="on";
                transformType="scale";
                worldCamera.GetComponent("MainCameraControl").status="off";
            }
            else if (currentChoice==plane){
                Debug.Log("you hit the plane");
                Debug.Log("Hit nothing");
                moover="off";
                worldCamera.GetComponent("MainCameraControl").status="on";
                hideHandles();
            }
            else{
                Debug.Log("you hit" + currentChoice.name);
                gizmoObject=currentChoice;
                moochoice=currentChoice.name;
                if(currentChoice.rigidbody){
                    currentChoice.rigidbody.isKinematic=true;
                    showHandles();
                    setHandles();
                    moveHandles();
                    Debug.Log(zgizmo.transform.rotation.eulerAngles);
                    worldCamera.GetComponent("MainCameraControl").status="off";
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
            currPos=gizmoObject.transform.position;
            currRot=gizmoObject.transform.eulerAngles;
            currScale=gizmoObject.transform.localScale;
            initialX=Input.mousePosition.x;
            initialY=Input.mousePosition.y;
            //Debug.Log("movetype="+transformType + " " + handle.name);
            ym=Input.mousePosition.y;
            xm=Input.mousePosition.x;
            sw=Screen.width/2;
            sh=Screen.height/2;
            mposx=xm-initialX;
            mposy=ym-initialY;   
            Debug.Log(initialY+" "+ym+" "+" "+sh+" "+" "+ mposy+" "+gizmoObject.name+" "+currentChoice.name);

            if(transformType=="move"){
                Debug.Log("mooving");
                if (handle==xgizmo){
                    translationX = mposx*.1;	
                    if(snap==true){
                        translationX=snapit(translationX,1);
                    }
                    gizmotext.GetComponent(TextMesh).text="x="+translationX;		
                    gizmoObject.transform.position=currPos+Vector3(translationX,0,0);
                }
                if (handle==ygizmo){
                    translationY = mposy*.1;	
                    if(snap==true){
                        translationY=snapit(translationY,1);
                    }		
                    Debug.Log(gizmotext);
                    Debug.Log(gizmotext.GetComponent(TextMesh));
                    Debug.Log(gizmotext.name);
                    Debug.Log(gizmotext.GetComponent(TextMesh).text);
                    gizmotext.GetComponent(TextMesh).text="y="+translationY;	
                    gizmoObject.transform.position=currPos+Vector3(0,translationY,0);
                }
                if (handle==zgizmo){
                    translationZ = mposy*.1;	
                    if(snap==true){
                        translationZ=snapit(translationZ,1);
                    }			
                    gizmotext.GetComponent(TextMesh).text="z="+translationZ;
                    gizmoObject.transform.position=currPos+Vector3(0,0,translationZ);
                }					
					
            }
				
            if(transformType=="rotate")
            {

                if (handle==xagizmo){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationX = mposx*.2;	
                    if(snap==true){
                        translationX=snapit(translationX,15);
                    }		
                    gizmotext.GetComponent(TextMesh).text="x="+translationX;
                    gizmoObject.transform.eulerAngles=currRot+Vector3(translationX,0,0);
                }
                if (handle==yagizmo){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationY = mposy*.2;
                    if(snap==true){
                        translationY=snapit(translationY,15);
                    }
                    gizmotext.GetComponent(TextMesh).text="y="+translationY;					
                    gizmoObject.transform.eulerAngles=currRot+Vector3(0,translationY,0);
                }
                if (handle==zagizmo){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationZ = mposy*.2;
                    if(snap==true){
                        translationZ=snapit(translationZ,15);
                    }		
                    gizmotext.GetComponent(TextMesh).text="z="+translationZ;	
                    gizmoObject.transform.eulerAngles=currRot+Vector3(0,0,translationZ);
                }		
					
                Debug.Log("rotation="+gizmoObject.transform.eulerAngles);
            }
				
            if(transformType=="scale")
            {
                if (handle==xaagizmo){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationX = mposx*.1;
                    if(snap==true){
                        translationX=snapit(translationX,.5);
                    }	
                    gizmotext.GetComponent(TextMesh).text="x="+translationX;		
                    gizmoObject.transform.localScale=currScale+Vector3(translationX,0,0);
                }
                if (handle==yaagizmo){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationY = mposy*.1;
                    if(snap==true){
                        translationY=snapit(translationY,.5);
                    }			
                    gizmotext.GetComponent(TextMesh).text="y="+translationX;		
                    gizmoObject.transform.localScale=currScale+Vector3(0,translationY,0);
                }
                if (handle==zaagizmo){
                    mposx=xm-initialX;
                    mposy=ym-initialY;                             ;
                    translationZ = mposy*.1;
                    if(snap==true){
                        translationZ=snapit(translationZ,.5);
                    }
                    gizmotext.GetComponent(TextMesh).text="z="+translationZ;		
                    gizmoObject.transform.localScale=currScale+Vector3(0,0,translationZ);
                }		
					
					
            }
		
	
        }
    }

}