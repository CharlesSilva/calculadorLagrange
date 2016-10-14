///////////CODIGO FUNCIONAMIENTO DE LA PAGINA///////////////////

$(document).ready(function(){

  $("#divMetodo").show();
  $("#metodoBtn").addClass("linkBtnSel");
  $("#divCodigo").hide();
  $("#divHistoria").hide();
  $("#divResultados").hide();
  $("#cooX").focus();

  $("#metodoBtn").click(function(){
    $("#metodoBtn").addClass("linkBtnSel");
    $("#codigoBtn").removeClass("linkBtnSel");
    $("#historiaBtn").removeClass("linkBtnSel");
    $("#divMetodo").show();
    $("#divCodigo").hide();
    $("#divHistoria").hide();
    $("#cooX").focus();
  });

  $("#codigoBtn").click(function(){
    $("#codigoBtn").addClass("linkBtnSel");
    $("#metodoBtn").removeClass("linkBtnSel");
    $("#historiaBtn").removeClass("linkBtnSel");
    $("#divMetodo").hide();
    $("#divCodigo").show();
    $("#divHistoria").hide();
  });

  $("#historiaBtn").click(function(){
    $("#historiaBtn").addClass("linkBtnSel");
    $("#metodoBtn").removeClass("linkBtnSel");
    $("#codigoBtn").removeClass("linkBtnSel");
    $("#divMetodo").hide();
    $("#divCodigo").hide();
    $("#divHistoria").show();
  });

  $("#addBtn").click(function(){
    addRowIfClick();
  }); //funcion agregar row en evento clickdel boton addBtn

  $("#btnEval").click(function() {
    addRowEval();
  });

  $("#cooX").keypress(function(ev) {
    var keycode = (ev.keyCode ? ev.keyCode : ev.which);
    if(keycode == '13'){
      addRowIfClick();
    }
  });

  $("#cooY").keypress(function(ev) {
    var keycode = (ev.keyCode ? ev.keyCode : ev.which);
    if(keycode == '13'){
      addRowIfClick();
    }
  });
  $("#evalFrm").submit(function(event) {
    event.preventDefault();
  });

  $("#btnAyudaMetodo").click(function() {
    alert("HOLA, ESTA APLICACION TE AYUDARA A HACER UNA APROXIMACION POLINOMIAL USANDO EL METODO DE LAGRANGE \n "
      + "PARA EMPEZAR PUEDES INGRESAR TUS OBSERVACIONES INICIALES EN LOS CAMPOS CORRESPONDIENTES  \n"
      + "LUEGO DA CLICK EN EL BOTON CALCULAR Y TE GENERAREMOS UN POLINOMIO APROXIMADO A TUS OBSERVACIONES"
    );
  });
  $("#btnAyudaObs").click(function() {
    alert("INGRESAR TUS OBSERVACIONES INICIALES EN LOS CAMPOS CORRESPONDIENTES  \n"
      + "LUEGO DA CLICK EN EL BOTON CALCULAR Y TE GENERAREMOS UN POLINOMIO APROXIMADO A TUS OBSERVACIONES"
    );
  });
  $("#btnAyudaPoli").click(function() {
    alert("ESTA CADENA ES EL POLINOMIO OBTENIDO APARTIR DE TUS OBSERVACIONES INICIALES");
  });
  $("#btnAyudaEvalPoli").click(function() {
    alert("AQUI PUEDES AVALUAR EL POLINOMIO DE ARRIBA CON RESPECTO A LA COORDENADA X QUE DESEES");
  });

  alert("HOLA, ESTA APLICACION TE AYUDARA A HACER UNA APROXIMACION POLINOMIAL USANDO EL METODO DE LAGRANGE \n "
    + "PARA EMPEZAR PUEDES INGRESAR TUS OBSERVACIONES INICIALES EN LOS CAMPOS CORRESPONDIENTES  \n"
    + "LUEGO DA CLICK EN EL BOTON CALCULAR Y TE GENERAREMOS UN POLINOMIO APROXIMADO A TUS OBSERVACIONES"
  );
});

function addEvalEnter(ev){
  var keycode = (ev.keyCode ? ev.keyCode : ev.which);
  if(keycode == '13'){
    addRowEval();
  }
}

function addRowIfClick(){
  var x = $("#cooX").val();
  var y = $("#cooY").val();
  var control = false;

  if(x.length > 0 && y.length > 0){
    control = true;
  }else{
    if(x.length == 0){
      alert("ingresa un valor para la coordenada X");
    }else{
      alert("ingresa un valor para la coordenada Y");
    }
  }
  if(control){
    var trs=$("#tablaDeObservaciones tr").length; // obtenemos el numero de filas existentes
    var nuevaRow = "<tr id='tr"+ (trs-1) +"'>";
    nuevaRow += "<td id='tdN"+ (trs-1) +"' class='tdN'>"+ (trs-1) +"</td>"; // columna de n
    nuevaRow += "<td id='tdX"+ (trs-1) +"' class='tdX'>"+ x + "</td>"; // columna de x
    nuevaRow += "<td id='tdY"+ (trs-1) +"' class='tdY'>"+ y + "</td>"; // columna de y
    nuevaRow += "<td id='tdDel"+ (trs-1) +"' class='borrar'> <img src='media/delete.png' alt='quitar' class='imgBorrar' onClick='deleteRow("+(trs-1)+")'></td>" //boton borrar
    nuevaRow += "</td>";
    $('#tablaDeObservaciones tr:last').after(nuevaRow);
    $("#cooX").val("");
    $("#cooY").val("");
  }
  $("#cooX").focus();
}

function deleteRow(num){
  // borra una fila en la tabla
  var selector = "#tr" + num;
  $(selector).remove();
  // se actualiza el valor de las n
  var trs=$("#tablaDeObservaciones tr").length; // obtenemos el numero de filas existentes
  var totTr = $("#tablaDeObservaciones tr");
  var cnt = 0;
  $(".tdN").each(function() {
    $(this).text(cnt);
    cnt = cnt + 1;
  });
}

function deleteRowEval(num){
  // borra una fila en la tabla
  var selector = "#trEv" + num;
  $(selector).remove();
}

function addRowEval(){
  var x = $("#evX").val();
  var data = getData();
  var control = false;
  if(x.length > 0){
    control = true;
  }else{
    alert("INGRESA UNA COORDENADA X PARA EVALUAR Y");
  }
  if(control){

    var y = laGrange(x,data);
    var trs=$("#tablaDeEvaluaciones tr").length;
    var nuevaRow = "<tr id='trEv"+ (trs-1) +"'>";
    nuevaRow += "<td class='evCoX'>"+ x +"</td>";
    nuevaRow += "<td class='evCoY'>"+ y +"</td>";
    nuevaRow += "<td class='borrar'> <img src='media/delete.png' alt='quitar' class='imgBorrar' onClick='deleteRowEval("+(trs-1)+")'></td>" //boton borrar
    nuevaRow += "</tr>";
    $('#tablaDeEvaluaciones tr:last').after(nuevaRow);
    $("#evX").val("");
    $("#evX").focus();
  }
}

function getData(){
  //esta funcion obtiene la informacion ingresada en las observaciones iniciales
  var objData = {
    N : [],
    X : [],
    Y : []
  };
  var n = 0; // control de iteracion de n
  $(".tdN").each(function(){
    objData.N[n] = $(this).text(); // guardamos el valor de n
    n++;
  });
  var x = 0; // control de iteracion de x
  $(".tdX").each(function(){
    objData.X[x] = $(this).text(); // guardamos el valor de x
    x++;
  });
  var y = 0; // control de iteracion de y
  $(".tdY").each(function(){
    objData.Y[y] = $(this).text(); // guardamos el valor de y
    y++;
  });
  if(n == 0){
    // se notifica al usuario que no hay datos para recuperar | tabla vacia
    alert("INGRESE VALORES INICIALES");
  }else {
    // se impime en consola retroalimentacion para saber que se esta calculando
    // solo con propositos de control
    console.log("SE RECUPERARON LAS OBSERVACIONES INICIALES");
  }
  /*
  //este bloque puede ser usado para comprobar los valores obtenidos d la tabla
  var max = objData.N.length
  for (i = 0; i < max; i++) {
    var cadena = "n: " + objData.N[i] + " x: " + objData.X[i] + " y: " + objData.Y[i];
    alert(cadena);
  }
  */
  return objData;
}

function calcular(){
  $("#divResultados").show();
  var data = getData();
  var polinomio = textoLaGrange(data);
  $("#pPolinomio").text(polinomio);
}



///////////FIN CODIGO FUNCIONAMIENTO DE LA PAGINA///////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//////////CODIGO METODO LAGRANGE////////////////////////////////

/*
 * funcion que nos regresa el valor de lk evaluada en una x deseada
 */
function lk(k,x,arrX){
    // k = coordenada y
    // x = variable para evaluar la funcion
    var n = arrX.length - 1;// numero de observaciones
    var j = 0 //control de la iteracion
    var resultado = 0; // guarda el resultado de la evaluacion
    var primeraIteracion = true; // control de la primera coincidencia para ser evaluada
    // se usa este control para saber cuando debemos usar la varible resultado como acumulador o como valor inicial
    var xk = arrX[k]; // valor de la coordenada x con n = k
    for(j=0; j<=n; j++){ // itera todos los valores
        var xj = arrX[j];

        if(j != k){ // restriccion de la formula lk(x)
            if(primeraIteracion){ // evaluamos si es la primera vez que se calcula el valor
                resultado = ((x-xj)/(xk-xj)); // se calcula el valor de resultado por primera vez
                primeraIteracion = false; // el control se establece en falso para no volver a calcular el valor de esta forma
            }else{ // se ejecuta este bloque de codigo si no es la primera vez que se calcula resultado
                resultado = resultado * ((x-xj)/(xk-xj)); // se calcula el valor de resultado como un acumulador
            }
        }
    }
    return resultado;
}

function textolK(k,arrX){
  var x = "x";
  var n = arrX.length - 1;
  var j = 0 ;
  var resultado;
  var primeraIteracion = true;
  var xk = arrX[k];
  var cadena = "";
  for(j=0; j<=n; j++){
    var xj = arrX[j];
    if(j != k){ // restriccion de la formula lk(x)
        if(primeraIteracion){ // evaluamos si es la primera vez que se calcula el valor
            cadena = "[(x - " + xj + ")/(" + xk + " - " + xj +")]"; // se calcula el valor de resultado por primera vez
            primeraIteracion = false; // el control se establece en falso para no volver a calcular el valor de esta forma
        }else{ // se ejecuta este bloque de codigo si no es la primera vez que se calcula resultado
            cadena = cadena + " * [(x - " + xj + ")/(" + xk + " - " + xj + ")]"; // se calcula el valor de resultado como un acumulador
        }
    }
  }
  return cadena;
}

/*
 * funcion que calcula un valor aproximado para y dado un x
 */
function laGrange(x,data){
  var n = data.X.length - 1;
  var resultado = 0;
  for (var k = 0; k <= n; k++){
    var yk = data.Y[k];
    resultado = resultado + (yk * lk(k,x,data.X));
  }
  return resultado;
}

function textoLaGrange(data){
  var n = data.X.length - 1;
  var cadena = "";
  for (var k = 0; k <= n; k++) {
    var yk = data.Y[k];
    if(k != 0){
      cadena += " + "
    }
    cadena = cadena + "{ "+ yk +" * "+ textolK(k,data.X) +" }"
  }
  console.log(cadena);
  return cadena;
}
