from urllib2 import urlopen, Request
from irequest import IRequest
import json
import urllib2
import pandas as pd
from functions import haversine



class RequestLibrary(IRequest):

    def __init__(self):
        self.url = "https://data.cityofchicago.org/resource/x8fc-8rcq.json"
        self.libraries = self.get_data()

    def get_data(self):
        """ Get the libraries in chicago """
        data  = urllib2.urlopen(self.url)

        #Tricky part
        result = json.load(data)
        #Data Frame
        data_frame =  pd.read_json(json.dumps(result))
        return data_frame

    def get_locations_libraries(self):
        """ Get important info libraries """
        locs = self.libraries[["location", "address", "hours_of_operation", "teacher_in_the_library", "website", "name_"]]
        locs_js = locs.to_json()
        return locs_js
