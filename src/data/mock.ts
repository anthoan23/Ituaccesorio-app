/**
 * Datos de ejemplo (mock) — la app es 100 % visual, sin conexión al backend.
 * Esquema alineado a las columnas/campos reales de la web Ituaccesorio.
 */
import { colors } from "@/constants/theme";

export type EstadoOrden =
  | "Pendiente"
  | "Revisión"
  | "Reparación"
  | "Completado"
  | "Asignada"
  | "Entregado";

/* ============================================================
   DASHBOARD
   ============================================================ */

export const kpis = [
  { id: "1", label: "Ventas Hoy", valor: "$12,450", color: colors.yellow, trend: "+12.5%", trendUp: true },
  { id: "2", label: "Órdenes Activas", valor: "8", color: colors.blue, trend: "+8.3%", trendUp: true },
  { id: "3", label: "Equipos Reparados", valor: "23", color: colors.green, trend: "+5.2%", trendUp: true },
  { id: "4", label: "Ingresos Mensuales", valor: "$8,200", color: colors.red, trend: "-2.1%", trendUp: false },
];

export const actividad = [
  { id: "1", texto: "Nueva orden #OS-0142", hora: "hace 5 min", estado: "Asignada", icono: "clipboard", color: colors.blue },
  { id: "2", texto: "Reparación completada", hora: "hace 20 min", estado: "Completado", icono: "checkmark", color: colors.green },
  { id: "3", texto: "Pago recibido · $850.00", hora: "hace 1 h", estado: "Aprobado", icono: "cash", color: colors.yellow },
  { id: "4", texto: "Stock bajo: Pantalla iPhone 12", hora: "hace 2 h", estado: "Alerta", icono: "warning", color: colors.red },
];

/** Widgets del dashboard de la web: reparaciones, stock, ventas, técnicos. */
export const widgets = [
  { id: "1", icono: "build", label: "Reparaciones Pendientes", valor: "5", tendencia: "+3 esta semana", color: colors.blue, alerta: false },
  { id: "2", icono: "archive", label: "Productos con Stock Bajo", valor: "7", tendencia: "Revisar", color: colors.red, alerta: true },
  { id: "3", icono: "stats", label: "Ventas de la Semana", valor: "$4,850", tendencia: "↑ 8.2%", color: colors.green, alerta: false },
  { id: "4", icono: "people", label: "Técnicos Activos", valor: "8", tendencia: "Disponibles", color: colors.green, alerta: false },
];

/* ============================================================
   TALLER / ÓRDENES DE SERVICIO
   Columnas web: ID orden · Estado · Cliente · Equipo · Modelo · Fecha ingreso
   KPIs web: Pendientes · Asignadas · Reparadas
   ============================================================ */

export type Orden = {
  id: string;
  cliente: string;
  equipo: string;
  modelo: string;
  fechaIngreso: string;
  estado: EstadoOrden;
};

export const ordenes: Orden[] = [
  { id: "OS-0142", cliente: "María González", equipo: "iPhone 13", modelo: "A2633 · 128GB", fechaIngreso: "Hoy 10:30", estado: "Pendiente" },
  { id: "OS-0141", cliente: "Carlos Méndez", equipo: "Samsung S22 Ultra", modelo: "SM-S908E", fechaIngreso: "Hoy 09:15", estado: "Reparación" },
  { id: "OS-0140", cliente: "Lucía Torres", equipo: "iPad Air 4", modelo: "A2325 · 64GB", fechaIngreso: "Ayer 18:20", estado: "Revisión" },
  { id: "OS-0139", cliente: "Alejandro Ruiz", equipo: "Xiaomi 12T Pro", modelo: "22081212UG", fechaIngreso: "Ayer 16:45", estado: "Completado" },
  { id: "OS-0138", cliente: "Valeria Ramos", equipo: "iPhone 11", modelo: "A2221 · 64GB", fechaIngreso: "Ayer 14:10", estado: "Asignada" },
  { id: "OS-0137", cliente: "Jorge Morales", equipo: "Motorola Edge 30", modelo: "XT-2243", fechaIngreso: "24 Oct 11:00", estado: "Pendiente" },
];

export type DetalleOrden = {
  orden: Orden;
  telefono: string;
  equipo: string;
  imei: string;
  colorEq: string;
  ingreso: string;
  falla: string;
  accesorios: string;
  fotos: string[];
  repuestos: { nombre: string; precio: string; cantidad: number }[];
  diagnosticos: { componente: string; estado: "ok" | "fallo"; detalle: string }[];
};

export const detalleOrden: Record<string, DetalleOrden> = {
  "OS-0142": {
    orden: ordenes[0],
    telefono: "+52 55 1234 5678",
    equipo: "iPhone 13",
    imei: "3567891045",
    colorEq: "Negro medianoche",
    ingreso: "Hoy, 10:30 AM",
    falla: "No enciende la pantalla; recibió impacto en esquina inferior.",
    accesorios: "Mica de cristal + funda transparente de silicona",
    fotos: ["Frontal", "Borde d.", "Tapa tras.", "Conector"],
    repuestos: [
      { nombre: "Pantalla iPhone 13 OLED (Premium)", precio: "$1,450.00", cantidad: 1 },
      { nombre: "Adhesivo de pantalla impermeable", precio: "$120.00", cantidad: 1 },
    ],
    diagnosticos: [
      { componente: "Pantalla y digitalizador", estado: "fallo", detalle: "Sin retroiluminación ni táctil" },
      { componente: "Cámara gran angular", estado: "fallo", detalle: "Lente principal no abre en app" },
      { componente: "Estado de batería", estado: "ok", detalle: "89% capacidad máxima" },
      { componente: "Botones físicos y Face ID", estado: "ok", detalle: "Sensores biometricos intactos" },
    ],
  },
};

/* ============================================================
   INVENTARIO
   Columnas web: Imagen · Clase · Marca · Producto · Existencia · Costo venta · Estado
   KPIs web: Clases · Marcas · Productos · Piezas en stock
   ============================================================ */

export type ProductoInventario = {
  id: string;
  producto: string;
  clase: string;
  marca: string;
  existencia: number;
  costoVenta: string;
  estado: "Disponible" | "Agotado";
};

export const inventarioKpis = { clases: 8, marcas: 12, productos: 342, piezas: 1240 };

export const inventario: ProductoInventario[] = [
  { id: "1", producto: "Pantalla iPhone 13 OLED", clase: "Pantallas", marca: "Apple", existencia: 2, costoVenta: "$1,450.00", estado: "Disponible" },
  { id: "2", producto: "Mica Vidrio Templado 9D", clase: "Accesorios", marca: "Genérica", existencia: 51, costoVenta: "$120.00", estado: "Disponible" },
  { id: "3", producto: "Cable USB-C 2m", clase: "Carga", marca: "Anker", existencia: 24, costoVenta: "$250.00", estado: "Disponible" },
  { id: "4", producto: "Funda Silicone iPhone", clase: "Accesorios", marca: "Apple", existencia: 8, costoVenta: "$180.00", estado: "Disponible" },
  { id: "5", producto: "Batería Samsung S22", clase: "Repuestos", marca: "Samsung", existencia: 3, costoVenta: "$890.00", estado: "Disponible" },
  { id: "6", producto: "Cargador 20W Fast Charge", clase: "Carga", marca: "Samsung", existencia: 14, costoVenta: "$350.00", estado: "Disponible" },
];

/* ============================================================
   CLIENTES
   Columnas web: ID · Tipo · Nombre · Apellido/Razón Social · Celular · Correo · Dirección
   KPIs web: Clientes registrados · Persona Natural · Persona Jurídica
   ============================================================ */

export type Cliente = {
  id: string;
  nombre: string;
  apellido: string;
  tipo: "PN" | "PJ";
  celular: string;
  correo: string;
  direccion: string;
};

export const clientes: Cliente[] = [
  { id: "1", nombre: "María", apellido: "González", tipo: "PN", celular: "+52 55 1234 5678", correo: "maria.g@gmail.com", direccion: "Av. Insurgentes 245" },
  { id: "2", nombre: "Carlos", apellido: "Ramírez", tipo: "PN", celular: "+52 55 9876 5432", correo: "carlos.r@gmail.com", direccion: "Calle Reforma 89" },
  { id: "3", nombre: "TecnoStore MX", apellido: "S.A. de C.V.", tipo: "PJ", celular: "+52 55 4567 8901", correo: "ventas@tecnostore.mx", direccion: "Av. Principal 512" },
  { id: "4", nombre: "Luis", apellido: "Hernández", tipo: "PN", celular: "+52 55 2345 6789", correo: "luis.h@gmail.com", direccion: "Calle Hidalgo 33" },
  { id: "5", nombre: "Sofía", apellido: "Mendoza", tipo: "PN", celular: "+52 55 3456 7890", correo: "sofia.m@gmail.com", direccion: "Av. Zaragoza 1201" },
  { id: "6", nombre: "Accesorios del Centro", apellido: "S.R.L.", tipo: "PJ", celular: "+52 55 6789 0123", correo: "info@acc Centro.mx", direccion: "Calle Madero 55" },
  { id: "7", nombre: "Laura", apellido: "Díaz", tipo: "PN", celular: "+52 55 7890 1234", correo: "laura.d@gmail.com", direccion: "Av. Juárez 88" },
  { id: "8", nombre: "Jorge", apellido: "Morales", tipo: "PN", celular: "+52 55 8901 2345", correo: "jorge.m@gmail.com", direccion: "Calle Morelos 12" },
];

/* ============================================================
   EMPLEADOS
   Columnas web: Cédula · Nombre · Apellido · Cargo · Acciones
   (sin estado activo; cards: Gráfico de Cargos / Gráfico de Especialidades)
   ============================================================ */

export type Empleado = {
  id: string;
  cedula: string;
  nombre: string;
  apellido: string;
  cargo: string;
};

export const empleados: Empleado[] = [
  { id: "1", cedula: "V-18.234.567", nombre: "David", apellido: "Sánchez", cargo: "Técnico Nivel 2" },
  { id: "2", cedula: "V-17.890.123", nombre: "Paola", apellido: "Núñez", cargo: "Vendedora" },
  { id: "3", cedula: "V-19.456.789", nombre: "Raúl", apellido: "Gómez", cargo: "Técnico de Pantallas" },
  { id: "4", cedula: "V-16.234.567", nombre: "Fernanda", apellido: "Lima", cargo: "Cajera" },
  { id: "5", cedula: "V-18.567.890", nombre: "Miguel", apellido: "Torres", cargo: "Vendedor" },
  { id: "6", cedula: "V-15.890.123", nombre: "Carmen", apellido: "Ruiz", cargo: "Supervisora" },
];

/* ============================================================
   PROVEEDORES
   Columnas web: RIF · ID · Proveedor · Tipo · Teléfono · Dirección
   ============================================================ */

export type Proveedor = {
  id: string;
  rif: string;
  nombre: string;
  tipo: string;
  telefono: string;
  direccion: string;
};

export const proveedores: Proveedor[] = [
  { id: "1", rif: "J-40123456-7", nombre: "Distribuidora PhoneParts MX", tipo: "Jurídica", telefono: "+52 55 1100 2200", direccion: "Av. Insurgentes 456, Col. Centro" },
  { id: "2", rif: "J-40567890-1", nombre: "AccesoriosPro Internacional", tipo: "Jurídica", telefono: "+52 55 2200 3300", direccion: "Calle Reforma 222, Col. Juárez" },
  { id: "3", rif: "V-12345678-9", nombre: "Repuestos del Golfo", tipo: "Natural", telefono: "+52 81 4400 5500", direccion: "Av. Hidalgo 789, Monterrey" },
  { id: "4", rif: "J-40987654-3", nombre: "TechnoSupply SA de CV", tipo: "Jurídica", telefono: "+52 33 6600 7700", direccion: "Av. Vallarta 1010, Guadalajara" },
  { id: "5", rif: "V-23456789-0", nombre: "Mobile Depot MX", tipo: "Natural", telefono: "+52 55 8800 9900", direccion: "Calle Madero 55, Col. Centro" },
  { id: "6", rif: "J-40246813-5", nombre: "GamaAccesorios", tipo: "Jurídica", telefono: "+52 55 1212 3434", direccion: "Av. Juárez 88, Col. Norte" },
];

/* ============================================================
   ÓRDENES DE COMPRA
   Columnas web: ID orden · Proveedor · Fecha · Estado · Costo total
   ============================================================ */

export type Compra = {
  id: string;
  proveedor: string;
  resumen: string;
  estado: "Recibido" | "En tránsito" | "Pendiente";
  fecha: string;
  total: string;
};

export const compras: Compra[] = [
  { id: "OC-0221", proveedor: "Distribuidora PhoneParts", resumen: "12 items · Accesorios", estado: "En tránsito", fecha: "Hoy 08:40", total: "$12,450.00" },
  { id: "OC-0220", proveedor: "Repuestos del Golfo", resumen: "8 items · Repuestos", estado: "Recibido", fecha: "Ayer 17:05", total: "$8,900.00" },
  { id: "OC-0219", proveedor: "TechnoSupply SA", resumen: "5 items · Pantallas", estado: "Pendiente", fecha: "Ayer 11:30", total: "$15,200.00" },
  { id: "OC-0218", proveedor: "Mobile Depot MX", resumen: "20 items · Fundas", estado: "Recibido", fecha: "12 Nov 09:15", total: "$4,850.00" },
  { id: "OC-0217", proveedor: "GamaAccesorios", resumen: "30 items · Micas", estado: "Recibido", fecha: "11 Nov 14:50", total: "$3,800.00" },
];

/* ============================================================
   ENTREGAS
   KPIs web: Entregas registradas · Personal Delivery · Facturas pendientes
   Columnas web: ID Entrega · Factura · Delivery · Estado · Dirección · Fecha
   Personal web: Cédula · Nombre completo
   ============================================================ */

export type Entrega = {
  id: string;
  factura: string;
  delivery: string;
  estado: "En ruta" | "Entregado" | "Pendiente";
  direccion: string;
  fecha: string;
};

export const entregas: Entrega[] = [
  { id: "EN-0087", factura: "#F-0231", delivery: "Luis Hernández", estado: "En ruta", direccion: "Av. Insurgentes 245, Col. Centro", fecha: "Hoy 10:30" },
  { id: "EN-0086", factura: "#F-0230", delivery: "Pedro Sánchez", estado: "Entregado", direccion: "Calle Reforma 89, Col. Juárez", fecha: "Hoy 09:15" },
  { id: "EN-0085", factura: "#F-0229", delivery: "Jorge Morales", estado: "Pendiente", direccion: "Av. Principal 512, Col. Norte", fecha: "Hoy 11:00" },
  { id: "EN-0084", factura: "#F-0228", delivery: "Luis Hernández", estado: "En ruta", direccion: "Calle Hidalgo 33, Col. Sur", fecha: "Ayer 18:20" },
  { id: "EN-0083", factura: "#F-0227", delivery: "Pedro Sánchez", estado: "Entregado", direccion: "Av. Zaragoza 1201, Col. Oriente", fecha: "Ayer 16:45" },
];

export const deliveryPersonal = [
  { id: "1", cedula: "V-18.112.334", nombre: "Luis Hernández" },
  { id: "2", cedula: "V-17.556.677", nombre: "Pedro Sánchez" },
  { id: "3", cedula: "V-19.889.900", nombre: "Jorge Morales" },
];

/* ============================================================
   RECEPCIÓN DE ÓRDENES DE PROVEEDORES
   Web: ID orden · Proveedor · Fecha · Hora · Estado · Costo total
   Historial web: ID entrega · ID orden · Proveedor · Fecha entrega · Hora · Recibido por
   ============================================================ */

export type RecepcionOrden = {
  id: string;
  proveedor: string;
  fecha: string;
  hora: string;
  estado: "Pendiente" | "En tránsito" | "Recibido";
  costoTotal: string;
  recibidoPor?: string;
};

export const recepcionOrdenes: RecepcionOrden[] = [
  { id: "OC-0221", proveedor: "Distribuidora PhoneParts", fecha: "Hoy", hora: "16:00", estado: "En tránsito", costoTotal: "$12,450.00" },
  { id: "OC-0219", proveedor: "TechnoSupply SA", fecha: "Mañana", hora: "10:00", estado: "Pendiente", costoTotal: "$15,200.00" },
  { id: "OC-0222", proveedor: "Mobile Depot MX", fecha: "Mañana", hora: "12:30", estado: "Pendiente", costoTotal: "$4,850.00" },
  { id: "OC-0220", proveedor: "Repuestos del Golfo", fecha: "Hoy", hora: "09:15", estado: "Recibido", costoTotal: "$8,900.00", recibidoPor: "David S." },
  { id: "OC-0218", proveedor: "GamaAccesorios", fecha: "Ayer", hora: "14:50", estado: "Recibido", costoTotal: "$3,800.00", recibidoPor: "Carmen R." },
];

/* ============================================================
   USUARIOS
   Web: ID · Usuario · Cédula · Rol · Cards: Usuarios existentes / Roles creados / Módulos del sistema
   KPIs web: Usuarios · Roles · Módulos
   ============================================================ */

export type UsuarioSistema = {
  id: string;
  usuario: string;
  cedula: string;
  rol: string;
};

export const usuarios: UsuarioSistema[] = [
  { id: "1", usuario: "anthoan", cedula: "V-15.000.001", rol: "Administrador" },
  { id: "2", usuario: "paola.n", cedula: "V-16.111.222", rol: "Vendedor" },
  { id: "3", usuario: "david.s", cedula: "V-17.333.444", rol: "Técnico" },
  { id: "4", usuario: "fer.lima", cedula: "V-18.555.666", rol: "Vendedor" },
  { id: "5", usuario: "carmen.r", cedula: "V-15.777.888", rol: "Administrador" },
  { id: "6", usuario: "miguel.t", cedula: "V-19.999.000", rol: "Técnico" },
];

export const rolesSistema = [
  { id: "1", nombre: "Administrador", descripcion: "Control total del sistema" },
  { id: "2", nombre: "Vendedor", descripcion: "Ventas y catálogo" },
  { id: "3", nombre: "Técnico", descripcion: "Órdenes de servicio y taller" },
];

/* ============================================================
   CARGOS — web: ID · Nombre · Descripción (KPI: Cargos)
   ============================================================ */

export const cargos = [
  { id: "1", nombre: "Administrador", descripcion: "Control total del sistema", icono: "shield-checkmark", color: colors.yellow },
  { id: "2", nombre: "Supervisor", descripcion: "Supervisión de sucursal", icono: "star", color: colors.blue },
  { id: "3", nombre: "Técnico Nivel 2", descripcion: "Reparaciones avanzadas", icono: "construct", color: colors.green },
  { id: "4", nombre: "Vendedor", descripcion: "Atención en mostrador", icono: "pricetag", color: colors.cyan },
  { id: "5", nombre: "Cajero", descripcion: "Manejo de caja", icono: "cash", color: colors.orange },
  { id: "6", nombre: "Repartidor", descripcion: "Entregas a domicilio", icono: "car", color: colors.red },
];

/* ============================================================
   ESPECIALIDADES — web: ID · Nombre · Descripción (KPI: Especialidades)
   ============================================================ */

export const especialidades = [
  { id: "1", nombre: "Reparación de Pantallas", descripcion: "LCD, OLED y digitalizadores", icono: "build", color: colors.yellow },
  { id: "2", nombre: "Microsoldadura", descripcion: "Reparación de placa lógica", icono: "git-network", color: colors.blue },
  { id: "3", nombre: "Cambio de Baterías", descripcion: "Diagnóstico y reemplazo", icono: "battery-half", color: colors.green },
  { id: "4", nombre: "Recuperación de Datos", descripcion: "Respaldos y extracción", icono: "server", color: colors.cyan },
  { id: "5", nombre: "Desbloqueo de Equipos", descripcion: "Software y cuentas", icono: "lock-open", color: colors.orange },
  { id: "6", nombre: "Daño por Agua", descripcion: "Limpieza por ultrasonido", icono: "water", color: colors.red },
];

/* ============================================================
   BITÁCORA
   Columnas web: ID · Usuario · Acción · Módulo · Descripción · Fecha/Hora
   ============================================================ */

export type EventoBitacora = {
  id: string;
  usuario: string;
  accion: string;
  modulo: string;
  descripcion: string;
  fecha: string;
};

export const bitacora: EventoBitacora[] = [
  { id: "1", usuario: "anthoan", accion: "Inició sesión", modulo: "Autenticación", descripcion: "Acceso desde la app móvil", fecha: "Hoy 10:24:56" },
  { id: "2", usuario: "david.s", accion: "Actualizó orden", modulo: "Taller", descripcion: "Orden #OS-0142 · estado: Reparación", fecha: "Hoy 10:02:11" },
  { id: "3", usuario: "paola.n", accion: "Registró pago", modulo: "Ventas", descripcion: "Orden #OS-0142 · $850.00 en efectivo", fecha: "Hoy 09:47:38" },
  { id: "4", usuario: "anthoan", accion: "Eliminó producto", modulo: "Inventario", descripcion: "Mica Vidrio Templado 9D", fecha: "Hoy 09:15:02" },
  { id: "5", usuario: "sistema", accion: "Backup automático", modulo: "Base de Datos", descripcion: "backup_2026-11-15.sql completado", fecha: "Hoy 08:45:00" },
  { id: "6", usuario: "paola.n", accion: "Creó cliente", modulo: "Clientes", descripcion: "Ana Torres · Persona Natural", fecha: "Ayer 17:31:19" },
  { id: "7", usuario: "anthoan", accion: "Modificó permisos", modulo: "Usuarios", descripcion: "Rol Técnico · módulo Reportes", fecha: "Ayer 16:12:45" },
  { id: "8", usuario: "miguel.t", accion: "Cerró sesión", modulo: "Autenticación", descripcion: "Cierre manual de sesión", fecha: "Ayer 15:00:57" },
];

/* ============================================================
   MANTENIMIENTO DE BD
   Columnas web: ID · Usuario · Nombre · Fecha · Estado (KPI: Respaldos)
   ============================================================ */

export const backups = {
  ultima: { fecha: "Hoy 12:45 PM", hace: "hace 3 horas" },
  lista: [
    { id: "1", usuario: "sistema", nombre: "backup_2026-11-15.sql", fecha: "15 Nov 12:45", estado: "Completado" },
    { id: "2", usuario: "anthoan", nombre: "backup_2026-11-14.sql", fecha: "14 Nov 12:45", estado: "Completado" },
    { id: "3", usuario: "sistema", nombre: "backup_2026-11-13.sql", fecha: "13 Nov 12:45", estado: "Completado" },
    { id: "4", usuario: "sistema", nombre: "backup_2026-11-12.sql", fecha: "12 Nov 12:45", estado: "Completado" },
  ],
};

/* ============================================================
   TRADE-IN — COTIZACIÓN (web: Datos del equipo / Resultado estimado)
   ============================================================ */

export const tradein = {
  dispositivo: {
    nombre: "iPhone 12 64GB Azul",
    imei: "356789104523891",
    folio: "#TR-884",
    condiciones: [
      { label: "Pantalla: Bien", ok: true },
      { label: "Cámara: Regular", ok: false },
      { label: "Batería: 87%", ok: true },
    ],
  },
  valuacion: { min: "$3,200", max: "$3,800", demanda: "Alta", margen: "32%", reventa: "$5,100" },
};

/* ============================================================
   GESTIÓN TRADE-IN
   Columnas web: ID · Fecha · Cliente · Equipo · Marca · Cotización · Tests
   KPIs web: Total Trade-Ins · Total Pagado · Equipos Únicos
   ============================================================ */

export const equiposTradein = [
  { id: "TR-881", fecha: "Hoy 10:30", cliente: "Carlos Ramírez", equipo: "iPhone 11", marca: "Apple", cotizacion: "$2,900", tests: "3/5" },
  { id: "TR-880", fecha: "Hoy 09:15", cliente: "Mariana Silva", equipo: "Galaxy S21", marca: "Samsung", cotizacion: "$3,150", tests: "5/5" },
  { id: "TR-879", fecha: "Ayer 17:20", cliente: "Luis Hernández", equipo: "iPad Air 4", marca: "Apple", cotizacion: "$1,800", tests: "4/5" },
  { id: "TR-878", fecha: "Ayer 14:10", cliente: "Ana Torres", equipo: "Mi 12T", marca: "Xiaomi", cotizacion: "$2,400", tests: "2/5" },
  { id: "TR-877", fecha: "12 Nov 11:45", cliente: "Sofía Mendoza", equipo: "iPhone 12 mini", marca: "Apple", cotizacion: "$3,300", tests: "5/5" },
];

/* ============================================================
   VALIDACIÓN DE PAGOS
   Columnas web: Factura · Cliente · Fecha · Método · Referencia · Monto · Estado
   ============================================================ */

export type PagoValidar = {
  id: string;
  factura: string;
  cliente: string;
  fecha: string;
  metodo: "Efectivo" | "Transferencia" | "Tarjeta";
  referencia: string;
  monto: string;
  estado: "Pendiente" | "Validado" | "Rechazado";
};

export const pagosValidar: PagoValidar[] = [
  { id: "PG-0341", factura: "#F-0231", cliente: "María González", fecha: "Hoy 10:24", metodo: "Efectivo", referencia: "—", monto: "$850.00", estado: "Pendiente" },
  { id: "PG-0340", factura: "#F-0230", cliente: "Carlos Méndez", fecha: "Hoy 09:47", metodo: "Transferencia", referencia: "SPEI 0045…782", monto: "$1,200.00", estado: "Pendiente" },
  { id: "PG-0339", factura: "#F-0229", cliente: "Lucía Torres", fecha: "Hoy 09:12", metodo: "Tarjeta", referencia: "**** 4412", monto: "$450.00", estado: "Pendiente" },
  { id: "PG-0338", factura: "#F-0228", cliente: "Alejandro Ruiz", fecha: "Hoy 08:55", metodo: "Transferencia", referencia: "SPEI 0044…129", monto: "$2,100.00", estado: "Validado" },
  { id: "PG-0337", factura: "#F-0227", cliente: "Valeria Ramos", fecha: "Ayer 18:31", metodo: "Efectivo", referencia: "—", monto: "$320.00", estado: "Rechazado" },
];

/* ============================================================
   VENTAS / CATÁLOGO
   Web: "NUESTROS PRODUCTOS" · Categorías: Teléfonos / Accesorios / Repuestos / Protección iPhone
   ============================================================ */

export type ProductoCatalogo = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: "Teléfonos" | "Accesorios" | "Repuestos" | "Protección iPhone";
  precio: string;
  icono: "phone" | "shield" | "cable" | "flash" | "circle" | "headset";
};

export const catalogo: ProductoCatalogo[] = [
  { id: "1", nombre: "iPhone 13 128GB", descripcion: "Reacondicionado · Batería 89%", categoria: "Teléfonos", precio: "$8,900.00", icono: "phone" },
  { id: "2", nombre: "Galaxy S22 128GB", descripcion: "Seminuevo con garantía", categoria: "Teléfonos", precio: "$7,200.00", icono: "phone" },
  { id: "3", nombre: "Mica Vidrio 9H", descripcion: "Borde curvo 2.5D", categoria: "Protección iPhone", precio: "$120.00", icono: "shield" },
  { id: "4", nombre: "Funda Silicone iPhone 13", descripcion: "Original Matte Touch", categoria: "Protección iPhone", precio: "$250.00", icono: "phone" },
  { id: "5", nombre: "Cable USB-C 2m", descripcion: "Carga rápida 60W", categoria: "Accesorios", precio: "$180.00", icono: "cable" },
  { id: "6", nombre: "Cargador 20W", descripcion: "Power Delivery Type-C", categoria: "Accesorios", precio: "$350.00", icono: "flash" },
  { id: "7", nombre: "Pantalla iPhone 12 OLED", descripcion: "Original con instalación", categoria: "Repuestos", precio: "$1,350.00", icono: "phone" },
  { id: "8", nombre: "Batería Samsung S22", descripcion: "Con instalación incluida", categoria: "Repuestos", precio: "$890.00", icono: "flash" },
];

/* ============================================================
   REPORTES
   Web: "Ventas Locales Registradas" — Factura · Cliente · Fecha · Método · Monto · Estado
   ============================================================ */

export const ventasLocales = [
  { id: "1", factura: "#F-0231", cliente: "María González", fecha: "Hoy 10:24", metodo: "Efectivo", monto: "$850.00", estado: "Validado" },
  { id: "2", factura: "#F-0230", cliente: "Carlos Méndez", fecha: "Hoy 09:47", metodo: "Transferencia", monto: "$1,200.00", estado: "Validado" },
  { id: "3", factura: "#F-0229", cliente: "Lucía Torres", fecha: "Hoy 09:12", metodo: "Tarjeta", monto: "$450.00", estado: "Pendiente" },
  { id: "4", factura: "#F-0228", cliente: "Alejandro Ruiz", fecha: "Hoy 08:55", metodo: "Transferencia", monto: "$2,100.00", estado: "Validado" },
];

/* ============================================================
   REPORTES DE VENTAS
   Web: KPIs + gráfico + Top productos + "Ventas Locales Registradas"
   ============================================================ */

export const reportes = {
  kpis: ([
    { id: "1", label: "Ingresos", valor: "$45,200", color: colors.yellow, trend: "+12.4%", extra: "vs. $40,210 anterior" },
    { id: "2", label: "Ventas", valor: "128", color: colors.text, trend: "+8.1%", extra: "Órdenes · 94% OK" },
    { id: "3", label: "Ticket Prom.", valor: "$353", color: colors.blue, trend: "Prom.", extra: "+3 items x venta" },
    { id: "4", label: "Meta Mensual", valor: "86%", color: colors.yellow, progress: 0.86, extra: "Obj. $52.5k · faltan 7 días" },
  ]) as ({ id: string; label: string; valor: string; color: string; trend: string; extra: string; progress?: number })[],
  dias: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
  ingresos: [55, 68, 75, 62, 82, 95, 48],
  gastos: [28, 34, 40, 26, 42, 45, 22],
  topProductos: [
    { nombre: "Funda iPhone 13 Silicone", vendidos: 34 },
    { nombre: "Mica Vidrio 9D Completo", vendidos: 28 },
    { nombre: "Cable USB-C a Lightning 2m", vendidos: 22 },
    { nombre: "Cargador Rápido 20W USB-C", vendidos: 15 },
    { nombre: "Pop Socket Magnético Metálico", vendidos: 11 },
  ],
};

/* ============================================================
   COBRO POS / NOTIFICACIONES / PERFIL
   ============================================================ */

export const carritoDemo = [
  { id: "1", nombre: "Funda iPhone 13 Silicone", cantidad: 1, precio: 250 },
  { id: "2", nombre: "Mica Vidrio 9H Pro", cantidad: 1, precio: 120 },
  { id: "3", nombre: "Cable USB-C Reforzado 2m", cantidad: 1, precio: 180 },
  { id: "4", nombre: "Cargador 20W Power Adapter", cantidad: 1, precio: 690 },
];

export type Notificacion = {
  id: string;
  titulo: string;
  detalle: string;
  hora: string;
  tipo: "info" | "exito" | "alerta" | "error";
  leida: boolean;
};

export const notificaciones: Notificacion[] = [
  { id: "1", titulo: "Nueva orden #OS-0142", detalle: "María González · iPhone 13 · Pantalla", hora: "hace 5 min", tipo: "info", leida: false },
  { id: "2", titulo: "Pago recibido $850.00", detalle: "Orden #OS-0142 · Efectivo en caja", hora: "hace 12 min", tipo: "exito", leida: false },
  { id: "3", titulo: "Stock bajo", detalle: "Pantalla iPhone 12 · quedan 2 piezas", hora: "hace 40 min", tipo: "alerta", leida: false },
  { id: "4", titulo: "Reparación completada", detalle: "Orden #OS-0139 · Alejandro Ruiz", hora: "hace 1 h", tipo: "exito", leida: true },
  { id: "5", titulo: "Entrega en ruta", detalle: "#EN-0087 · María González · Luis H.", hora: "hace 2 h", tipo: "info", leida: true },
  { id: "6", titulo: "Pago rechazado", detalle: "Orden #OS-0138 · $320.00 · verificar datos", hora: "ayer 18:35", tipo: "error", leida: true },
  { id: "7", titulo: "Backup completado", detalle: "backup_2026-11-15.sql · 4.8 MB", hora: "ayer 12:45", tipo: "info", leida: true },
];

export const perfil = {
  nombre: "Anthoan Gonzalez",
  email: "anthoan@ituaccesorio.com",
  telefono: "+52 55 1234 5678",
  sucursal: "Centro",
  rol: "Administrador",
};

/* ============================================================
   MENÚ (21 módulos del rol Admin, como el navbar web)
   ============================================================ */

export type ModuloMenu = {
  seccion: string;
  items: { nombre: string; icono: string; color: string }[];
};

export const menuModulos: ModuloMenu[] = [
  {
    seccion: "OPERACIÓN",
    items: [
      { nombre: "Taller", icono: "build", color: colors.yellow },
      { nombre: "Órdenes de Compra", icono: "cart", color: colors.blue },
      { nombre: "Entregas", icono: "car", color: colors.green },
      { nombre: "Proveedores", icono: "grid", color: colors.cyan },
    ],
  },
  {
    seccion: "GESTIÓN",
    items: [
      { nombre: "Empleados", icono: "people", color: colors.green },
      { nombre: "Especialidades", icono: "school", color: colors.cyan },
      { nombre: "Cargos", icono: "id-card", color: colors.blue },
      { nombre: "Usuarios", icono: "person", color: colors.blue },
      { nombre: "Reportes de Ventas", icono: "stats", color: colors.yellow },
      { nombre: "Trade-in", icono: "swap", color: colors.orange },
      { nombre: "Gestión Trade-in", icono: "repeat", color: colors.orange },
      { nombre: "Validación de Pagos", icono: "cash", color: colors.yellow },
      { nombre: "Clientes", icono: "folder", color: colors.blue },
      { nombre: "Productos", icono: "archive", color: colors.green },
    ],
  },
  {
    seccion: "SISTEMA",
    items: [
      { nombre: "Bitácora", icono: "document", color: colors.gray },
      { nombre: "Mantenimiento de BD", icono: "server", color: colors.red },
    ],
  },
];

/** Credenciales de demostración (solo estético). */
export const ADMIN_USER = "Admin";
export const ADMIN_PASSWORD = "Admin1234";
