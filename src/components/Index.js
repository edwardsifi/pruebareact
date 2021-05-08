import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {

    //useEffect

    useEffect(()=>{
        setBusqueda();
    },[])

    //estados
    const [txtbuscar, setTxtBuscar] = useState('');
    const [cervecerias, setCervecerias] = useState(null);

    //funciones

    //funcion ultima busqueda

    const setBusqueda = () => {
        const busqueda = JSON.parse(localStorage.getItem("busqueda"));
        setTxtBuscar(busqueda.busqueda);
        console.log(busqueda.busqueda);

        axios.get(`https://api.openbrewerydb.org/breweries/search?query=${busqueda.busqueda}`)
        .then((res) => {
            console.log(res);
            setCervecerias(res.data)
        })
        .catch((err) => {

        })
    }

    //funcion buscar cerveceria
    const buscarCerveza = (e) => {
        setTxtBuscar(e.target.value)

        const mi_busqueda = {
            busqueda:e.target.value
        }

        localStorage.setItem("busqueda", JSON.stringify(mi_busqueda));
        
        axios.get(`https://api.openbrewerydb.org/breweries/search?query=${e.target.value}`)
            .then((res) => {
                console.log(res);
                setCervecerias(res.data)
            })
            .catch((err) => {

            })
    }

    return (
        <>

            <div className="container">

                <div className="row">

                    <div className="col">
                        <input onChange={buscarCerveza} value={txtbuscar} type="text" class="form-control" placeholder="Buscar" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>

                    <div className="col">
                        <button class="btn btn-outline-secondary" type="button">Button</button>
                    </div>

                </div>

                <div className="row">

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">name</th>
                                <th scope="col">web site url</th>
                                <th scope="col">acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                cervecerias ?
                                    cervecerias.map(cerveceria => (
                                        <tr>
                                            <th scope="row">{cerveceria.id}</th>
                                            <td>{cerveceria.name}</td>
                                            <td>{cerveceria.website_url}</td>
                                            <td>
                                                <button class="btn btn-outline-secondary" type="button">Guardar</button>
                                            </td>
                                        </tr>
                                    ))

                                    :
                                    <></>
                            }


                        </tbody>
                    </table>

                </div>

            </div>

        </>
    );
}

export default Index;