from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:admin@localhost:5432/dashboarddb"
engine = create_engine(DATABASE_URL)
