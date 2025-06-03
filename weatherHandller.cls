public with sharing class weatherHandller {
    
    @AuraEnabled(cacheable=true)
    public static String getWeatherData(String city){

        String apiKey = '2777ac631e0ff25e61d42d6c905952b5';
        String endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric';

        HTTP http = new HTTP();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('GET');

        HttpResponse res = http.send(req);

        if(res.getStatusCode() == 200){
            system.debug('Your status code is ----> '+ res.getStatusCode());
            return res.getBody();
        }
        else {
            throw new AuraHandledException('Failed to fetch weather data! please enter correct city name.');
        }
    }  
}