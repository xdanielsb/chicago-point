from urllib2 import urlopen, Request
from irequest import IRequest
import json
import urllib2
import pandas as pd
from functions import haversine



class RequestPark(IRequest):

    def __init__(self):
        self.url = "https://data.cityofchicago.org/resource/4xwe-2j3y.json"
        self.parks = self.get_data()


    def get_data(self):
        """ This method helps me to get the parks in chicago city """
        data = urllib2.urlopen(self.url)

        #Tricky part
        result = json.load(data)
        aux = json.dumps(result)
        aux2 = json.dumps(json.loads(aux))

        #Data Frame
        data_frame =  pd.read_json(aux2)
        data_frame = data_frame[["location", "park_name"]]
        data_frame = data_frame.dropna()
        #Many parks
        data_frame = data_frame.sample(frac=0.1)
        return data_frame


    def get_location_parks(self):
        """ Get the locations of the parks """
        locs_js = self.parks.to_json()
        return locs_js
