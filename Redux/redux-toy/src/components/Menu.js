import React from 'react'

function Menu({ contents, _onClick }) {
    return (
        <div className="content_menu">
            <div onClick={()=>{
                _onClick(contents.id);
            }}>{contents.text}</div>)
        </div>
    )
}

export default Menu
