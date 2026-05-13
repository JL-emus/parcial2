import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors"; // Cambiado a import estándar de TS
import { sequelize, testConnection, getDatabaseInfo } from "../database/db";
import routes from "../routes/index";
import { setupAssociations } from "../models/associations";
import { populateData } from '../faker/populate_data';

dotenv.config();

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.dbConnection(); // Este método se encarga de la magia
  }

  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/api", routes);
  }

  private async dbConnection(): Promise<void> {
    try {
      const dbInfo = getDatabaseInfo();
      console.log(`🔌 Conectando a base de datos: ${dbInfo.engine.toUpperCase()}`);

      // 1. Probar la conexión inicial
      const isConnected = await testConnection();
      if (!isConnected) {
        throw new Error(`No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`);
      }

      // 2. CONFIGURAR ASOCIACIONES (¡IMPORTANTE: Antes del sync!)
      // Esto le dice a Sequelize que existen las FK antes de crear las tablas
      setupAssociations();

      // 3. SINCRONIZAR TABLAS FÍSICAS
      // Si aún no ves las tablas en DBeaver, cámbialo a { force: true } una sola vez
      await sequelize.sync({ force: false });
      console.log(`📦 Tablas físicas sincronizadas exitosamente`);

      // 4. POBLAR DATOS (FAKER)
      // COMENTA ESTA LÍNEA después de que veas los datos en DBeaver para no duplicar
      await populateData(); 
      console.log(`🚀 Base de datos poblada con registros de Faker`);

    } catch (error) {
      console.error("❌ Error en el ciclo de base de datos:", error);
      // No cerramos el proceso para permitir que nodemon intente reiniciar tras corregir
    }
  }

  async listen(): Promise<void> {
    const port = this.app.get('port');
    await this.app.listen(port);
    console.log(`🚀 Servidor ejecutándose en puerto ${port}`);
  }
}