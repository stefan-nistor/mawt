#!/usr/bin/python
import csv
from pymongo import MongoClient
import requests
import time

client = MongoClient("mongodb+srv://admin:admin@mawt.0d0jq.mongodb.net/mawt?retryWrites=true&w=majority")
db = client.mawt
mycol = db["Hidroplant"]

with open("/Users/snistor/Downloads/iha_hydrodatabase_240919_csv.csv", newline='', encoding='cp1252') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='"', skipinitialspace=True)
    i = 0
    for row in spamreader:
        if i == 0:
            i = i + 1
            continue
        hidroplant = {
            "name": row[0] if row[0] != '' else None,
            "db_status": row[1] if row[1] != '' else None,
            "country": row[3] if row[3] != '' else None,
            "iso": row[4] if row[4] != '' else None,
            "reservoir": row[5] if row[5] != '' else None,
            "lake": row[6] if row[6] != '' else None,
            "purpose": row[7] if row[7] != '' else None,
            "admin_unit": row[8] if row[8] != '' else None,
            "owner": row[9] if row[9] != '' else None,
            "near_city": row[10] if row[10] != '' else None,
            "district": row[11] if row[11] != '' else None,
            "river": row[12] if row[12] != '' else None,
            "main_basin": row[13] if row[13] != '' else None,
            "catch_area": row[14] if row[14] != '' else None,
            "op_status": row[15] if row[15] != '' else None,
            "commisioned": row[16] if row[16] != '' else None,
            "dam_completed": int(row[17]) if row[17] != '' else None,
            "no_units": row[18] if row[18] != '' else None, #str
            "dam_heigth": float(row[19]) if row[19] != '' else None,
            "min_wHeadHgt": float(row[20]) if row[20] != '' else None,
            "max_wHeadHgt": float(row[21]) if row[21] != '' else None,
            "res_capacity": float(row[22]) if row[22] != '' else None,
            "res_area": float(row[23]) if row[23] != '' else None,
            "elec_cap": float(row[24]) if row[24] != '' else None,
            "transm_exist": row[25] if row[25] != '' else None, #str
            "transm_length": float(row[26]) if row[26] != '' else None,
            "transm_planned": int(row[27]) if row[27] != '' else None,
            "type": row[28] if row[28] != '' else None,
            "ann_firm_gen": float(row[29]) if row[29] != '' else None,
            "ann_total_gen": float(row[30]) if row[30] != '' else None,
            "lat_res": float(row[31]) if row[31] != '' else None,
            "long_res": float(row[32]) if row[32] != '' else None,
            "lat_hp1": float(row[33]) if row[33] != '' else None,
            "long_hp1": float(row[34]) if row[34] != '' else None,
            "lat_hp2": float(row[35]) if row[35] != '' else None,
            "long_hp2": float(row[36]) if row[36] != '' else None,
            "display": row[37] if row[37] != '' else None,
        }
        print(hidroplant)
        mycol.insert_one(hidroplant)