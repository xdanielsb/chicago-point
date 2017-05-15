from urllib2 import urlopen, Request
from irequest import IRequest
import json
import urllib2
import pandas as pd
from functions import haversine

class RequestWeather:

    """
        Get the weather based on ZIP code
    """
    def get_weather(self,locationid="60007",startdate="2016-05-01", enddate="2016-05-31", datasetid="GSOM"):
        url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?"+ \
          "datasetid={}"+ \
          "&locationid=ZIP:{}"+ \
          "&startdate={}"+\
          "&enddate={}"

        url = url.format(datasetid, locationid, startdate, enddate)
        token = "xtLJFvVAFGacWOPnHFCOJvAfwVhVPFmI"
        request = Request(url)
        request.add_header('token', token)
        response = json.load(urlopen(request))
        return response

    """
        Get the weather another api
    """
    def get_weather2(self, zipc="94040"):
        appid = "6aa0bdb1f586c5630d60b6237dfce45c"
        url = "http://api.openweathermap.org/data/2.5/weather?zip={},us&appid={}".format(zipc, appid)
        data = urllib2.urlopen(url)
        result = json.load(data)

        return result
