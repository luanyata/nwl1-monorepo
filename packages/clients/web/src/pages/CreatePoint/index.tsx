import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { api, axios } from '@nlw-1/axios';
import logo from '../../assets/logo.svg';
import Maps from '../../components/Maps';
import './style.css';
import Dropzone from '../../components/Dropzone';

interface Item {
  id: number;
  title: string;
  imageUrl: string;
}

interface UF {
  sigla: number;
  nome: string;
}

interface City {
  id: string;
  nome: string;
}

interface ICoordinates {
  lat: number;
  lng: number;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUFs] = useState<UF[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [position, setPosition] = useState<ICoordinates>({ lat: 0, lng: 0 });
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => setUFs(response.data));
  }, []);

  useEffect(() => {
    if (selectedUf === '') return;
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => setCities(response.data));
  }, [selectedUf]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelecItem = (id: number): void => {
    const alreadySelected = selectedItems.findIndex(item => item === id);
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const { email, name, whatsapp } = formData;
    const city = selectedCity;
    const uf = selectedUf;
    const { lat, lng } = position;

    const data = new FormData();

    data.append('email', email);
    data.append('name', name);
    data.append('whatsapp', whatsapp);
    data.append('city', city);
    data.append('uf', uf);
    data.append('latitude', String(lat));
    data.append('longitude', String(lng));
    data.append('items', selectedItems.join(','));

    if (selectedFile) {
      data.append('image', selectedFile);
    }

    await api.post('points', data);
    history.push('/');
  };

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <Dropzone onFileUploaded={setSelectedFile} />

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
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <div className="maps">
            <Maps position={position} setPosition={setPosition} />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={e => setSelectedUf(e.target.value)}
              >
                <option value="">Selecione um Estado</option>
                {ufs.map(uf => (
                  <option key={uf.sigla} value={uf.sigla}>
                    {uf.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
              >
                <option value="">Selecione uma Cidade</option>
                {cities.map(city => (
                  <option key={city.id} value={city.nome}>
                    {city.nome}
                  </option>
                ))}
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
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => handleSelecItem(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.imageUrl} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
