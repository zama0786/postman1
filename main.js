function getElementFromString(string){
    const div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild
}


let addParamCount = 0
//Hide the parameter box initially
let parameterBox = document.getElementById("parameterBox");
//parameterBox.style.display == "none"
let paramsRadio=document.getElementById("paramsradio")
paramsRadio.addEventListener("click",()=>{
    document.getElementById("requestJsonBox").style.display = "none"
    document.getElementById("parameterBox").style.display = "block"
    document.getElementById("params").style.display="block";

})
let jsonRadio = document.getElementById("jsonradio")
jsonRadio.addEventListener("click",()=>{
    document.getElementById("requestJsonBox").style.display = "block"
    document.getElementById("parameterBox").style.display = "none"
    document.getElementById("params").style.display="none";
 
})
// if the user click on the add parameter btn
let addParam = document.getElementById("addParam")
addParam.addEventListener("click",()=>{
    let params = document.getElementById("params")
    let string = `<div id="parameterBox">
    <div class="form-row my-2">
      <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamCount+2}</label>
      <div class="col-md-4">
        <input type="text" class="form-control" id="parameterkey${addParamCount+2}" placeholder="Enter Parameter ${addParamCount+2} Key">
      </div>
      <div class="col-md-4">
        <input type="text" class="form-control" id="parametervalue${addParamCount+2}" placeholder="Enter Parameter ${addParamCount+2} Value">
      </div>
      <button type="button" id="addParam" class="btn btn-primary deleteParam">-</button>
    </div>
  </div>`

  addParamCount++;

  //console.log("before",typeof string)
  let childElement = getElementFromString(string)
  //console.log("after",typeof childElement)
  params.appendChild(childElement);
  let deleteParam = document.getElementsByClassName("deleteParam")
  for(item of deleteParam){
      item.addEventListener("click",(e) =>{
          e.target.parentElement.remove()

        })
    }
  })

//submit Handler
document.getElementById("submit").addEventListener("click",()=>{
  const url = document.getElementById("urlField").value;
  const requestType = document.querySelector("input[name='requestType']:checked").value;
  const contentType = document.querySelector("input[name='contentType']:checked").value;
  //console.log(url,requestType,contentType)
  let data ={}
  if(contentType == 'params'){
    
         for(let i=1;i<=addParamCount+1; i++){
        let key = document.getElementById(`parameterkey${i}`).value;
        let value = document.getElementById(`parametervalue${i}`).value;
        data[key]= value;
        }
        
        data = JSON.stringify(data)
  }else{
    data = document.getElementById("requestJsonText").value
    //console.log(data)

  }
  if(requestType == "GET"){
    fetch(url,{
      method:"GET"
    })
    .then(data => data.text())
    .then(res => {
      document.getElementById("responseJsonText").value = res
      //console.log(data)
    })
  }
  if(requestType==="POST"){
    fetch(url,{
      method:"POST",
      body:data,
      headers:{
        "Content type":"application/json; charset=UTF-8"
      }
    })
    .then(res => res.text())
    .then(res =>{
      document.getElementById("responseJsonText").value = res
    
    })
  }
})
