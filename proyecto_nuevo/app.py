from flask import Flask
from flask import render_template, request, redirect, Response, url_for, session
from flask_mysqldb import MySQL,MySQLdb
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime
import os

app = Flask(__name__, template_folder='templates')

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'login'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

#esta funcion es cuando se entra a la pagina principal
@app.route('/')
def home():
    return render_template('/alumnos/login.html')
'''
 esto seria para la ruta de las otras paginas ke se encuentran en la carpeta templates
@app.route('/adopta')
def adopta():
    return render_template('adopta.html')

@app.route('/noticias')
def noticias():
    return render_template('news.html')

@app.route('/refugios')
def refugios():
    return render_template('refugios.html')

@app.route('/vote')
def vote():
    return render_template('vote.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/form_adopcion')
def form_adopcion():
    return render_template('form_adopcion.html')
'''




#aca accedemos a la pagina para iniciar sesion
@app.route('/login')
def login():
    return render_template('/alumnos/login.html')

#SECCION DE LOGIN
#esta seccion es para validar el usuario al ingresar con email y password
@app.route('/acceso-usuario', methods= ["GET", "POST"])
def usuario():

    if request.method == 'POST' and 'txtCorreo' in request.form and 'txtPassword' in request.form:
        _correo = request.form ['txtCorreo']
        _password = request.form ['txtPassword']

        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM usuarios WHERE correo = %s and password = %s', (_correo, _password)) 
        account = cur.fetchone()
        cur.close()

        if account:
            session['ingresado'] = True
            session['id'] = account['id']
            session['id_rol'] = account['id_rol']

            if session['id_rol'] == 1:
                return render_template("/alumnos/admin.html")
            elif session['id_rol'] == 2:
                return render_template("/alumnos/userLog.html")
        else:
            return render_template('/alumnos/login.html', mensaje_error="Usuario o contraseña incorrectos!")

#SECCION DE REGISTRO DE USUARIO

@app.route('/registro')
def registo():
    return render_template('/alumnos/registro.html')

@app.route('/nuevo-registro', methods=["GET", "POST"])
def nuevo_registro():
    if request.method == 'POST':
        os.makedirs("uploads", exist_ok=True)
    
        dni=request.form['txtDni']
        nombre=request.form['txtNombre']
        apellido=request.form['txtApellido']
        correo=request.form['txtCorreo']
        password=request.form['txtPassword']
        foto = request.files['txtFoto']

        now= datetime.now()
        fecha = now.strftime('%Y%H%M%S')
        
        if foto.filename != '':
            filename = fecha + "_" + foto.filename  # Agrega un guion bajo para legibilidad
            filepath = os.path.join("uploads", filename)  # Construye la ruta del archivo correctamente
            foto.save(filepath)

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO usuarios (dni, nombre, apellido, correo, password, foto, id_rol) VALUES (%s, %s, %s, %s, %s, %s, '2')", (dni, nombre, apellido, correo, password, foto.filename))
    mysql.connection.commit()
    cur.close()

    return render_template('/alumnos/login.html', mensaje_registro="Registro Exitoso!")


#-----LISTAR USUARIOS-------------
@app.route('/listar', methods= ["GET", "POST"])
def listar(): 
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM `login`.`usuarios`;")
    usuarios = cur.fetchall()
    cur.close()
    
    return render_template("/alumnos/listado.html",usuarios=usuarios)



#ESTE SERIA PARA EL LOGOUT  
@app.route('/logout')
def logout():
    session.pop('ingresado', None)
    session.pop('id', None)
    session.pop('id_rol', None)

    return redirect(url_for('home'))



    
    
    
if __name__ == '__main__':
    app.secret_key = "PatitaFelices"
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)