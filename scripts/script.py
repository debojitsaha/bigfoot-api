import sys
import pickle
import numpy as np
import pandas as pd

model = pickle.load(open('scripts/finalized_model.pkl', 'rb'))

Cylinders=0.0
Engine_Size=0.0
Fuel_Consumption_City=0.0
Fuel_Consumption_Comb=0.0
Fuel_Consumption_Comb_mpg=0.0
Fuel_Consumption_Hwy=0.0
Fuel_Type_E=0
Fuel_Type_N=0
Fuel_Type_X=0
Fuel_Type_Z=0
Make_Type_Luxury=0
Make_Type_Premium=0
Make_Type_Sports=0
Transmission_A4=0
Transmission_A5=0
Transmission_A6=0
Transmission_A7=0
Transmission_A8=0
Transmission_A9=0
Transmission_AM5=0
Transmission_AM6=0
Transmission_AM7=0
Transmission_AM8=0
Transmission_AM9=0
Transmission_AS10=0
Transmission_AS4=0
Transmission_AS5=0
Transmission_AS6=0
Transmission_AS7=0
Transmission_AS8=0
Transmission_AS9=0
Transmission_AV=0
Transmission_AV10=0
Transmission_AV6=0
Transmission_AV7=0
Transmission_AV8=0
Transmission_M5=0
Transmission_M6=0
Transmission_M7=0
Vehicle_Class_Type_Sedan=0
Vehicle_Class_Type_SUV=0
Vehicle_Class_Type_Truck=0

def get_prediction(engine, cylinder, city, highway, combination, combination_mpg, make, vehicle, transmission, fuel):

    # step 1. prepare data for ml feeding
    prepare_data(engine, cylinder, city, highway, combination, combination_mpg, make, vehicle, transmission, fuel)

    # step 2. prepare dataframe to store matrix
    c=pd.DataFrame([Engine_Size, Cylinders, Fuel_Consumption_City,Fuel_Consumption_Hwy, Fuel_Consumption_Comb,Fuel_Consumption_Comb_mpg,Fuel_Type_E, Fuel_Type_N, Fuel_Type_X,Fuel_Type_Z, Transmission_A4, Transmission_A5, Transmission_A6,Transmission_A7, Transmission_A8, Transmission_A9,Transmission_AM5, Transmission_AM6, Transmission_AM7,Transmission_AM8, Transmission_AM9, Transmission_AS10,Transmission_AS4, Transmission_AS5, Transmission_AS6,Transmission_AS7, Transmission_AS8, Transmission_AS9,Transmission_AV, Transmission_AV10, Transmission_AV6,Transmission_AV7, Transmission_AV8, Transmission_M5,Transmission_M6, Transmission_M7, Make_Type_Luxury,Make_Type_Premium, Make_Type_Sports, Vehicle_Class_Type_SUV,Vehicle_Class_Type_Sedan, Vehicle_Class_Type_Truck]).T

    # step 3. call model.predict() by passing the above dataframe
    prediction = model.predict(c)
    return np.round(prediction,2)

def prepare_data(engine, cylinder, city, highway, combination, combination_mpg, make, vehicle, transmission, fuel):
    global Cylinders
    global Engine_Size
    global Fuel_Consumption_City
    global Fuel_Consumption_Comb
    global Fuel_Consumption_Comb_mpg
    global Fuel_Consumption_Hwy
    global Fuel_Type_E
    global Fuel_Type_N
    global Fuel_Type_X
    global Fuel_Type_Z
    global Make_Type_Luxury
    global Make_Type_Premium
    global Make_Type_Sports
    global Transmission_A4
    global Transmission_A5
    global Transmission_A6
    global Transmission_A7
    global Transmission_A8
    global Transmission_A9
    global Transmission_AM5
    global Transmission_AM6
    global Transmission_AM7
    global Transmission_AM8
    global Transmission_AM9
    global Transmission_AS10
    global Transmission_AS4
    global Transmission_AS5
    global Transmission_AS6
    global Transmission_AS7
    global Transmission_AS8
    global Transmission_AS9
    global Transmission_AV
    global Transmission_AV10
    global Transmission_AV6
    global Transmission_AV7
    global Transmission_AV8
    global Transmission_M5
    global Transmission_M6
    global Transmission_M7
    global Vehicle_Class_Type_Sedan
    global Vehicle_Class_Type_SUV
    global Vehicle_Class_Type_Truck
    Cylinders=float(cylinder)
    Engine_Size=float(engine)
    Fuel_Consumption_City=float(city)
    Fuel_Consumption_Hwy=float(highway)
    Fuel_Consumption_Comb=float(combination)
    Fuel_Consumption_Comb_mpg=float(combination_mpg)
    if fuel == "Fuel_Type_E":
        Fuel_Type_E=1
    if fuel == "Fuel_Type_N":
        Fuel_Type_N=1
    if fuel == "Fuel_Type_X":
        Fuel_Type_X=1
    if fuel == "Fuel_Type_Z":
        Fuel_Type_Z=1
    if make == "Make_Type_Luxury":
        Make_Type_Luxury=1
    if make == "Make_Type_Premium":
        Make_Type_Premium=1
    if make == "Make_Type_Sports":
        Make_Type_Sports=1
    if transmission == "Transmission_A4":
        Transmission_A4=1
    if transmission == "Transmission_A5":
        Transmission_A5=1
    if transmission == "Transmission_A6":
        Transmission_A6=1
    if transmission == "Transmission_A7":
        Transmission_A7=1
    if transmission == "Transmission_A8":
        Transmission_A8=1
    if transmission == "Transmission_A9":
        Transmission_A9=1
    if transmission == "Transmission_AM5":
        Transmission_AM5=1
    if transmission == "Transmission_AM6":
        Transmission_AM6=1
    if transmission == "Transmission_AM7":
        Transmission_AM7=1
    if transmission == "Transmission_AM8":
        Transmission_AM8=1
    if transmission == "Transmission_AM9":
        Transmission_AM9=1
    if transmission == "Transmission_AS11":
        Transmission_AS11=1
    if transmission == "Transmission_AS4":
        Transmission_AS4=1
    if transmission == "Transmission_AS5":
        Transmission_AS5=1
    if transmission == "Transmission_AS6":
        Transmission_AS6=1
    if transmission == "Transmission_AS7":
        Transmission_AS7=1
    if transmission == "Transmission_AS8":
        Transmission_AS8=1
    if transmission == "Transmission_AS9":
        Transmission_AS9=1
    if transmission == "Transmission_AV":
        Transmission_AV=1
    if transmission == "Transmission_AV11":
        Transmission_AV11=1
    if transmission == "Transmission_AV6":
        Transmission_AV6=1
    if transmission == "Transmission_AV7":
        Transmission_AV7=1
    if transmission == "Transmission_AV8":
        Transmission_AV8=1
    if transmission == "Transmission_M5":
        Transmission_M5=1
    if transmission == "Transmission_M6":
        Transmission_M6=1
    if transmission == "Transmission_M7":
        Transmission_M7=1
    if vehicle == "Vehicle_Class_Type_Sedan":
        Vehicle_Class_Type_Sedan=1
    if vehicle == "Vehicle_Class_Type_SUV":
        Vehicle_Class_Type_SUV=1
    if vehicle == "Vehicle_Class_Type_Truck":
        Vehicle_Class_Type_Truck=1

print(get_prediction(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6], sys.argv[7], sys.argv[8], sys.argv[9], sys.argv[10]))