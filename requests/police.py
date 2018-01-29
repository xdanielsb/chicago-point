from urllib2 import urlopen, Request
from irequest import IRequest
import json
import urllib2
import pandas as pd
from functions import haversine



class RequestPolice(IRequest):

    def __init__(self):
        self.url = "https://data.cityofchicago.org/resource/gkur-vufi.json"
        self.police_stations = self.get_data()

    def get_data(self):
        """ Create data frame police stations """
        try:
            data = urllib2.urlopen(self.url)

            #Tricky part
            result = json.load(data)
            aux = json.dumps(result)
            aux2 = json.dumps(json.loads(aux))

            #Data Frame
            data_frame =  pd.read_json(aux2)
            data_frame = data_frame.dropna()

            return data_frame
        except Exception as e:
            print("E1: Error in request")
            return []

    def get_info_police_stations(self):
        """ Get information about police station """
        try:

            info = self.police_stations[["zip", "website", "address"]]
            info_js = info.to_json()
            aux = json.loads(info_js)
            keyse = "website"
            zipse = "zip"
            ad = "address"
            dataset = []
            for ar in aux[keyse]:
                url = aux[keyse][ar]["url"]
                _zip = aux[zipse][ar]
                _ad = aux[ad][ar]
                dataset.append([url, _zip, _ad])

                return dataset
        except Exception as e:
            print("E1: Error in request")
            return []

    def get_locations_police_stations(self):
        """ Get location  of police stations    """
        try:

            locs = self.police_stations[["location"]]
            locs_js = locs.to_json()
            return locs_js

        except Exception as e:
            print("E1: Error in request")
            return []
