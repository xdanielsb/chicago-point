import urllib2
import json

def get_houses():
    url = "https://data.cityofchicago.org/resource/uahe-iimk.json"
    result = json.load(urllib2.urlopen(url))
    return result
