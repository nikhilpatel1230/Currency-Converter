import { LightningElement,track,api } from 'lwc';
import getWeatherData from '@salesforce/apex/weatherHandller.getWeatherData';
export default class RealTimeWeather extends LightningElement {

    @track weather;
    @track city;
    @track error;
    
    handleCityChange(event){
        this.city = event.target.value;
        this.fetchWeatherData();
    }

    fetchWeatherData(){
        getWeatherData({city : this.city})
        .then(result=>{
            const data = JSON.parse(result);
            this.weather={
                 temp: data.main.temp,
                    desc: data.weather[0].description,
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            };
            this.error = undefined;
        })
        .catch(error=>{
            this.weather = undefined;
            this.error = error.body.message;
        })
    }
}