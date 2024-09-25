import { Response, Request } from "express";
import InstitucionesEducativasRepo from "../repository/institucionesEducativas.repo";
import InscripcionEventoRepo from "../repository/inscripcionEvento.repo";
import EvaluadorRepo from "../repository/evaluadores.repo";
import InformacionEmprendimientoRepo from "../repository/informacionEmprendimiento.repo";

export let obtener = async( req: Request, res:Response) => {
    let csvStream: any;
    const institucionesEducativas = new InstitucionesEducativasRepo();
    const inscripcionesEvento = new InscripcionEventoRepo();
    const evaluadores = new EvaluadorRepo();
    const informacionEmprendimiento = new InformacionEmprendimientoRepo();

    try {
        let registro = ``;
        const fs = require('fs');
        const path = require('path');
        const basePath = path.join(__dirname, '..'); 
        const informesPath = path.join(basePath, 'informes');

        if (!fs.existsSync(informesPath)) {
            fs.mkdirSync(informesPath, { recursive: true });
        }

        let colecciones = ['institucionesEducativas','inscripcionEvento','evaluadores','informacionEmprendimientos']

        let instituciones = await institucionesEducativas.obtener();
        let inscripcionEvento = await inscripcionesEvento.obtener();
        let evaluador = await evaluadores.obtener();
        let emprendimientos = await informacionEmprendimiento.obtener();

        for (let i=0; i<colecciones.length; i++){
            let nombreArchivo = path.join(informesPath, `${colecciones[i]}.csv`);
            csvStream = fs.createWriteStream(nombreArchivo);

            if(colecciones[i]=='institucionesEducativas'){
                csvStream.write('nombre;nombrePais;regionDepartamento;nombreLiderIES;correoContacto;telefonoContacto;urlOficial\n');
                instituciones.forEach((doc:any) => {
                    registro = `${doc.nombre};${doc.nombrePais};${doc.regionDepartamento};${doc.nombreLiderIES};${doc.correoContacto};${doc.telefonoContacto};${doc.urlOficial}`;
                    csvStream.write(`${registro}\n`);
                })
            } else if(colecciones[i]=='inscripcionEvento'){
                csvStream.write('nombres; apellidos; correo; telefono; nombrePais; ciudad; tipoAsistente; aceptaEnvioComunicacion\n');
                inscripcionEvento.forEach((doc:any) => {
                    registro = `${doc.nombres};${doc.apellidos};${doc.correo};${doc.telefono};${doc.nombrePais};${doc.ciudad};${doc.tipoAsistente};${doc.aceptaEnvioComunicacion}`;
                    csvStream.write(`${registro}\n`);
                })
            } else if(colecciones[i]=='evaluadores') {
                csvStream.write('nombre; telefono; correo; documentoIdentidad; nombrePais; nombreInstitucion\n');
                evaluador.forEach((doc: any) => {
                    registro = `${doc.nombre};${doc.telefono};${doc.correo};${doc.documentoIdentidad};${doc.nombrePais};${doc.nombreInstitucion}`;
                    csvStream.write(`${registro}\n`);
                })
            } else if(colecciones[i] == 'informacionEmprendimientos') {
                csvStream.write('nombres; apellidos; pais; ciudadResidencia; documentoIdentidad; correoElectronicoPersonal; correoElectronicoInstitucional; numeroTelefono; institucionEducativa; fechaLanzamiento; sector; estado; descripcionIdea; propuestaSolucion\n');
                emprendimientos.forEach((doc: any) => {
                    registro = `${doc.infoEmprendedor["nombres"]};${doc.infoEmprendedor["apellidos"]};${doc.pais["descripcion"]};${doc.infoEmprendedor["ciudadResidencia"]};${doc.infoEmprendedor["documentoIdentidad"]};${doc.infoEmprendedor["correoElectronicoPersonal"]};${doc.infoEmprendedor["correoElectronicoInstitucional"]};${doc.infoEmprendedor["numeroTelefono"]};${doc.IES["nombre"]};${doc.fecha};${doc.sector["sector"]};${doc.estado};${doc.descripcionIdea};${doc.propuestaSolucion}`;
                    csvStream.write(`${registro}\n`);
                })
            }
            
            csvStream.end();
        }
        
        res.json({
            ok: true,
            message: "OK - CSV generado con delitos registrados",
            error: null
        });
    } catch (error: any) {
        res.json({
            ok: false,
            error: error,
            message: "Error al generar CSV"
        });
    }
}