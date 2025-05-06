from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import numpy as np
from app.database import engine

app = FastAPI()

# Middleware CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
    df.dropna(how="all", inplace=True)
    df.replace([np.inf, -np.inf], None, inplace=True)
    df.to_sql("imported_data", engine, if_exists="replace", index=False)
    return JSONResponse(content={
        "message": "Fichier importé avec succès",
        "rows": len(df)
    })

@app.get("/data")
def get_data():
    try:
        df = pd.read_sql("SELECT * FROM imported_data", engine)
        df.replace([np.inf, -np.inf], None, inplace=True)
        df.fillna("", inplace=True)
        return JSONResponse(content=df.head(100).to_dict(orient="records"))
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
