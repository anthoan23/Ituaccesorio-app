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
      { nombre: "Usuarios", icono: "person", color: colors.blue },
      { nombre: "Reportes de Ventas", icono: "stats", color: colors.yellow },
      { nombre: "Trade-in", icono: "swap", color: colors.orange },
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
