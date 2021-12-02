export class Publicacion {
    id_publicacion!:string;
    username!:string;
    id_usuario!:string;
    fecha!:Date;
    id_rubro!:string;
    categoria!:string;
    imagen!:string;
    titulo!:string;
    contenido!:string;
    pie!:string;
    rutaImagen!:string;

    constructor() {
        this.id_publicacion = ""; 
        this.username = "";
        this.id_usuario = "";
        this.fecha = new Date;
        this.id_rubro = "";
        this.categoria = "";
        this.imagen = "";
        this.titulo = "";
        this.contenido = "";
        this.pie = "";
        this.rutaImagen = "";
  }
}

