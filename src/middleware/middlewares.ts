import axios from "axios"

const token = import.meta.env.VITE_TOKEN_APP;

export const enviarVoz = async ({ pregunta, guiaCorreccion, archivo, dificultad }: { pregunta: string; guiaCorreccion: string; archivo: File; dificultad: number }) => {
  const formData = new FormData()
  formData.append("pregunta", pregunta)
  formData.append("guiaCorreccion", guiaCorreccion)
  formData.append("audio", archivo)
  formData.append("dificultad", dificultad.toString())

  try {
    const { data } = await axios.post(
      "https://api-beta.proacademy.app/v1/imaginabeta/admin/ai/corrigePreguntaAudio",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }

    )
    return data
  } catch (e) {
    console.error(e)
  }
}