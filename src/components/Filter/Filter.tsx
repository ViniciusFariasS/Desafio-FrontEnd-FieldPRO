import React from 'react';
import { IFilterProps } from './Filter.interface';
import { FilterContainer } from './Filter.styles';


const Filter: React.FC<IFilterProps> = ({ children, handleFilterSubmit, error }) => {

    return (
        <FilterContainer>
            <label>Selecione os filtros desejados para filtrar</label>
            <form onSubmit={handleFilterSubmit}>
                {children}
            </form>
            {error &&
                <div className='filter__error'>{error}</div>
            }
        </FilterContainer>
    );
};

export { Filter };