import React from 'react'

const WidgetTags = () => {

    const tags=['C','CSS','express' , 'firebase','html','react','mongodb','java','javascript','mern','mysql','node.js','python']
    return (
        <div className='widget-tags'>
            <h3>Watched Tags</h3>
            <div className='widget-tags-div'>
                {
                    tags.map((tag) =>(
                        <p key={tag}>{tag}</p>
                    ))
                }
            </div>

        </div>
    )
}

export default WidgetTags