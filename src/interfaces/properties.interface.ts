
export interface PropertyFilter {
  operacion?: string;
  tipo?: string;
  dormitorios?: number;
  precio?: number;
  ubicacion?: string;
  q?: string;
  page?: number;
  limit?: number;
}

export interface Property {
  precio: number;
  tipo: string;
  operacion: string;
  dormitorios: number;
  banios: number;
  superficie: number;
  imagenUrl?: string;
  inversion: boolean;
  direccion: {
    calle: string;
    altura: number;
    provincia: string;
  };
}

export const FILTER_OPTIONS = {
  tipos: [
    { value: 'casa', label: 'Casa' },
    { value: 'departamento', label: 'Departamento' },
    { value: 'terreno', label: 'Terreno' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'complejo', label: 'Complejo' },
  ],
  ambientes: [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
  ],
  precios: [
    { value: 75000, label: 'Hasta $75.000' },
    { value: 100000, label: 'Hasta $100.000' },
    { value: 150000, label: 'Hasta $150.000' },
    { value: 200000, label: 'Hasta $200.000' },
    { value: 250000, label: 'Hasta $250.000' },
    { value: 300000, label: 'Hasta $300.000' },
    { value: null, label: 'Sin límite' },
  ],
};
