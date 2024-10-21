

var City;
var days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
var data;
let date = new Date();
var sunsetime;



setInterval(function (){
    date = new Date();
    document.querySelector('.currenthour').innerHTML = date.getHours()+":"+date.getMinutes();

    if(date.getMinutes()<10){
        document.querySelector('.currenthour').innerHTML = date.getHours()+":0"+date.getMinutes();
    }
},1000);

function geolocation(callafter){
   
    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(
          (position) => {
             lat = position.coords.latitude;
             lng = position.coords.longitude;
    
            console.log(`Latitude: ${lat}, longitude: ${lng}`);
            callafter();
           
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } 
    
      
    }
function getcityname(callback){
    
    var xhr = new XMLHttpRequest();

        xhr.open('GET','https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lng+'&format=json');  
        xhr.onload = function(){
            var data = JSON.parse(xhr.response);
            City = data.address.city;
            callback();
 
        }
        alert("2");
        xhr.send();
        
        
}
function getdata(){
    
        var xhr = new XMLHttpRequest();

        xhr.open('GET','http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lng+'&id=524901&appid=e338eb8c2cb073b5d9e5e28ad7388b6f');
        console.log('http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lng+'&id=524901&appid=e338eb8c2cb073b5d9e5e28ad7388b6f');
        
        xhr.onload = function(){
            data = JSON.parse(xhr.response);
        }
        xhr.send();  
        
        
    }

    function hourly(data) {
        
        let currentHour = date.getHours();
        console.log("the hour is " + currentHour);
        
        for (let i = 0; i < 12; i++) {
            let temp = data.list[i].main.temp - 273;
            let icon = data.list[i].weather[0].icon;
            console.log(icon);
            
            let hourElement = document.getElementById(i);
            let hourContent = "<p>" + data.list[i].dt_txt.slice(11, 13) + ":00</p>" +
                              geticons(icon) +
                              "<p>" + parseInt(temp) + "°</p>";
            
            currentHour++;
            if (currentHour == 24) {
                currentHour = 0;
            }
            
            hourElement.innerHTML = hourContent;
        }
    }
    

function weekly(data){
    let j = 0;
    //icons 
    let icon ;
    

    //Curent state code ; "general"
    document.getElementById('state').innerHTML = data.list[0].weather[0].description;
    //descripton weekly

    document.getElementById('enteteweek').innerHTML = "Today's weather is feeling reminiscent of  "+data.list[0].weather[0].description;

    document.getElementById('degre').innerHTML = parseInt(data.list[0].main.temp)-273+"°";
    

    //weekly code ;
    for(let i=0;i<12;i++){
        
         icon = data.list[j].weather[0].icon;
        console.log(icon);

        

        let week = document.getElementById('day'+(i+1));
        let weekContent = document.getElementById('day'+(i+1)).innerHTML;
        
        
        if(i==0){
            weekContent += "<p>Today</p><p class='tempmin'>"+parseInt(data.list[j].main.temp_min-273)+"</p>"+geticons(icon)+"<p class='tempmin'>"+parseInt(data.list[j].main.temp_max-273)+"</p>";

        }else{
            
            if(date.getDay()-1+i<7){
             weekContent += "<p>"+days[date.getDay()-1+i]+"</p><p class='tempmin'>"+parseInt(data.list[j].main.temp_min-273)+"</p>"+geticons(icon)+"<p class='tempmin'>"+parseInt(data.list[j].main.temp_max-273)+"</p>";
        
            }else{
        
                weekContent += "<p>"+days[ (date.getDay()-1+i)-7]+"</p><p class='tempmin'>"+parseInt(data.list[j].main.temp_min-273)+"</p>"+geticons(icon)+"<p class='tempmin'>"+parseInt(data.list[j].main.temp_max-273)+"</p>";
        
            }
    }
        

        week.innerHTML = weekContent;
        console.log(data.list[j].dt_txt);
        //to get the data of each day in the same hour as now 
        j=j+8;

    }
}

    geolocation(()=>{
    
            getdata(hourly,weekly);
            sun(lat,lng);

    });

function sun(lat,lng){
    var xhr = new XMLHttpRequest();

    xhr.open('GET','http://api.aladhan.com/v1/calendar?latitude='+lat+'&longitude='+lng);  
    console.log('http://api.aladhan.com/v1/calendar?latitude='+lat+'&longitude='+lng);
    xhr.onload = function(){
        var data = JSON.parse(xhr.response);
        document.getElementById('rise').innerHTML = data.data[0].timings.Fajr.slice(0, -6);
        document.getElementById('set').innerHTML = data.data[0].timings.Maghrib.slice(0, -6);
        sunsetime = data.data[0].timings.Maghrib.slice(0, -9);
        

        //background images ;
        if(date.getHours()>parseInt(sunsetime)+1){
            document.getElementById('container').style.backgroundImage = "url('/Images/starry-night-sky.jpg')";
        }
        if(date.getHours()<parseInt(sunsetime)+1){
            document.getElementById('container').style.backgroundImage = "url('/Images/sunsetimg.jpg')";
        }
        if(date.getHours()<parseInt(sunsetime)){
            document.getElementById('container').style.backgroundImage = "url('/Images/clouds.jpg')";
        }
    }
    xhr.send();
}
function geticons(icons){
    
    switch (icons){

        case '01d':
            return '<img class="icons" src="Images/states/01d.png" alt="">';
        case '02d':
            return '<img class="icons" src="Images/states/02d.png" alt="">';
        case '03d':
            return '<img class="icons" src="Images/states/03d.png" alt="">';
        case '04d':
            return '<img class="icons" src="Images/states/04d.png" alt="">';
        case '09d':
            return '<img class="icons" src="Images/states/09d.png" alt="">';
        case '10d':
            return '<img class="icons" src="Images/states/10d.png" alt="">'; 
        case '11d':
            return '<img class="icons" src="Images/states/11d.png" alt="">';
        case '13d':
            return '<img class="icons" src="Images/states/13d.png" alt="">';                  
            case '01n':
                return '<img class="icons" src="Images/states/01d.png" alt="">';
            case '02n':
                return '<img class="icons" src="Images/states/02d.png" alt="">';
            case '03n':
                return '<img class="icons" src="Images/states/03d.png" alt="">';
            case '04n':
                return '<img class="icons" src="Images/states/04d.png" alt="">';
            case '09n':
                return '<img class="icons" src="Images/states/09d.png" alt="">';
            case '10n':
                return '<img class="icons" src="Images/states/10d.png" alt="">';  
            case '11n':
                return '<img class="icons" src="Images/states/11d.png" alt="">';
            case '13n':
                return '<img class="icons" src="Images/states/13d.png" alt="">';                 
                   
        default:
            return ''; 
    }
}



  