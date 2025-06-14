import React from 'react'
import Widget from './Widget'
import WidgetTags from './WidgetTags'

const RightSidebar = () => {
    return (
        <div className='right-sidebar'>
            <Widget/>
            <WidgetTags/>

        </div>
    )
}

export default RightSidebar