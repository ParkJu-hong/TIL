import React from 'react'
import { useDispatch, useSelector} from 'react-redux';
import Menu from '../components/Menu';

function MenusContainer() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.contents);
    const onHandleClick = (id) => {
        dispatch({
            type: 'CHANGE_NOW_ID',
            payload: {
                id: id
            }
        })
    }
    return (
        <div>
            {state.map((el) => {
                <Menu contents={el} _onClick={(id)=>{
                    onHandleClick(id);
                }}/>
            })}
        </div>
    )
}

export default MenusContainer
