from urllib2 import urlopen, Request
import json
import urllib2


"""
    Get the houses
"""
def get_houses():
    url = "https://data.cityofchicago.org/resource/uahe-iimk.json"
    result = json.load(urllib2.urlopen(url))
    return result

"""
    Get information about the health in a community
"""
def get_health_statistics():
    url = "https://data.cityofchicago.org/resource/iqnk-2tcu.json"
    result = json.load(urllib2.urlopen(url))
    return result


"""
    Get the weather based on ZIP code
"""
def get_weather(locationid="60007",startdate="2016-05-01", enddate="2016-05-31", datasetid="GSOM"):
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
