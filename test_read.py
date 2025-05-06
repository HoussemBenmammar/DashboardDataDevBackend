from sqlalchemy import create_engine
import pandas as pd

engine = create_engine("postgresql://postgres:admin@localhost:5432/dashboarddb")
df = pd.read_sql("SELECT * FROM imported_data", engine)
print(df.head())
