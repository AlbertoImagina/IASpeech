import axios from "axios"

const token = import.meta.env.VITE_TOKEN_APP;

const apiUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const enviarVoz = async ({ pregunta, guiaCorreccion, archivo, dificultad }: { pregunta: string; guiaCorreccion: string; archivo: File; dificultad: number }) => {
  const formData = new FormData()
  formData.append("pregunta", pregunta)
  formData.append("guiaCorreccion", guiaCorreccion)
  formData.append("audio", archivo)
  formData.append("dificultad", dificultad.toString())

  try {
    const { data } = await apiUrl.post(
      "/corrigePreguntaAudio",
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