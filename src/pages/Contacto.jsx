import './Contacto.css';

export default function Contacto() {
  return (
    <div className="contacto">
      <h1>Contacto</h1>
      <p>Podés escribirnos a: contacto@HumanOs.com</p>
      <form className="formulario-contacto">
        <label htmlFor="nombre">Nombre
          <input id="nombre" type="text" name="nombre" required />
        </label>
        <label htmlFor="email">Email
          <input id="email" type="email" name="email" required />
        </label>
        <label htmlFor="mensaje">Mensaje
          <textarea id="mensaje" name="mensaje" required></textarea>
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
  