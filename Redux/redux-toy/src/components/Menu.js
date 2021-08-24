import React from 'react'

function Menu({ content, _onClick }) {
    return (
        <div className="content_menu">
            <div onClick={()=>{
                _onClick(content.id);
            }}>{content.text}</div>)
        </div>
    )
}

export default Menu
