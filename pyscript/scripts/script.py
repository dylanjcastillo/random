import pandas as pd

from pyodide.http import open_url

# Create sample dataframe
url = "https://raw.githubusercontent.com/dylanjcastillo/random/main/pyscript/data/iris.csv"
df = pd.read_csv(open_url(url))
