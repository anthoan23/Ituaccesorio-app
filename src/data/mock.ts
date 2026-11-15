/**
 * Datos de ejemplo (mock) — la app es 100 % visual, sin conexión al backend.
 */
import { colors } from "@/constants/theme";

export type EstadoOrden =
  | "Pendiente"
  | "Revisión"
  | "Reparación"
  | "Completado"
  | "Asignada"
  | "Entregado";

export type Orden = {
  id: string;
  cliente: string;
  dispositivo: string;
  detalle: string;
  estado: EstadoOrden;
  fecha: string;
  total: string;
  nota?: string;
};

export type ProductoInventario = {
  id: string;
  nombre: string;
  sku: string;
  categoria: string;
  precio: string;
  stock: number;
};

export type ProductoCatalogo = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: string;
  icono: "phone" | "shield" | "cable" | "flash" | "circle" | "headset";
};

export type Cliente = {
  id: string;
  nombre: string;
  telefono: string;
  ordenes: number;
  vip: boolean;
};

export const kpis = [
  { id: "1", label: "Ventas Hoy", valor: "$12,450", color: colors.yellow, trend: "+12.5%", trendUp: true },
  { id: "2", label: "Órdenes Activas", valor: "8", color: colors.blue, trend: "+8.3%", trendUp: true },
  { id: "3", label: "Equipos Reparados", valor: "23", color: colors.green, trend: "+5.2%", trendUp: true },
  { id: "4", label: "Ingresos Mes", valor: "$8,200", color: colors.red, trend: "-2.1%", trendUp: false },
];

export const actividad = [
  { id: "1", texto: "Nueva orden #OS-0142", hora: "hace 5 min", estado: "Asignada", icono: "clipboard", color: colors.blue },
  { id: "2", texto: "Reparación completada", hora: "hace 20 min", estado: "Completado", icono: "checkmark", color: colors.green },
  { id: "3", texto: "Pago recibido · $850.00", hora: "hace 1 h", estado: "Aprobado", icono: "cash", color: colors.yellow },
  { id: "4", texto: "Stock bajo: Pantalla iPhone 12", hora: "hace 2 h", estado: "Alerta", icono: "warning", color: colors.red },
];

export const ordenes: Orden[] = [
  { id: "OS-0142", cliente: "María González", dispositivo: "iPhone 13", detalle: "Pantalla", estado: "Pendiente", fecha: "Hoy 10:30", total: "$1,850.00", nota: "Taller Central" },
  { id: "OS-0141", cliente: "Carlos Méndez", dispositivo: "Samsung S22 Ultra", detalle: "Batería", estado: "Reparación", fecha: "Hoy 09:15", total: "$1,200.00", nota: "Mesa 2" },
  { id: "OS-0140", cliente: "Lucía Torres", dispositivo: "iPad Air 4", detalle: "Conector de carga", estado: "Revisión", fecha: "Ayer 18:20", total: "$950.00", nota: "Diagnóstico" },
  { id: "OS-0139", cliente: "Alejandro Ruiz", dispositivo: "Xiaomi 12T Pro", detalle: "Cámara", estado: "Completado", fecha: "Ayer 16:45", total: "$2,100.00", nota: "Listo para entrega" },
  { id: "OS-0138", cliente: "Valeria Ramos", dispositivo: "iPhone 11", detalle: "Tapa trasera", estado: "Asignada", fecha: "Ayer 14:10", total: "$850.00", nota: "Técnico: David S." },
  { id: "OS-0137", cliente: "Jorge Morales", dispositivo: "Motorola Edge 30", detalle: "Diagnóstico", estado: "Pendiente", fecha: "24 Oct 11:00", total: "$450.00", nota: "Por revisar" },
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

export const inventario: ProductoInventario[] = [
  { id: "1", nombre: "Pantalla iPhone 13 OLED", sku: "P-IP13", categoria: "Repuestos", precio: "$1,450.00", stock: 2 },
  { id: "2", nombre: "Mica Vidrio Templado 9D", sku: "M-GEN", categoria: "Accesorios", precio: "$120.00", stock: 51 },
  { id: "3", nombre: "Cable USB-C 2m", sku: "C-USBC", categoria: "Carga", precio: "$250.00", stock: 24 },
  { id: "4", nombre: "Funda Silicone Case iPhone", sku: "F-SIL", categoria: "Fundas", precio: "$180.00", stock: 8 },
  { id: "5", nombre: "Batería Samsung S22 Ultra", sku: "B-S22", categoria: "Repuestos", precio: "$890.00", stock: 3 },
  { id: "6", nombre: "Cargador 20W Fast Charge", sku: "CH-20W", categoria: "Carga", precio: "$350.00", stock: 14 },
];

export const catalogo: ProductoCatalogo[] = [
  { id: "1", nombre: "Funda iPhone 13 Silicone", descripcion: "Original Matte Touch", categoria: "Fundas", precio: "$250.00", icono: "phone" },
  { id: "2", nombre: "Mica Vidrio 9H", descripcion: "Borde curvo 2.5D", categoria: "Micas", precio: "$120.00", icono: "shield" },
  { id: "3", nombre: "Cable USB-C 2m", descripcion: "Carga rápida 60W", categoria: "Cables", precio: "$180.00", icono: "cable" },
  { id: "4", nombre: "Cargador 20W", descripcion: "Power Delivery Type-C", categoria: "Cargadores", precio: "$350.00", icono: "flash" },
  { id: "5", nombre: "Pop Socket", descripcion: "Soporte y agarre 360°", categoria: "Accesorios", precio: "$90.00", icono: "circle" },
  { id: "6", nombre: "Audífonos BT", descripcion: "TWS Wireless v5.3", categoria: "Audio", precio: "$450.00", icono: "headset" },
];

export const clientes: Cliente[] = [
  { id: "1", nombre: "María González", telefono: "+52 55 1234 5678", ordenes: 4, vip: true },
  { id: "2", nombre: "Carlos Ramírez", telefono: "+52 55 9876 5432", ordenes: 2, vip: false },
  { id: "3", nombre: "Ana Torres", telefono: "+52 55 4567 8901", ordenes: 5, vip: true },
  { id: "4", nombre: "Luis Hernández", telefono: "+52 55 2345 6789", ordenes: 1, vip: false },
  { id: "5", nombre: "Sofía Mendoza", telefono: "+52 55 3456 7890", ordenes: 3, vip: false },
  { id: "6", nombre: "Pedro Sánchez", telefono: "+52 55 6789 0123", ordenes: 1, vip: false },
  { id: "7", nombre: "Laura Díaz", telefono: "+52 55 7890 1234", ordenes: 2, vip: false },
  { id: "8", nombre: "Jorge Morales", telefono: "+52 55 8901 2345", ordenes: 0, vip: false },
];

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

/* ============================================================
   DATOS NUEVOS — Compras, Proveedores, Empleados, Usuarios,
   Reportes, Trade-in, Bitácora, BD y Cobro POS
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

export const proveedores = [
  { id: "1", nombre: "Distribuidora PhoneParts MX", contacto: "Jorge Villalba", telefono: "+52 55 1100 2200", productos: 12, preferido: true, inicial: "D", color: colors.yellow, categoria: "Accesorios" },
  { id: "2", nombre: "AccesoriosPro Internacional", contacto: "Ana Beltrán", telefono: "+52 55 2200 3300", productos: 24, preferido: false, inicial: "A", color: colors.blue, categoria: "Accesorios" },
  { id: "3", nombre: "Repuestos del Golfo", contacto: "Miguel Cázares", telefono: "+52 81 4400 5500", productos: 9, preferido: false, inicial: "R", color: colors.green, categoria: "Refacciones" },
  { id: "4", nombre: "TechnoSupply SA de CV", contacto: "Lucía Ferrer", telefono: "+52 33 6600 7700", productos: 7, preferido: true, inicial: "T", color: colors.cyan, categoria: "Refacciones" },
  { id: "5", nombre: "Mobile Depot MX", contacto: "Diego Ocampo", telefono: "+52 55 8800 9900", productos: 18, preferido: false, inicial: "M", color: colors.orange, categoria: "Mayoreo" },
  { id: "6", nombre: "GamaAccesorios", contacto: "Sara Leal", telefono: "+52 55 1212 3434", productos: 30, preferido: false, inicial: "G", color: colors.red, categoria: "Mayoreo" },
];

export const empleados = [
  { id: "1", nombre: "David Sánchez", cargo: "Técnico Nivel 2", tipo: "Tecnico", especialidades: ["iPhone", "Samsung"], disponible: true },
  { id: "2", nombre: "Paola Núñez", cargo: "Vendedora", tipo: "Vendedor", especialidades: ["Ventas"], disponible: true },
  { id: "3", nombre: "Raúl Gómez", cargo: "Técnico Pantallas", tipo: "Tecnico", especialidades: ["iPhone", "iPad"], disponible: false },
  { id: "4", nombre: "Fernanda Lima", cargo: "Cajera", tipo: "Vendedor", especialidades: ["Caja"], disponible: true },
  { id: "5", nombre: "Miguel Torres", cargo: "Vendedor", tipo: "Vendedor", especialidades: ["Trade-in"], disponible: true },
  { id: "6", nombre: "Carmen Ruiz", cargo: "Supervisora", tipo: "Admin", especialidades: ["Sucursal"], disponible: true },
];

export const usuarios = [
  { id: "1", nombre: "Anthoan Gonzalez", email: "anthoan@ituaccesorio.com", rol: "Administrador", acceso: "hoy 09:12", activo: true, color: colors.yellow },
  { id: "2", nombre: "Paola Núñez", email: "paola@ituaccesorio.com", rol: "Vendedor", acceso: "hoy 09:40", activo: true, color: colors.blue },
  { id: "3", nombre: "David Sánchez", email: "david@ituaccesorio.com", rol: "Técnico", acceso: "hoy 08:05", activo: true, color: colors.green },
  { id: "4", nombre: "Fernanda Lima", email: "fer@ituaccesorio.com", rol: "Vendedor", acceso: "ayer 18:22", activo: true, color: colors.blue },
  { id: "5", nombre: "Carmen Ruiz", email: "carmen@ituaccesorio.com", rol: "Administrador", acceso: "ayer 16:50", activo: false, color: colors.yellow },
  { id: "6", nombre: "Miguel Torres", email: "miguel@ituaccesorio.com", rol: "Técnico", acceso: "ayer 15:03", activo: true, color: colors.green },
];

export const permisosSistema = [
  { id: "1", nombre: "Gestión de ventas", activo: true },
  { id: "2", nombre: "Editar inventario", activo: true },
  { id: "3", nombre: "Ver reportes", activo: false },
  { id: "4", nombre: "Administrar usuarios", activo: false },
];

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
  equipos: [
    { id: "TR-881", dispositivo: "iPhone 11 128GB Negro", cliente: "Carlos Ramírez", inicial: "CR", color: colors.yellow, oferta: "$2,900", estado: "Pendiente" as const },
    { id: "TR-880", dispositivo: "Samsung S21 128GB Gris", cliente: "Mariana Silva", inicial: "MS", color: colors.blue, oferta: "$3,150", estado: "Revisión" as const },
    { id: "TR-879", dispositivo: "Xiaomi 12T 256GB Azul", cliente: "Luis Hernández", inicial: "LH", color: colors.green, oferta: "$2,400", estado: "Completado" as const },
  ],
};

export const bitacora = [
  { id: "1", accion: "Inició sesión", usuario: "Anthoan", hora: "Hoy 10:24:56", tipo: "Acceso", color: colors.green, icono: "log-in" },
  { id: "2", accion: "Actualizó orden #OS-0142", usuario: "David S.", hora: "Hoy 10:02:11", tipo: "Cambios", color: colors.blue, icono: "create" },
  { id: "3", accion: "Registró pago $850.00", usuario: "Paola N.", hora: "Hoy 09:47:38", tipo: "Cambios", color: colors.blue, icono: "cash" },
  { id: "4", accion: "Eliminó producto SKU M-GEN", usuario: "Anthoan", hora: "Hoy 09:15:02", tipo: "Cambios", color: colors.red, icono: "trash" },
  { id: "5", accion: "Backup automático completado", usuario: "Sistema", hora: "Hoy 08:45:00", tipo: "Sistema", color: colors.yellow, icono: "server" },
  { id: "6", accion: "Creó cliente Ana Torres", usuario: "Paola N.", hora: "Ayer 17:31:19", tipo: "Cambios", color: colors.blue, icono: "person-add" },
  { id: "7", accion: "Modificó permisos de usuario", usuario: "Anthoan", hora: "Ayer 16:12:45", tipo: "Sistema", color: colors.yellow, icono: "settings" },
  { id: "8", accion: "Cerró sesión", usuario: "Miguel T.", hora: "Ayer 15:00:57", tipo: "Acceso", color: colors.gray, icono: "log-out" },
];

export const backups = {
  ultima: { fecha: "Hoy 12:45 PM", hace: "hace 3 horas", tamaño: "4.8 MB" },
  lista: [
    { nombre: "backup_2026-11-14.sql", fecha: "14 Nov 12:45", tamaño: "4.8 MB" },
    { nombre: "backup_2026-11-13.sql", fecha: "13 Nov 12:45", tamaño: "4.7 MB" },
    { nombre: "backup_2026-11-12.sql", fecha: "12 Nov 12:45", tamaño: "4.7 MB" },
    { nombre: "backup_2026-11-11.sql", fecha: "11 Nov 12:45", tamaño: "4.6 MB" },
  ],
  stats: { registros: "12,480", esquemas: "8", tablas: "34" },
};

export const carritoDemo = [
  { id: "1", nombre: "Funda iPhone 13 Silicone", cantidad: 1, precio: 250 },
  { id: "2", nombre: "Mica Vidrio 9H Pro", cantidad: 1, precio: 120 },
  { id: "3", nombre: "Cable USB-C Reforzado 2m", cantidad: 1, precio: 180 },
  { id: "4", nombre: "Cargador 20W Power Adapter", cantidad: 1, precio: 690 },
];

/* ============================================================
   MÓDULOS FALTANTES — Entregas, Gestión Trade-in, Validación,
   Especialidades y Cargos
   ============================================================ */

export type Entrega = {
  id: string;
  cliente: string;
  direccion: string;
  estado: "En ruta" | "Entregado" | "Pendiente";
  hora: string;
  monto: string;
};

export const entregas: Entrega[] = [
  { id: "EN-0087", cliente: "María González", direccion: "Av. Insurgentes 245, Col. Centro", estado: "En ruta", hora: "10:30 - 11:00", monto: "$250.00" },
  { id: "EN-0086", cliente: "Carlos Ramírez", direccion: "Calle Reforma 89, Col. Juárez", estado: "Entregado", hora: "09:15 - 09:45", monto: "$180.00" },
  { id: "EN-0085", cliente: "Ana Torres", direccion: "Av. Principal 512, Col. Norte", estado: "Pendiente", hora: "11:00 - 11:30", monto: "$450.00" },
  { id: "EN-0084", cliente: "Luis Hernández", direccion: "Calle Hidalgo 33, Col. Sur", estado: "En ruta", hora: "11:30 - 12:00", monto: "$120.00" },
  { id: "EN-0083", cliente: "Sofía Mendoza", direccion: "Av. Zaragoza 1201, Col. Oriente", estado: "Entregado", hora: "08:40 - 09:10", monto: "$350.00" },
];

export const deliveryPersonal = [
  { id: "1", nombre: "Luis Hernández", disponible: true },
  { id: "2", nombre: "Pedro Sánchez", disponible: false },
  { id: "3", nombre: "Jorge Morales", disponible: true },
];

export const equiposTradein = [
  { id: "TR-881", dispositivo: "iPhone 11 128GB", cliente: "Carlos Ramírez", imei: "3567…810", pagado: "$2,900", estado: "Pendiente" as const },
  { id: "TR-880", dispositivo: "Samsung S21 128GB", cliente: "Mariana Silva", imei: "3519…402", pagado: "$3,150", estado: "Revisión" as const },
  { id: "TR-879", dispositivo: "iPad Air 4 64GB", cliente: "Luis Hernández", imei: "3532…227", pagado: "$1,800", estado: "Completado" as const },
  { id: "TR-878", dispositivo: "Xiaomi 12T 256GB", cliente: "Ana Torres", imei: "8642…915", pagado: "$2,400", estado: "Completado" as const },
  { id: "TR-877", dispositivo: "iPhone 12 mini", cliente: "Sofía Mendoza", imei: "3568…134", pagado: "$3,300", estado: "Revisión" as const },
];

export type PagoValidar = {
  id: string;
  monto: string;
  cliente: string;
  orden: string;
  metodo: "Efectivo" | "Transferencia" | "Tarjeta";
  fecha: string;
  hora: string;
  estado: "Pendiente" | "Validado" | "Rechazado";
};

export const pagosValidar: PagoValidar[] = [
  { id: "PG-0341", monto: "$850.00", cliente: "María González", orden: "#OS-0142", metodo: "Efectivo", fecha: "Hoy", hora: "10:24", estado: "Pendiente" },
  { id: "PG-0340", monto: "$1,200.00", cliente: "Carlos Méndez", orden: "#OS-0141", metodo: "Transferencia", fecha: "Hoy", hora: "09:47", estado: "Pendiente" },
  { id: "PG-0339", monto: "$450.00", cliente: "Lucía Torres", orden: "#OS-0140", metodo: "Tarjeta", fecha: "Hoy", hora: "09:12", estado: "Pendiente" },
  { id: "PG-0338", monto: "$2,100.00", cliente: "Alejandro Ruiz", orden: "#OS-0139", metodo: "Transferencia", fecha: "Hoy", hora: "08:55", estado: "Validado" },
  { id: "PG-0337", monto: "$320.00", cliente: "Valeria Ramos", orden: "#OS-0138", metodo: "Efectivo", fecha: "Ayer", hora: "18:31", estado: "Rechazado" },
];

export const especialidades = [
  { id: "1", nombre: "Reparación de Pantallas", descripcion: "LCD, OLED y digitalizadores", icono: "build", color: colors.yellow, tecnicos: 4 },
  { id: "2", nombre: "Microsoldadura", descripcion: "Reparación de placa lógica", icono: "git-network", color: colors.blue, tecnicos: 2 },
  { id: "3", nombre: "Cambio de Baterías", descripcion: "Diagnóstico y reemplazo", icono: "battery-half", color: colors.green, tecnicos: 3 },
  { id: "4", nombre: "Recuperación de Datos", descripcion: "Respaldos y extracción", icono: "server", color: colors.cyan, tecnicos: 1 },
  { id: "5", nombre: "Desbloqueo de Equipos", descripcion: "Software y cuentas", icono: "lock-open", color: colors.orange, tecnicos: 2 },
  { id: "6", nombre: "Daño por Agua", descripcion: "Limpieza por ultrasonido", icono: "water", color: colors.red, tecnicos: 1 },
];

export const cargos = [
  { id: "1", nombre: "Administrador", descripcion: "Control total del sistema", icono: "shield-checkmark", color: colors.yellow, activos: 1 },
  { id: "2", nombre: "Supervisor", descripcion: "Supervisión de sucursal", icono: "star", color: colors.blue, activos: 1 },
  { id: "3", nombre: "Técnico Nivel 2", descripcion: "Reparaciones avanzadas", icono: "construct", color: colors.green, activos: 3 },
  { id: "4", nombre: "Vendedor", descripcion: "Atención en mostrador", icono: "pricetag", color: colors.cyan, activos: 2 },
  { id: "5", nombre: "Cajero", descripcion: "Manejo de caja", icono: "cash", color: colors.orange, activos: 2 },
  { id: "6", nombre: "Repartidor", descripcion: "Entregas a domicilio", icono: "car", color: colors.red, activos: 1 },
];

/** Credenciales de demostración (solo estético). */
export const ADMIN_USER = "Admin";
export const ADMIN_PASSWORD = "Admin1234";
