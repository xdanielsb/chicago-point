from urllib2 import urlopen, Request
from irequest import IRequest
import json
import urllib2
import pandas as pd
from functions import haversine



class RequestLibrary(IRequest):

    def __init__(self):
        self.libraries = self.get_data()

    """
        Get the libraries in chicago
    """
    def get_data(self):
        url = "https://data.cityofchicago.org/resource/x8fc-8rcq.json"
        data  = urllib2.urlopen(url)

        #Tricky part
        result = json.load(data)
        #Data Frame
        data_frame =  pd.read_json(json.dumps(result))
        return data_frame

    """
        Get important info libraries
    """
    def get_locations_libraries(self):
        locs = self.libraries[["location", "address", "hours_of_operation", "teacher_in_the_library", "website", "name_"]]
        locs_js = locs.to_json()
        return locs_js
