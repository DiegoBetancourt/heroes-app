import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string'
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";
import { useMemo } from "react";

export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {q = ''} = queryString.parse(location.search);

    const [formValues, handleInputChange] =  useForm({
        searchText: q,
    })

    const {searchText} = formValues;

    const heroesFileted = useMemo(() => getHeroesByName(q), [q]) 

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${searchText}`)

    }

    return (
    <>
        <h1> Buscar...</h1>
        <hr/>
        <div className="row">
            <div className="col-5">
                <form onSubmit={handleSearch}>
                    <input 
                        type="text"
                        placeholder="Buscar Heroe"
                        className="form-control"
                        name="searchText"
                        autoComplete="off"
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <button 
                        className="btn btn-outline-primary mt-3"
                        type="submit" >
                        Buscar

                    </button>
                </form>

            </div>

            <div className="col-7">
               <h4>Resultado</h4>
               <hr/>

               {
                   (q === '')
                        ? <div className="alert alert-info">Bucar Heroe</div>
                        : (heroesFileted.length===0)
                        && <div className="alert alert-danger">No Hay Resultados {q}</div>
                    }

               {
                   heroesFileted.map(hero => (
                       <HeroCard
                            key={hero.id}
                            {...hero}

                        />
                   ))
               } 
            </div>

        </div>
    </>
  )
    
  };