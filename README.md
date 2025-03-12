# wordle
Implementation of wordle using React/Typescript and Python/Django

![image](https://github.com/user-attachments/assets/a750a33f-2269-4e7b-b674-98a2ce370c2f)


## Frontend

The frontend is running at port 5173.

```bash
cd ./frontend
yarn # install packages
```

### Running the frontend
```bash
yarn dev
```

### Testing the frontend
```bash
yarn test
```

## Backend

The frontend is running at port 8000.

```bash
cd ./backend
python -m venv env # or python3
source env/bin/activate
pip install -r /path/to/requirements.txt # or pip3
```

### Running the backend
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Testing the backend (with coverage)
```bash
coverage run manage.py test
coverage report
```
