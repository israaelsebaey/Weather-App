// select elements
const cityNameInpt=document.getElementById('cityNameInpt');
const searchBtn=document.getElementById('searchBtn');
const deg=document.getElementById('deg');
const desc=document.getElementById('desc');
const loc=document.getElementById('location');
const humi=document.getElementById('humidity');
const speed=document.getElementById('speed');
const img=document.getElementById('img');
/////////////////////////////////////////// 
const card=document.getElementById('card');
const weatherTemp=document.getElementById('weatherTemp');
const weatherDetails=document.getElementById('weatherDetails');
const errorBox=document.getElementById('error');
/////////////////////////////////////////// 
function display(box){
    box.style.display='flex'; 
}
function hide(box){
    box.style.display='none';
}
const serach=()=>{
    const cityNameValue=cityNameInpt.value;
   const apiKey='53a136a3a44aecc85bec1c8c5af9ec92';
   const apiCall=`https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&units=metric&appid=${apiKey}`;
    //reset
    hide(weatherTemp);
    hide(weatherDetails);
    hide(errorBox);
   //if input value is empty
   if(cityNameValue===''){
    card.style.height='125px';
    card.style.marginTop='200px';
    document.body.style.backgroundImage="url('../images/78.gif')";
    return;
   }    
   fetch(apiCall)
   .then(response=>response.json())
   .then(data=>{
    // if error
    if(data.cod==='404'){
        display(errorBox);
        errorBox.classList.add('grow-in')
        card.style.height='420px';
        card.style.marginTop='150px';
        document.body.style.backgroundImage="url('../images/73.gif')";
        return;
    }
    // if success
    display(weatherTemp);
    display(weatherDetails);
    card.style.height='550px';
    card.style.marginTop='90px';
    //  display details for temp
     const city=data.name;
     const country=data.sys.country;
     const {description,id}=data.weather[0];
     const {temp,humidity}=data.main;
     const windSpeed=data.wind.speed;
     deg.innerText=Math.round(temp);
     desc.innerText=description;
     loc.innerText=`${city}, ${country}`;
     humi.innerText=humidity+'%';
     speed.innerText=windSpeed+' Km/h';

    //  display img and check on id
    if(id>=200 && id<=232){
        img.src='./images/storm.svg';
        document.body.style.backgroundImage="url('../images/28.jpg')";
    }
    else if((id>=300 && id<=321)||(id>=500 && id<=531)){
        img.src='./images/rain.svg';
        document.body.style.backgroundImage="url('../images/21.jpg')";
    }
    else if(id>=600 && id<=622){
        img.src='./images/snow.svg';
        document.body.style.backgroundImage="url('../images/25.jpg')";

    }
    else if(id>=701 && id<=781){
        img.src='./images/haze.svg';
        document.body.style.backgroundImage="url('../images/56.jpg')";
    }
    else if(id===800){
        img.src='./images/clear.svg';
        document.body.style.backgroundImage="url('../images/62.jpg')";
    }
    else if(id>=801 && id<=804){
        img.src='./images/cloud.svg';
        document.body.style.backgroundImage="url('../images/33.jfif')";
    }
   })
}
searchBtn.addEventListener('click',serach);
cityNameInpt.addEventListener('keydown',function(e){
   if(e.key==='Enter'){
      serach();
   }
})