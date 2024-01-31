import random
import math

# generate random username for signups
def generateRandomName(name):
    new_name = "".join(name.split(" "))
    for i in range(4):
        new_name += str(math.floor(random.random() * 11))
    return new_name

