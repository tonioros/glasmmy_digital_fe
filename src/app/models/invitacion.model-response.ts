export interface InvitacionModelResponse {
  access_token?: string;
  cantidad_invitados: number;
  confirmado: number;
  created_at?: string;
  fecha_confirmacion?: string;
  fecha_evento?: string;
  fecha_limite_confirmo?: string;
  id: number;
  invitacion_id: number;
  invitado_id: number;
  lugar_evento?: string;
  mesa_asignada?: string;
  nombre?: string;
  total_personas_conf: number;
  updated_at?: string;
  url_lugar_evento?: string;
}
