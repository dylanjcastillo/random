import pandas as pd

# Create sample dataframe
df = pd.DataFrame(
    {
        "A": [x * 10 for x in range(100)],
        "B": [x for x in range(100)],
        "C": [x // 2 for x in range(100)],
    }
)
