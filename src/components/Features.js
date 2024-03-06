import React from 'react';
import img1 from './../img/feature-img-1.png'
import img2 from './../img/feature-img-2.png'
import img3 from './../img/feature-img-3.png'

const Features = () => {
    const features = [
        {img: img1, title: "Fresh and Organic", description: "Our products are always fresh and organic."},
        {img: img2, title: "Free Delivery", description: "We provide to our favorite customers free delivery system :)"},
        {img: img3, title: "Balance System", description: "Also we have convenient payment method!"}
    ]
    return(
        <div className="features">
            <h1 className="header__primary">
                Our <span>Features</span>
            </h1>
            <div className="feature-wrapper">
                {features.map((feature, index) => (
                    <div className="feature" key={index}>
                        <img src={feature.img} alt={feature.title} />
                        <p className="feature-title">{feature.title}</p>
                        <p className="feature-description">{feature.description}</p>
                        <button className="feature-button">Shop Now</button>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Features;