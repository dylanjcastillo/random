import pandas as pd

from pyodide.http import open_url

# Create sample dataframe
url = "https://raw.githubusercontent.com/dylanjcastillo/random/main/pyscript/data/iris_modified.csv"
df = pd.read_csv(open_url(url))
df_initial = df.copy()
