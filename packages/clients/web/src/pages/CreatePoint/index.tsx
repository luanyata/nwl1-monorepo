import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './style.css'
import logo from '../../assets/logo.svg'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'


const CreatePoint: React.FC = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>
      <form >
        <h1>Cadastro do <br /> ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <MapContainer center={[-27.5806396, -48.5087219]} zoom={15} >
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[-27.5806396, -48.5087219]} />
          </MapContainer>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
              >
                <option value="">Selecione</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
              >
                <option value="">Selecione</option>
              </select>
            </div>

          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
              <span>Lâmpada</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
              <span>Lâmpada</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
              <span>Lâmpada</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
              <span>Lâmpada</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
              <span>Lâmpada</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
              <span>Lâmpada</span>
            </li>
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  )
}


export default CreatePoint
