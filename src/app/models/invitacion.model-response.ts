export interface InvitacionModelResponse {
  "id": number,
  "nombre": string,
  base_url: string,
  "fecha_evento": string,
  "lugar_evento": string,
  "url_lugar_evento": string,
  "invitados": InvitadoModelResponse[]
}
export interface InvitadoModelResponse     {
  "nombre": string,
  "cantidad_invitados": number,
  "access_token": string,
  "invitacion_id": number,
  "mesa_asignada": string,
  "fecha_limite_confirmo": string,
  "confirmado": number,
  "fecha_confirmacion": string,
  "total_personas_conf": number,
  "id": number,
}
