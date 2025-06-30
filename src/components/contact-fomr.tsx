export default function ContactForm() {
  return (
    <form
      action="#contactar"
      method="POST"
      className="bg-white rounded-xl shadow-lg p-8 max-w-lg mx-auto flex flex-col gap-6 border border-gray-100 w-full md:w-1/2"
    >
      <h2 className="text-2xl font-bold text-[color:var(---color-primary)] mb-2">
        Contáctanos
      </h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="nombre" className="font-semibold text-gray-700">
          Nombre completo *
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          placeholder="Tu nombre"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(---color-primary)]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold text-gray-700">
          Correo electrónico *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="tucorreo@email.com"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(---color-primary)]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="telefono" className="font-semibold text-gray-700">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          pattern="[0-9]{10,15}"
          placeholder="Opcional"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(---color-primary)]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="mensaje" className="font-semibold text-gray-700">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          placeholder="¿En qué podemos ayudarte?"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(---color-primary)] resize-none min-h-[100px]"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-secondary/85 hover:bg-secondary text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Enviar mensaje
      </button>

      <button
        type="reset"
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Limpiar
      </button>
    </form>
  )
}
