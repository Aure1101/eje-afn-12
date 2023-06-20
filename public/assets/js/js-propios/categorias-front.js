//alert('El url es: ' + window.location.origin)
//una funcion para listar

let deleteSelectedId = '0';
let updateSelectedId = '0';

function getCategorias(){
    $.ajax({
        method: "GET",
        url: window.location.origin + "/api/categorias",
        data: {},
        success: function(result){
            if (result.estado == 1){
                const categorias = result.categorias;
                let tabla = $('#tabla-categorias').DataTable();
                categorias.forEach(categoria => {
                    let botones = generaBotones(categoria.id);
                    //agregar renglones a la tabla
                    let nuevoRenglon = tabla.row.add([categoria.descripcion, botones]).node()
                    $(nuevoRenglon).attr('id', 'renglon_'+categoria.id);
                    $(nuevoRenglon).find('td').addClass('table-td')
                    //tabla.row.add([categoria.descripcion, botones]).node().id='renglon_'+categoria.id
                    tabla.draw(false)
                })
            } else {
                alert(result.mensaje);
            }
        }
    });
}

function generaBotones(id){
    let botones = '<div class="flex space-x-3 rtl:space-x-reverse">';
    botones += '<button class="action-btn" type="button" >';
    botones += '<iconify-icon icon="heroicons:eye"></iconify-icon>';
    botones += '</button>';
    botones += '<button class="action-btn" type="button" data-bs-toggle="modal" data-bs-target="#updateModal" onclick="identificaActualizar('+id+')">';
    botones += '<iconify-icon icon="heroicons:pencil-square"></iconify-icon>';
    botones += '</button>';
    botones += '<button class="action-btn" type="button" data-bs-toggle="modal" data-bs-target="#deleateModal" onclick="identificaEliminar('+id+')">';
    botones += '<iconify-icon icon="heroicons:trash"></iconify-icon>';
    botones += '</button>';
    botones += '</div>';
    return botones;
}

function crearCategoria(){
    const descripcionCategoria = document.getElementById('descripcion-categoria-alta').value
    const observacionesCategoria = document.getElementById('observaciones-categoria-alta').value
    $.ajax({
        method: "POST",
        url: window.location.origin + "/api/categorias",
        data: {
            descripcion: descripcionCategoria,
            observaciones: observacionesCategoria 
        },
        success : function(result){
            let tabla = $('#tabla-categorias').DataTable();
            //agregar renglones a la tabla
            const categoria = result.categoria;
            let botones = generaBotones(categoria.id);
            let nuevoRenglon = tabla.row.add([categoria.descripcion, botones]).node()
            $(nuevoRenglon).attr('id', 'renglon_'+categoria.id);
            $(nuevoRenglon).find('td').addClass('table-td')
            //tabla.row.add([categoria.descripcion, botones]).node().id='renglon_'+categoria.id
            tabla.draw(false)        }
    })
}

function identificaEliminar(id){
    deleteSelectedId = id;
}

function borrarCategoria(){
    alert("hola")
    $.ajax({
        method: "DELETE",
        url: window.location.origin + "/api/categorias/" + deleteSelectedId,
        data: {},
        success : function(result){
            alert("hola")
            if (result.estado == 1){
                let tabla = $('#tabla-categorias').DataTable();
                alert(result.mensaje)
                tabla.row('#renglon_'+deleteSelectedId).remove().draw()
            }
        }
    })
}

function identificaActualizar(id){
    updateSelectedId = id;
    $.ajax({
        method : "GET",
        url : window.location.origin + "/api/categorias/" + updateSelectedId,
        data: {}, 
        success: function(result){
            document.getElementById("descripcion-categoria-update").value = result.categoria.descripcion
            document.getElementById("observaciones-categoria-update").value = result.categoria.descripcion
        }
    })
}

function actualizarCategoria(){
    let descripcionCategoria =  document.getElementById("descripcion-categoria-update").value
    $.ajax({
        method : "PUT",
        url : window.location.origin + "/api/categorias/" + updateSelectedId,
        data : {
            descripcion : descripcionCategoria,
            observaciones : document.getElementById("observaciones-categoria-update").value
        },
        success: function(result){
            alert(result.mensaje)

            if(result.estado == '1'){
                let tabla = $('#tabla-categorias') .DataTable();
                let renglonTemporal = tabla.row('#renglon_'+updateSelectedId).data();

                renglonTemporal[0]= descripcionCategoria

                tabla.row('#renglon_'+updateSelectedId).data(renglonTemporal).draw();
            }
        }
    })
}

getCategorias();
//una funcion para ver una categoria
//dos funciones para actualizar
//dos funciones para eliminar
//una funcion para crear categoria
//una funcion que nos regresa el url independientemente de forma local o de railway o render
