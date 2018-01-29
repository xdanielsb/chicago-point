from urllib2 import urlopen, Request
from irequest import IRequest
import json
import urllib2
import pandas as pd
from functions import haversine

class RequestWeather:

    def __init__(self):
        self.appid = "6aa0bdb1f586c5630d60b6237dfce45c"
        self.url = "http://api.openweathermap.org/data/2.5/weather"


    def get_weather2(self, zipc="94040"):
        """ Get the weather based on a zip """
        try:
            url = self.url+"?zip={},us&appid={}".format(zipc, self.appid)
            data = urllib2.urlopen(url)
            result = json.load(data)

            return result

        except Exception as e:
            print("E1: Error in request")
            return []
