//balanceSCript
var limitx=60;
var limity=60;
var limitz=60;
function Update(){
xi=transform.eulerAngles.x;
yi=transform.eulerAngles.y;
zi=transform.eulerAngles.z;
Lerp1=Vector3.zero;
Lerp2=Vector3.zero;
if((gameObject.transform.eulerAngles.x>limitx)||(gameObject.transform.eulerAngles.x<limitx*-1)){
lerpx=Mathf.LerpAngle(xi,0,Time.deltaTime);
}

if((gameObject.transform.eulerAngles.z>limitz)||(gameObject.transform.eulerAngles.z<limitz*-1)){
lerpz=Mathf.LerpAngle(zi,0,Time.deltaTime);
}
transform.eulerAngles=Vector3(lerpx,yi,lerpz);
//Debug.Log(lerpz);
}