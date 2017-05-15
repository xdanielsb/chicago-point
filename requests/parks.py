from urllib2 import urlopen, Request
import json
import urllib2
import pandas as pd
from functions import haversine



class RequestPark:

    def __init__(self):
        self.parks = self.get_data()

    """
        This method helps me to get the parks in chicago city
    """
    def get_data(self):
        url = "https://data.cityofchicago.org/resource/4xwe-2j3y.json"
        data = urllib2.urlopen(url)

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

    """
        Get the locations of the parks
    """
    def get_location_parks(self):
        locs_js = self.parks.to_json()
        return locs_js
