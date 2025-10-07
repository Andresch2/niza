
# Inventario MVP Local (SQLite por defecto)

## Requisitos
- Python 3.10+ (recomendado 3.11 o 3.12)
- Node.js 18+ y npm

## 1) Backend (Django + DRF)
```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# Windows cmd:       .venv\Scripts\activate.bat
# macOS/Linux:       source .venv/bin/activate

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py load_seed
python manage.py runserver 127.0.0.1:8000
```

Prueba en el navegador:
- http://127.0.0.1:8000/inventory/summary
- http://127.0.0.1:8000/products/
- http://127.0.0.1:8000/alerts/
- http://127.0.0.1:8000/suggestions/

Si ves sólo “API Root”, entra al enlace `/products/` o `/inventory/summary`.
Si sale error “no such table…”, repite **migrate** y **load_seed**.

## 2) Frontend (Next.js + Tailwind)
```bash
cd frontend
npm install
echo NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000 > .env.local
npm run dev
```
Abre http://127.0.0.1:3000

> Los endpoints `PATCH` de sugerencias no requieren CSRF en este MVP (REST_FRAMEWORK sin auth).
