import React from 'react';

function About() {
    let date = new Date();
    // date.setHours(0, 0, 0, 0);
    console.log(date);

    console.log(new Date((new Date()).setHours(0, 0, 0, 0)));

    return (
        <>
            this is about page
        </>
    )
}

export default About;