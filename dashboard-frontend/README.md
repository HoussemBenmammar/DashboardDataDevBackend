# DashboardDataDevBackend

Ce projet est une application web pour importer, stocker et visualiser des données météo à l'aide de **FastAPI** pour le backend et **React** pour le frontend. Le backend expose des API pour l'importation des données et leur consultation. Le frontend consomme ces API et affiche les données sous forme de tableau et de graphique.

## Prérequis

### Backend (FastAPI)
- **Python 3.7+**
- **PostgreSQL** ou toute autre base de données supportée par SQLAlchemy
- **Pip** pour installer les dépendances

### Frontend (React)
- **Node.js** version 12.x ou supérieure
- **npm** ou **yarn**

## Structure du projet


## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/ton_utilisateur/DashboardDataDevBackend.git
cd DashboardDataDevBackend
cd backend

python -m venv venv
# Sur Windows
venv\Scripts\activate
# Sur MacOS/Linux
source venv/bin/activate
pip install -r requirements.txt
# Exemple de commande si vous utilisez une base PostgreSQL
export DATABASE_URL=postgresql://username:password@localhost:5432/dbname
uvicorn app.main:app --reload
cd ../frontend
npm install
npm start

