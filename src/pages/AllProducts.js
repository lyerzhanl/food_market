import React, {useEffect, useState} from 'react';
import potato from "../img/potato.png";

function AllProducts(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [showScroller, setShowScroller] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    fetch('http://localhost:4001/products').then((response) =>
                        response.json()
                    ),
                    fetch('http://localhost:4001/categories').then((response) =>
                        response.json()
                    ),
                ]);

                setAllProducts(productsResponse);
                setAllCategories(categoriesResponse);
                checkOverflow();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const checkOverflow = () => {
        const categoriesContainer = document.querySelector('.categories-carousel')
        const showScrollIndicator =
            categoriesContainer.scrollWidth > categoriesContainer.clientWidth;
        setShowScroller({ showScrollIndicator });
    }

    const scrollRight = () => {
        const categoriesContainer = document.querySelector('.categories-carousel')
        categoriesContainer.scrollLeft += 100;
    }

    return (
        <div className="allProducts-wrapper">
            <div className="categories">
                <div className="categories-carousel">
                    {allCategories.map((e) => (
                        <div
                            key={e.categoryName}
                            // onClick={() => this.props.chooseCategory(e.ID)}
                        >
                            {e.categoryName}
                        </div>
                    ))}
                </div>
                {showScroller && (
                    <div className="scroller" onClick={scrollRight}>
                        &gt;
                    </div>
                )}
            </div>

            <main>
                {allProducts.map((product) => (
                    <div className="item-wrapper">
                        <div className="item">
                            <img src={potato} alt="img"/>
                            <h2>{product.productName}</h2>
                            <b>{product.price + " "}</b>
                            <div
                                className="add-to-cart"
                                // onClick={() => this.props.onAdd(this.props.item)}
                            >
                                +
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default AllProducts;