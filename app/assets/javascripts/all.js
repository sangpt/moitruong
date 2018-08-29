	var __markers = [];
var __infoWindows = [];
var __map = null;
var __chart = null;
var __chart2 = null;
var __timeCounter = 60;

function getIcon(aqi,hidden){
	var icon_grey = 'http://moitruongthudo.vn/images/place_grey.png';
	var icon_green = 'http://moitruongthudo.vn/images/place_green.png';
	var icon_yellow = 'http://moitruongthudo.vn/images/place_yellow.png';
	var icon_orange = 'http://moitruongthudo.vn/images/place_orange.png';
	var icon_red = 'http://moitruongthudo.vn/images/place_red.png';
	var icon_brown = 'http://moitruongthudo.vn/images/place_brown.png';

	var icon_tech = 'http://moitruongthudo.vn/images/place_tech.png';

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
									url : getIcon(response[i].aqi,response[i].hidden),
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

	// var site_id = 14;
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

	function loadHourlyStat(indicator){
			$.ajax({
				url:'/api/daily_stats/?indicator=' + indicator + '&site_id='+site_id,
				success:function(response){
					if(response.length == 0){
						$("#indicatorStat" + indicator).hide();
						return;
					}
					__chart2 = AmCharts.makeChart("indicatorStat" + indicator, {
						"type": "serial",
						"categoryField": "time",
						"dataDateFormat": "YYYY-MM-DD HH",
						"startDuration": 1,
						"categoryAxis": {
							"labelRotation": 15,
							//"minPeriod" : "HH",
						},
						"chartCursor": {
							"enabled": true
						},
						"chartScrollbar": {
							"enabled": true
						},
						"trendLines": [],
						"graphs": [
							{
					        "id": "g" + indicator,
					        "balloon":{
					          "drop":true,
					          "adjustBorderColor":false,
					          "color":"#ffffff"
					        },
					        "bullet": "round",
					        "bulletBorderAlpha": 1,
					        "bulletColor": "#FFFFFF",
					        "bulletSize": 1,
					        "hideBulletsCount": 50,
					        "lineThickness": 2,
					        "title": "red line",
					        "useLineColorForBulletBorder": true,
					        "valueField": "value",
					        "balloonText": "<span style='font-size:12px;'>[[value]]</span>"
					    }
						],
						"guides": [],
						"valueAxes": [
							{
								"title": `Nồng độ ${indicator}`
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

		function updateAQIColor(){
	var value = parseInt($('#dailyAQISpan').attr('data-aqi'));
	$('#dailyAQISpan').css('color','#222');
	if(value > 300){
		$('#dailyAQISpan').css('background-color','brown');
	}
	else if(value > 200){
		$('#dailyAQISpan').css('background-color','red');
	}
	else if(value > 100){
		$('#dailyAQISpan').css('background-color','orange');
	}
	else if(value > 50){
		$('#dailyAQISpan').css('background-color','yellow');
	}
	else if(value >= 0){
		$('#dailyAQISpan').css('background-color','#00b0f0');
	}
	else{
		$('#dailyAQISpan').css('background-color','#efefef');
	}
}

function load(id){
	$('#loading').show();
	$.ajax({
		url : "/api/view/"+id,
		success:function(response){
			$('#loading').hide();
			$('#site-name').text(response.site.name);
			$('#site-details').html(response.siteDetail);
			$('#table-data').html(response.tableData);
			$('#table-weather').html(response.tableWeatherData);
			if(response.aqi >= 0){
				$('#aqi').html("AQI " + response.aqi);
				$('#aqi_time').html(response.aqi_time);
			}
			else
				$('#aqi').html("AQI <small>Không có số liệu</small>");
			$('#legend1').empty();
			$('#aqi').attr("data-aqi",response.aqi);
			$('#aqi_text').text(response.aqiText);

			updateAQIColor();
			if(__chart){
				__chart.removeLegend();
			}
			__chart = AmCharts.makeChart("chartdiv", {
				"type": "serial",
				"theme": "light",
				"marginRight": 40,
				"marginLeft": 50,
				"autoMarginOffset": 20,
				"mouseWheelZoomEnabled":true,
				"dataDateFormat": "YYYY-MM-DD JJ:NN:SS",
				"valueAxes": [{
						"id": "v1",
						"axisAlpha": 0,
						"position": "left",
						"ignoreAxisWidth":true
				}],
				"balloon": {
						"borderThickness": 1,
						"shadowAlpha": 0,
						"fontSize":11,
						"textAlign":"left",
				},
				"graphs": response.graphs,
				"chartCursor": {
						"pan": true,
						"valueLineEnabled": true,
						"valueLineBalloonEnabled": true,
						"cursorAlpha":1,
						"cursorColor":"#258cbb",
						"limitToGraph":"g1",
						"valueLineAlpha":0.2,
						"valueZoomable":true
				},
				"categoryField": "time",
				"categoryAxis": {
						"minPeriod": "mm",
						"parseDates": true,
						'format':'JJ:NN'
				},
				"legend": {
			    	"useGraphSettings": true,
			    	"rollOverColor":"#aaa",
			    	"maxColumns":4,
			    	"spacing":0,
			    	"verticalGap":4,
			    	"divId":"legend1",
			    	"marginLeft":0,
			    	"marginRight":0,
				},
				"dataProvider": response.data
			});
			__chart.addListener("rendered", zoomSiteChart);
			zoomSiteChart();

			loadIndicatorAqi(response.indicators);
		}
	})

	loadHourlyAQI('hourlyAQIChart',id);
	if($('#link-stats').length > 0){
		$('#link-stats').attr('href','/thong-ke-aqi?site_id='+id);
	}
}
function loadByIndicator(id){
	$.ajax({
			url : "/api/indicator/"+id,
			success:function(response){
				__chart2 = AmCharts.makeChart("chartdiv2", {
					"type": "serial",
					"theme": "light",
					"marginRight": 40,
					"marginLeft": 40,
					"autoMarginOffset": 20,
					"mouseWheelZoomEnabled":true,
					"valueAxes": [{
							"id": "v1",
							"axisAlpha": 0,
							"position": "left",
							"ignoreAxisWidth":true
					}],
					"balloon": {
							"borderThickness": 1,
							"shadowAlpha": 0
					},
					"graphs": response.graphs,
					"chartCursor": {
							"pan": true,
							"valueLineEnabled": true,
							"valueLineBalloonEnabled": true,
							"cursorAlpha":1,
							"cursorColor":"#258cbb",
							"limitToGraph":"g1",
							"valueLineAlpha":0.2,
							"valueZoomable":true
					},
					"categoryField": "time",
					"categoryAxis": {
							"minPeriod": "mm",
							"parseDates": true,
					},

					"dataProvider": response.data
				});

				__chart2.addListener("rendered", zoomIndicatorChart);

				zoomIndicatorChart();
			}
	})
}
function closeAllInfoWindows() {
	for (var i=0;i<__infoWindows.length;i++) {
		__infoWindows[i].close();
	}
}
