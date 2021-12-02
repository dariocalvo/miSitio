export class Usuario {
    id_usuario!:string;
    nombre!:string;
    email!:string;
    username!:string;
    password!:string;
    permiso!:number;
    activo!:number;
    fecha_registro!:Date;
    generador_pass!:number;
    imagen!:string;

    public get Idusuario() : string {
        return this.id_usuario;
      }
      public set IdUSUARIO(v : string) {
        this.id_usuario = v;
      }
      
      public get Nombre() : string {
        return this.nombre;
      }
      public set NOMBRE(v : string) {
        this.nombre = v;
      }
      
      public get Email() : string {
        return this.email;
      }
      public set EMAIL(v : string) {
        this.email = v;
      }
      
      public get Username() : string {
        return this.username;
      }
      public set USERNAME(v : string) {
        this.username = v;
      }
      
      public get Password() : string {
        return this.password;
      }
      public set PASS(v : string) {
        this.password = v;
      }
      
      public get Permiso() : number {
        return this.permiso;
      }
      public set PERMISO(v : number) {
        this.permiso = v;
      }
      
      public get Activo() : number {
        return this.activo;
      }
      public set ACTIVO(v : number) {
        this.activo = v;
      }
      
      public get Fecha_registro() : Date {
        return this.fecha_registro;
      }
      public set REGISTRO(v : Date) {
        this.fecha_registro = v;
      }

    constructor() { 
        this.id_usuario = "";
        this.nombre = "";
        this.email = "";
        this.username = "";
        this.password = "";
        this.permiso = 0;
        this.activo = 0;
        this.fecha_registro = new Date;
      }


}
