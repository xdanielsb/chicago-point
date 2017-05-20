from urllib2 import urlopen, Request
from irequest import IRequest
import json
import urllib2
import pandas as pd
from functions import haversine



class RequestHospital(IRequest):

    def __init__(self):
        self.url = "https://data.cityofchicago.org/resource/cjg8-dbka.json"
        self.hospitals = self.get_data()


    def get_data(self):
        """ Get the hospitals in chicago """
        data  = urllib2.urlopen(self.url)

        #Tricky part
        result = json.load(data)
        #Data Frame
        data_frame =  pd.read_json(json.dumps(result))
        return data_frame


    def get_locations_health_center(self):
        """ Get the locations of  health centers in chicago """
        locs = self.hospitals[["community_area", "facility", "location_1", "phone"]]
        locs_js = locs.to_json()
        return locs_js
