import json
import numpy as np
import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

def main():
    settings = get_app_settings('settings.json')
    
    data_frame = pd.read_csv(settings["path_to_dataset"], sep=',', header=0)
    clean_data_frame(data_frame)
    correlation = data_frame.corr()
    correlation.to_json(settings["path_to_results"])

    db_reference = getDBReference(settings["path_to_private_key"], settings["db_url"])
    save_results(db_reference, settings["path_to_results"])

def get_app_settings(path_to_settings):
    with open(path_to_settings) as f:
        app_settings = json.load(f)
    return app_settings

def clean_data_frame(dataFrame):
    dataFrame.dropna(axis=1, how='all', inplace=True)
    dataFrame.fillna(dataFrame.mean(), inplace=True)

def getDBReference(path_to_certificate, db_url):
    cred = credentials.Certificate(path_to_certificate)
    firebase_admin.initialize_app(cred, {
        'databaseURL': db_url
    })
    return db.reference('/')

def save_results(db_reference, path_to_results):
    with open(path_to_results) as f:
        d = json.load(f)
        db_reference.set(d)

if __name__== "__main__":
  main()
