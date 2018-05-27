from irequest import IRequest
from urllib2 import urlopen, Request
import json
import urllib2
import pandas as pd
import random
from functions import haversine



class RequestHouses(IRequest):

    def __init__(self, cost):
        self.url = "https://data.cityofchicago.org/resource/uahe-iimk.json"
        self.cost_neighborhood = cost
        self.houses_data = self.get_data()



    def get_data(self):
        """ Get the houses for rent """
        try:
            data  = urllib2.urlopen(self.url)

            #Tricky part
            result = json.load(data)
            aux = json.dumps(result)
            aux2 = json.dumps(json.loads(aux))

            #Data Frame
            data_frame =  pd.read_json(aux2)
            data_frame = data_frame.dropna()
            distances = []
            #Compute the distance between two points useing harvesine formule
            #print(data_frame)
            for i, r in data_frame.iterrows():
                ans = haversine(r['longitude'], r['latitude'])
                distances.append( ans )
            data_frame['distance'] = pd.Series(distances, index=data_frame.index)
            return data_frame
        except Exception as e:
            print("error", str(e))
            return []




    def get_nearest_locations(self, n=5):
        """ Get the 5 nearest locations to the center """
        locs = self.houses_data[["latitude", "longitude", "address", "community_area_number", "community_area", "phone_number", "property_name", "property_type", "zip_code", "distance"]]
        nearest =  locs.nsmallest(n, 'distance')
        nearest.reset_index() #erase
        locs_js = nearest.to_json()

        aux = json.loads(locs_js)
        keys = ["address", "community_area_number", "community_area", "phone_number", "property_name", "property_type", "zip_code", "distance", "latitude", "longitude"]
        dataset = []
        cods = []
        for cod  in aux[keys[0]] :
            cods.append(cod)

        for cod in cods:
            row = []
            for a in keys:
                row.append(aux[a][cod])
            dataset.append(row)
        #print(dataset)
        return  dataset


    def get_number_by_comunity(self):
        """ Get number of houses by comunity. """
        _counts = self.houses_data["community_area"].value_counts()
        #_counts_js = _counts.to_json()
        #print(_counts_js)
        values = _counts.values
        labels = _counts.index.values
        colors = []
        #Create random colors
        for i in values:
            r = random.randint(0,255)
            g = random.randint(0,255)
            b = random.randint(0,255)
            colors.append("rgb({},{},{})".format(r,g,b))

        return labels, values,colors


    def get_locations_houses(self):
        """ Get locations houses. """
        locs = self.houses_data[["latitude", "longitude", "address", "community_area_number", "community_area", "phone_number", "property_name", "property_type", "zip_code", "distance"]]
        #Merge Datasets
        result = pd.merge(locs, self.cost_neighborhood, on="zip_code")
        #print (result)
        locs_js = result.to_json()
        return locs_js
