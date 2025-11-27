export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function apiGet(path: string) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
        // ✔ Não envia TOKEN — endpoints agora são públicos
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Erro da API:", res.status, errorText);
      throw new Error("Erro na API");
    }

    return await res.json();

  } catch (error) {
    console.error("Erro no fetch:", error);
    throw error;
  }
}
