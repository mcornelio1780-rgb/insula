/* ============================================================
   INSULA · CONFIGURACIÓN DE LA WEB
   Este es el ÚNICO archivo que necesitas editar.
   En GitHub: abre config.js → ícono del lápiz → cambia → "Commit changes".
   Vercel vuelve a publicar la web sola en ~1 minuto.
   Todo lo que esté vacío ("") simplemente no se usa: la web sigue funcionando.
   ============================================================ */
window.INSULA_CONFIG = {

  // Correo que aparece en la web y que recibe los mensajes si no hay otra opción configurada
  contactEmail: "manyosa@limly.io",

  // Enlace de tu agenda (Cal.com gratis). Ej: "https://cal.com/manyosa/demo-15"
  // Vacío = el botón "Elegir horario" lleva al formulario.
  calLink: "",

  // Enlaces de checkout de Polar. Vacíos = los botones de compra llevan al formulario de contacto.
  // En Polar, usa como "Success URL":  https://TU-PROYECTO.vercel.app/gracias?checkout_id={CHECKOUT_ID}
  polar: {
    starter: "",   // Insula Starter · $490 pago único
    pro: ""        // Insula Pro · $299/mes
  },

  // GUARDAR LEADS (elige una o varias; todas son gratis)
  // 1) Google Sheets: pega la URL del Apps Script (ver google-sheets-apps-script.gs). Los leads llegan a tu hoja.
  googleSheetsUrl: "",
  // 2) Web3Forms: te envía cada lead a tu correo. Crea la clave gratis en https://web3forms.com con manyosa@limly.io
  web3formsKey: "",
  // 3) Supabase (opcional, si algún día lo usas)
  supabase: { url: "", anonKey: "", table: "leads" }
};
