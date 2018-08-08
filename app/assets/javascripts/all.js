	var __markers = [];
var __infoWindows = [];
var __map = null;
var __chart = null;
var __chart2 = null;
var __timeCounter = 60;

function getIcon(aqi,hidden){
	var icon_grey = '/images/place_grey.png';
	var icon_green = '/images/place_green.png';
	var icon_yellow = '/images/place_yellow.png';
	var icon_orange = '/images/place_orange.png';
	var icon_red = '/images/place_red.png';
	var icon_brown = '/images/place_brown.png';

	var icon_tech = '/images/place_tech.png';

	if(hidden == 1){
		return icon_tech;
	}

	if(aqi > 300)
		return icon_brown;
	if(aqi > 200)
		return icon_red;
	if(aqi > 100)
		return icon_orange;
	if(aqi > 50)
		return icon_yellow;
	if(aqi >= 0)
		return icon_green;
	return icon_grey;
};
	
	function initMap(zoom,lat,long) {
	__map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: {lat: lat, lng: long},
		zoom: zoom,
	});

	$.ajax({
		url : '/api/sites',
		success: function(response){
			$.each(response, function(i) {
				var infowindow = new google.maps.InfoWindow({
					content: response[i].info
				});
				__infoWindows.push(infowindow);
				var position = new google.maps.LatLng(parseFloat(response[i].latitude),parseFloat(response[i].longtitude));
				
				var marker = new google.maps.Marker({
								position: position,
								map: __map,
								icon:{
									size: new google.maps.Size(44, 46),
									// url : getIcon(response[i].aqi,response[i].hidden),
									origin: new google.maps.Point(0, -6),
								},
								title: response[i].name,
								id: response[i].id,
								hidden:response[i].hidden,
								label: {
									text: " ",
									fontWeight: 'bolder',
									color: '#222',
								}
						});
				if(marker.hidden == 0){
					marker.setLabel(""+response[i].aqi);
				}
				__markers.push(marker);
				google.maps.event.addListener(marker, 'click', function () {
					//alert('Hello')
					closeAllInfoWindows();
					infowindow.open(__map, marker);
					//window.location.href = '/public/?site_id='+marker.id
				});

			});
		}
	})
};

	var site_id = 14;
	function loadHourlyAQI(indicator){
		$.ajax({
			url:'/api/daily_aqis/?indicator=' + indicator + '&site_id='+site_id,
			success:function(response){
				if(response.length == 0){
					$("#indicatorAqi" + indicator).hide();
					return;
				}
				__chart2 = AmCharts.makeChart("indicatorAqi" + indicator, {
					"type": "serial",
					"categoryField": "time",
					"dataDateFormat": "YYYY-MM-DD",
					"startDuration": 1,
					"categoryAxis": {
						"gridPosition": "start",
						"minPeriod" : "DD",
						"parseDates": true,
					},
					"chartCursor": {
						"enabled": true
					},
					"chartScrollbar": {
						"enabled": false
					},
					"trendLines": [],
					"graphs": [
						{
							"fillColorsField": "color",
							"fillAlphas": 1,
							"type": "column",
							"valueField": "value",
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"title": `${indicator} AQI`,
							"labelFrequency": indicator == "SO2" ? 2 : 1
						}
					],
					"allLabels": [],
					"balloon": {},
					/*"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": "Chỉ số "+indicator
						}
					],*/
					
					"dataProvider": response
				});

				//__chart2.addListener("rendered", zoomIndicatorChart);

				//zoomIndicatorChart();
			}
		})
	}
	$(function(){
		var indicators = ['NO2','SO2','CO','PM2.5','PM10','O3'];

		$(indicators).each(function(i,val){
			loadHourlyAQI(val);
		})
		var lat = 21.02;
		var long = 105.8;
		initMap(12,lat,long);

// 		updateAQIColor();
	})
	