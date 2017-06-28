$(function() {
    console.log("Test");

    var client = ZAFClient.init();

    // this is for testing purposes only
    var accuDevURL = "http://apidev.accuweather.com";
    var accuDevApiKey = "hoArfRosT1215";

    // initializaition
    client.invoke('resize', {
        width: '100%',
        height: '210px'
    });

    // get first the ticket id
    client.get('ticket.id').then(function(data) {
        getTicketAudit(data['ticket.id'])
    });
    
    // get the ticket log
    function getTicketAudit(ticketId) {
        var fetchTicketLog = {
            url: '/api/v2/tickets/' + ticketId + '/audits.json',
            type: 'GET',
            dataType: 'json'
        };
        // fetch the audit and get the latest element
        client.request(fetchTicketLog).then(function(data) {
            console.log(data);
            var lastElement = data['audits'][data['count']-1];
            // check if we have meta data
            if (lastElement.metadata.system) {
                // since some of the return has comma separated we just need to get the city
                var location = lastElement.metadata.system.location.split(",");
                getAccuLocation(location[0]);
            } else {
                console.log(metdata);
            }

        });
    }
    
    // get the location details
    function getAccuLocation(location) {
        var fetchLocation = {
            url: '' + accuDevURL + '/locations/v1/search?q=' + location + '&apikey=' + accuDevApiKey + '',
            type: 'GET',
            dataType: 'json'
        };
        // get request over here
        client.request(fetchLocation).then(function(data) {
            // do we have the data
            if (data.length !== 0) {
                getAccuCondition(data[0]['Key'],location);
            } else {
                console.log("empty");
            }
        });
    }

    // get the condition
    function getAccuCondition(key,location) {
        var fetchWeather = {
            url: '' + accuDevURL + '/currentconditions/v1/' + key + '.json?language=en&apikey='+ accuDevApiKey + '',
            type: 'GET',
            dataType: 'json'
        };
        // get request over here
        client.request(fetchWeather).then(function(data) {

            var date = new Date(data[0]['LocalObservationDateTime']);
            var weatherDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
            // set the data    
            var accuData = {
                date: weatherDate,
                location: location,
                cel: data[0]['Temperature']['Imperial']['Value'],
                deg: data[0]['Temperature']['Metric']['Value'],
                weather: data[0]['WeatherText'],
                iconUrl: 'http://apidev.accuweather.com/developers/Media/Default/WeatherIcons/' + data[0]['WeatherIcon'] + '-s.png',
                webUrl: data[0]['Link']
            }
            // render the custom ticket field
            var source = $("#accu-template").html();
            var template = Handlebars.compile(source);
            var html = template(accuData);
            $("#accuview").html(html);
        });
    }
});

