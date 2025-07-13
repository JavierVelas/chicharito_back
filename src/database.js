const mysql2 = require('mysql2');

const pool = mysql2.createConnection({
  user: "root",
  password: "leonora19",
  database: "chicharitos"
});
pool.connect((err)=>{
  if(err){
    console.log("Conexión fallida");
  }else{
    console.log("Conexion a base de datos exitosa");
  }
});

exports.pool=pool;