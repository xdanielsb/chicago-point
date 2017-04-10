from urllib2 import urlopen, Request
import json
import urllib2

#Library for Data Science
import pandas as pd

class Request:

    def __init__(self):
        #Take a moment load the information
        self.houses_data = self.get_houses()
        self.health_data = self.get_health_statistics()

    """
        Get the houses for rent
    """
    def get_houses(self):
        url = "https://data.cityofchicago.org/resource/uahe-iimk.json"
        data  = urllib2.urlopen(url)
        result = json.load(data)
        return result

    """
        Get information about the health in a community
    """
    def get_health_statistics(self):
        url = "https://data.cityofchicago.org/resource/iqnk-2tcu.json"
        result = json.load(urllib2.urlopen(url))
        return result

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
        Get locations houses.
    """
    def get_locations_houses(self):
        h = json.dumps(self.houses_data)
        j = json.dumps(json.loads(h)) #tricky part
        data_frame = pd.read_json(j) #Start with the science
        data_frame = data_frame.dropna() #Remove NAN rows
        locs = data_frame[["latitude", "longitude"]]
        locs_js = locs.to_json()
        return locs_js
